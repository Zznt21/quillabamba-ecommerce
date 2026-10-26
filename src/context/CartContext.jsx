import ToastViewport from '../components/ToastViewport';
import {scheduleToastDismiss} from '../utils/toast';
﻿import {createContext, useContext, useEffect, useReducer, useState} from 'react';
import {products} from '../data/products';
import {CART_KEY, MAX_QUANTITY, parseCart, changeCart, cartTotal, readCart, persistCart} from '../utils/cart';

const CartContext = createContext(null);
const storageWarning = 'No se pudo guardar el carrito en este navegador. Podría perderse al recargar.';
function initialState() {
  try {
    return {items: readCart(localStorage), notice: '', revision: 0, error: ''};
  } catch {
    return {items: {}, notice: '', revision: 0, error: 'No se pudo recuperar el carrito guardado.'};
  }
}
function reducer(state, action) {
  if (action.type === 'dismiss-notice') {
    return action.revision === state.revision ? {...state, notice: ''} : state;
  }
  if (action.type === 'sync') return {...state, items: action.items, notice: 'Carrito actualizado desde otra pestaña.', revision: state.revision + 1};
  if (action.type === 'clear') return {...state, items: {}, notice: 'Carrito vaciado.', revision: state.revision + 1};
  const items = changeCart(state.items, action.type, action.id, action.quantity);
  if (items === state.items) return {...state, notice: 'Cantidad o producto inválido.', revision: state.revision + 1};
  const product = products.find(product => product.id === action.id);
  const quantity = items[action.id] || 0;
  const notice = quantity === 0
    ? 'Producto eliminado del carrito'
    : quantity === MAX_QUANTITY
    ? `${product.name}: alcanzaste el límite de 99 unidades.`
    : action.type === 'add' ? `${product.name}: añadido al carrito. Cantidad: ${quantity}.` : `${product.name}: cantidad actualizada a ${quantity}.`;
  return {...state, items, notice, revision: state.revision + 1};
}
export function CartProvider({children}) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [storageError, setStorageError] = useState('');
  useEffect(() => {
    if (!state.notice) return;
    return scheduleToastDismiss(() => dispatch({type: 'dismiss-notice', revision: state.revision}));
  }, [state.notice, state.revision]);
  useEffect(() => {
    try {
      persistCart(localStorage, state.items);
      setStorageError('');
    } catch { setStorageError(storageWarning); }
  }, [state.items]);
  useEffect(() => {
    const sync = event => {
      if (event.key !== CART_KEY && event.key !== null) return;
      try {
        if (event.storageArea !== localStorage) return;
        dispatch({type: 'sync', items: parseCart(event.newValue)});
        setStorageError('');
      } catch { setStorageError('No se pudo sincronizar el carrito. Se conserva tu selección actual.'); }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const lines = products.filter(product => state.items[product.id]).map(product => ({...product, quantity: state.items[product.id]}));
  const value = {
    lines, count: lines.reduce((sum, product) => sum + product.quantity, 0), subtotal: cartTotal(lines),
    add: (id, quantity = 1) => dispatch({type: 'add', id, quantity}),
    update: (id, quantity) => dispatch({type: 'update', id, quantity}),
    remove: id => dispatch({type: 'update', id, quantity: 0}),
    clear: () => dispatch({type: 'clear'})
  };
  return <CartContext.Provider value={value}>
    {children}
    <ToastViewport message={state.notice} revision={state.revision}
      onDismiss={() => dispatch({type: 'dismiss-notice', revision: state.revision})}/>
    {(storageError || state.error) && <p role="alert" className="container-site my-3 rounded-xl bg-[var(--surface)] p-3 text-sm text-[var(--text)]">{storageError || state.error}</p>}
  </CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
