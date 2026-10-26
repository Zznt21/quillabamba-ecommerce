import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {BETA_MODE, BETA_BLOCK_MESSAGE, isBetaMode} from '../src/config/beta.js';
import {openWhatsApp} from '../src/utils/whatsapp.js';
import {orderUrl, wholesaleUrl} from '../src/utils/store.js';
import {products} from '../src/data/products.js';

test('beta activa por defecto; solo false explícito permite salir', () => {
  assert.equal(BETA_MODE, true);
  for(const value of [undefined, null, '', 'true', 'FALSE', '0', ' false ', false]) assert.equal(isBetaMode(value), true);
  assert.equal(isBetaMode('false'), false);
});

test('beta bloquea navegación de pedidos y cotizaciones incluso sin el botón', () => {
  const urls = [orderUrl([{...products[0], quantity:1}]), wholesaleUrl({nombre:'Prueba',empresa:'',email:'beta@example.com',producto:'Café',cantidad:'1 kg',mensaje:''})];
  let calls = 0;
  for(const url of urls) assert.throws(() => openWhatsApp(url, {navigate:() => calls++}), {message:BETA_BLOCK_MESSAGE});
  assert.equal(calls, 0);
});

test('fuera de beta conserva la URL WhatsApp generada', () => {
  const url = orderUrl([{...products[0],quantity:2}]);
  let destination;
  openWhatsApp(url, {betaMode:false, navigate:value => {destination=value;}});
  assert.equal(destination, url);
  assert.ok(destination.startsWith('https://wa.me/51940806346?text='));
});

test('errores de navegación siguen disponibles para informar al usuario', () => {
  assert.throws(() => openWhatsApp('https://wa.me/51940806346', {betaMode:false, navigate:() => {throw new Error('No se pudo abrir');}}), /No se pudo abrir/);
});

test('configuración estática Vercel incluye fallback SPA y pruebas antes de compilar', () => {
  const config = JSON.parse(fs.readFileSync(new URL('../vercel.json',import.meta.url),'utf8'));
  assert.equal(config.framework, 'vite');
  assert.equal(config.outputDirectory, 'dist');
  assert.equal(config.installCommand, 'npm ci');
  assert.equal(config.buildCommand, 'npm test && npm run build');
  assert.ok(config.rewrites.some(rule => rule.source === '/(.*)' && rule.destination === '/index.html'));
});
