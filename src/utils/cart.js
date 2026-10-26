import {products} from '../data/products.js';

export const CART_KEY = 'quillabamba-cart-v1';
export const MAX_QUANTITY = 99;
const exists = id => products.some(product => product.id === id);
export const validQuantity = quantity => Number.isInteger(quantity) && quantity >= 0 && quantity <= MAX_QUANTITY;
export const lineTotal = product => Math.round(product.price * 100) * product.quantity / 100;
export const cartTotal = lines => lines.reduce((total, product) => total + Math.round(product.price * 100) * product.quantity, 0) / 100;

export function parseCart(raw) {
  const value = JSON.parse(raw ?? '{}');
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Formato de carrito inválido');
  return Object.fromEntries(Object.entries(value).filter(([id, quantity]) => exists(id) && validQuantity(quantity) && quantity > 0));
}

export function changeCart(items, action, id, quantity) {
  if (!exists(id) || !validQuantity(quantity) || (action === 'add' && quantity === 0)) return items;
  const next = {...items};
  const amount = action === 'add' ? Math.min(MAX_QUANTITY, (items[id] || 0) + quantity) : quantity;
  if (amount === 0) delete next[id];
  else next[id] = amount;
  return next;
}

export function readCart(storage) {
  return parseCart(storage.getItem(CART_KEY));
}
export function persistCart(storage, items) {
  const serialized = JSON.stringify(items);
  if (storage.getItem(CART_KEY) !== serialized) storage.setItem(CART_KEY, serialized);
}
