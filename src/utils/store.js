import {money, WHATSAPP_NUMBER} from '../data/products.js';
import {cartTotal, lineTotal} from './cart.js';

export const normalizeSearch = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function whatsappUrl(message) {
  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER) || !message.trim()) throw new Error('No se pudo preparar WhatsApp. Inténtalo nuevamente.');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
export function orderUrl(lines) {
  if (!lines.length) throw new Error('Añade productos al carrito antes de consultar.');
  return whatsappUrl([
    'Hola, quiero consultar por este pedido de Raíces de Quillabamba:',
    ...lines.map(product => `• ${product.name} (${product.unit}) x${product.quantity} — Unitario: ${money(product.price)} — Subtotal: ${money(lineTotal(product))}`),
    `Total de productos: ${money(cartTotal(lines))}`,
    '¿Podrían confirmarme disponibilidad, precio final y costo de envío?'
  ].join('\n'));
}
export function wholesaleUrl(form) {
  const fields = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()]));
  if (!fields.nombre || !fields.cantidad || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    throw new Error('Completa nombre, correo válido y cantidad aproximada.');
  }
  return whatsappUrl(`Hola, solicito una cotización mayorista.\nNombre: ${fields.nombre}\nEmpresa: ${fields.empresa || 'No indicada'}\nCorreo: ${fields.email}\nProductos: ${fields.producto}\nCantidad estimada: ${fields.cantidad}\nConsulta: ${fields.mensaje || 'Sin comentarios'}`);
}
