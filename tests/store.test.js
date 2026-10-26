import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {matchRoutes} from 'react-router-dom';
import {products} from '../src/data/products.js';
import {parseCart, changeCart, lineTotal, cartTotal} from '../src/utils/cart.js';
import {normalizeSearch, orderUrl, wholesaleUrl} from '../src/utils/store.js';

test('rechaza cantidades inválidas sin alterar el estado', () => {
  const original = {'cafe-grano': 2};
  for (const quantity of [-1, 1.5, NaN, Infinity, '2', null, undefined, {}, 100]) {
    for (const action of ['add', 'update']) assert.equal(changeCart(original, action, 'cafe-grano', quantity), original);
  }
  assert.equal(changeCart(original, 'add', 'desconocido', 1), original);
  assert.equal(changeCart(original, 'update', '__proto__', 1), original);
});
test('acumula hasta 99, actualiza y elimina con cero', () => {
  let items = changeCart({}, 'add', 'cafe-grano', 98);
  items = changeCart(items, 'add', 'cafe-grano', 2);
  assert.equal(items['cafe-grano'], 99);
  assert.deepEqual(changeCart(items, 'update', 'cafe-grano', 0), {});
  assert.equal(changeCart(items, 'add', 'cafe-grano', 0), items);
});
test('persistencia: roundtrip conserva datos válidos y elimina entradas inválidas', () => {
  const items = {'cafe-grano': 3, 'miel-pura': 99};
  assert.deepEqual(parseCart(JSON.stringify(items)), items);
  assert.deepEqual(parseCart('{"cafe-grano":2,"miel-pura":-1,"otro":5,"cafe-molido":1.5}'), {'cafe-grano':2});
  assert.deepEqual(parseCart(null), {});
  for(const raw of ['{', 'null', '[]', '12']) assert.throws(() => parseCart(raw));
});
test('totales monetarios sin errores acumulados de coma flotante', () => {
  const lines = products.map(product => ({...product, quantity:3}));
  assert.equal(lineTotal(lines[0]), 119.7);
  assert.equal(cartTotal(lines), 469.8);
});
test('búsqueda ignora mayúsculas y tildes y conserva categorías', () => {
  const filter = (search, category) => products.filter(p => (category === 'todos' || category === p.category) && normalizeSearch(`${p.name} ${p.description}`).includes(normalizeSearch(search)));
  assert.equal(filter(' CAFE ', 'todos').length, 2);
  assert.equal(filter('café', 'miel').length, 0);
  assert.equal(filter('sin coincidencias', 'todos').length, 0);
});
test('pedido WhatsApp incluye número, codificación, unidades, subtotales y total', () => {
  const lines = [{...products[0], quantity:2}];
  const url = orderUrl(lines);
  assert.ok(url.startsWith('https://wa.me/51940806346?text='));
  const message = new URL(url).searchParams.get('text');
  assert.ok(message.includes('x2'));
  assert.ok(message.includes('Unitario:'));
  assert.ok(message.includes('Subtotal:'));
  assert.ok(message.includes('Total de productos:'));
  assert.ok(message.includes('79.80'));
  assert.equal(url.split('?text=')[1], encodeURIComponent(message));
  assert.throws(() => orderUrl([]));
});
test('consulta mayorista valida obligatorios y codifica datos ingresados', () => {
  const form = {nombre:' Ana ', empresa:'A & B', email:'ana@example.com', producto:'Café', cantidad:'20 kg', mensaje:'¿Envían a Cusco?'};
  const message = new URL(wholesaleUrl(form)).searchParams.get('text');
  for (const text of ['Nombre: Ana', 'A & B', 'ana@example.com', 'Café', '20 kg', '¿Envían a Cusco?']) assert.ok(message.includes(text));
  for (const field of ['nombre','email','cantidad']) assert.throws(() => wholesaleUrl({...form,[field]:'   '}));
  assert.throws(() => wholesaleUrl({...form,email:'correo-invalido'}));
});
test('rutas declaradas resuelven páginas y fallback con React Router', () => {
  const source = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  const routes = [...source.matchAll(/<Route path="([^"]+)"/g)].map(match => ({path:match[1]}));
  for (const path of ['/','/catalogo','/producto/cafe-grano','/carrito','/nosotros','/mayoristas']) {
    const matches = matchRoutes(routes, path);
    assert.ok(matches);
    assert.notEqual(matches[0].route.path, '*');
  }
  assert.equal(matchRoutes(routes, '/no-existe')[0].route.path, '*');
});

test('almacenamiento: escritura, lectura, borrado y errores de acceso', async () => {
  const {CART_KEY, readCart, persistCart} = await import('../src/utils/cart.js');
  const data = new Map();
  let writes = 0;
  const storage = {getItem:key => data.get(key) ?? null, setItem:(key,value) => {writes++;data.set(key,value);}};
  persistCart(storage, {'miel-pura':4});
  assert.deepEqual(readCart(storage), {'miel-pura':4});
  persistCart(storage, {'miel-pura':4});
  assert.equal(writes, 1, 'evita reescrituras al recibir el mismo estado de otra pestaña');
  assert.deepEqual(parseCart(data.get(CART_KEY)), {'miel-pura':4});
  persistCart(storage, {});
  assert.deepEqual(readCart(storage), {});
  assert.throws(() => readCart({getItem:() => {throw new Error('SecurityError');}}));
  assert.throws(() => persistCart({getItem:() => null, setItem:() => {throw new Error('QuotaExceededError');}}, {'miel-pura':1}));
});
