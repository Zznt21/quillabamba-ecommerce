// Default to beta, including when the setting is missing or misspelled.
export const isBetaMode = value => value !== 'false';
export const BETA_MODE = isBetaMode(import.meta.env?.VITE_BETA_MODE);
export const BETA_NOTICE = 'Beta pública: productos y precios demostrativos. No se aceptan pedidos ni cotizaciones reales.';
export const BETA_BLOCK_MESSAGE = 'WhatsApp está deshabilitado durante la beta. Puedes probar el carrito sin enviar pedidos ni cotizaciones.';
