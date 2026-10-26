import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {scheduleToastDismiss, TOAST_DURATION} from '../src/utils/toast.js';
import {changeCart, MAX_QUANTITY} from '../src/utils/cart.js';
import {products} from '../src/data/products.js';

// Exercise the actual provider reducer without adding a DOM or React test dependency.
const source = fs.readFileSync(new URL('../src/context/CartContext.jsx', import.meta.url), 'utf8');
const reducerSource = source.slice(source.indexOf('function reducer('), source.indexOf('export function CartProvider'));
const reducer = vm.runInNewContext(`(${reducerSource.trim()})`, {changeCart, MAX_QUANTITY, products});
const initialState = () => ({items: {}, notice: '', revision: 0, error: ''});

// Reproduce React's effect setup/cleanup around each notice revision.
function notifications() {
  let state = initialState();
  let cleanup = () => {};
  const dispatch = action => {
    const previous = state;
    state = reducer(state, action);
    if (previous.notice === state.notice && previous.revision === state.revision) return;
    cleanup();
    if (state.notice) {
      const revision = state.revision;
      cleanup = scheduleToastDismiss(() => dispatch({type: 'dismiss-notice', revision}));
    }
  };
  return {dispatch, get state() {return state;}, dispose: () => cleanup()};
}

function clock(t) {t.mock.timers.enable({apis: ['setTimeout']});}

test('cierre automático a los 3000 ms, sin alterar productos', t => {
  clock(t);
  const toast = notifications();
  toast.dispatch({type:'add', id:'cafe-grano', quantity:1});
  const items = toast.state.items;
  t.mock.timers.tick(TOAST_DURATION - 1);
  assert.ok(toast.state.notice);
  t.mock.timers.tick(1);
  assert.equal(toast.state.notice, '');
  assert.equal(toast.state.items, items);
});

test('notificación consecutiva reemplaza y reinicia el temporizador', t => {
  clock(t);
  const toast = notifications();
  toast.dispatch({type:'add', id:'cafe-grano', quantity:1});
  t.mock.timers.tick(2000);
  toast.dispatch({type:'add', id:'miel-pura', quantity:1});
  assert.ok(toast.state.notice.includes('Miel'));
  t.mock.timers.tick(1000);
  assert.ok(toast.state.notice);
  t.mock.timers.tick(1999);
  assert.ok(toast.state.notice);
  t.mock.timers.tick(1);
  assert.equal(toast.state.notice, '');
});

test('mensajes idénticos también reinician los tres segundos', t => {
  clock(t);
  const toast = notifications();
  toast.dispatch({type:'clear'});
  const firstRevision = toast.state.revision;
  t.mock.timers.tick(2000);
  toast.dispatch({type:'clear'});
  assert.equal(toast.state.revision, firstRevision + 1);
  t.mock.timers.tick(1000);
  assert.equal(toast.state.notice, 'Carrito vaciado.');
  t.mock.timers.tick(2000);
  assert.equal(toast.state.notice, '');
});

test('cierre manual limpia el aviso; un cierre anterior no borra el siguiente', t => {
  clock(t);
  const toast = notifications();
  toast.dispatch({type:'add', id:'cafe-grano', quantity:1});
  const oldRevision = toast.state.revision;
  toast.dispatch({type:'dismiss-notice', revision:oldRevision});
  assert.equal(toast.state.notice, '');
  toast.dispatch({type:'add', id:'miel-pura', quantity:1});
  const current = toast.state;
  toast.dispatch({type:'dismiss-notice', revision:oldRevision});
  assert.equal(toast.state, current);
  t.mock.timers.tick(3000);
  assert.equal(toast.state.notice, '');
});

test('cleanup cancela el temporizador al desmontar, incluso en un nuevo montaje', t => {
  clock(t);
  let calls = 0;
  const cleanup = scheduleToastDismiss(() => calls++);
  cleanup();
  t.mock.timers.tick(3000);
  assert.equal(calls, 0);
  const nextCleanup = scheduleToastDismiss(() => calls++);
  t.mock.timers.tick(3000);
  assert.equal(calls, 1);
  nextCleanup();
});

test('regresión: agregar tres productos y eliminarlos no deja un toast persistente', t => {
  clock(t);
  const toast = notifications();
  for (const product of products.slice(0,3)) toast.dispatch({type:'add', id:product.id, quantity:1});
  for (const product of products.slice(0,3)) {
    toast.dispatch({type:'update', id:product.id, quantity:0});
    assert.equal(toast.state.notice, 'Producto eliminado del carrito');
    t.mock.timers.tick(500);
  }
  assert.equal(Object.keys(toast.state.items).length, 0);
  t.mock.timers.tick(2499);
  assert.ok(toast.state.notice);
  t.mock.timers.tick(1);
  assert.equal(toast.state.notice, '');
});
