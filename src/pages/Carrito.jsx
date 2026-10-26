import {BETA_MODE, BETA_BLOCK_MESSAGE} from '../config/beta';
import {openWhatsApp} from '../utils/whatsapp';
import EditorialImage from '../components/EditorialImage';
import { useState } from 'react';
import { orderUrl } from '../utils/store';
import { lineTotal } from '../utils/cart';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { money } from '../data/products';
export default function Carrito() {
  const {
    lines,
    subtotal,
    update,
    remove,
    clear
  } = useCart();
  const [error, setError] = useState('');
  const checkout = () => {
    try {
      openWhatsApp(orderUrl(lines));
    } catch (error) {
      setError(error.message || 'No se pudo abrir WhatsApp. Inténtalo nuevamente.');
    }
  };
  return <main className="container-site cart-page py-12"><p className="eyebrow">Tu selección</p><h1 className="mt-2 text-5xl">Mi carrito</h1>{!lines.length ? <div className="mt-10 rounded-2xl bg-[var(--surface)] p-10"><p>Tu carrito está vacío.</p><Link to="/catalogo" className="btn btn-primary mt-5">Explorar productos</Link></div> : <div className="cart-layout mt-10 grid gap-8 lg:grid-cols-[1fr_330px]"><div className="space-y-4">{lines.map(p => <article key={p.id} className="cart-line flex flex-wrap items-center gap-4 rounded-2xl bg-[var(--surface)] p-4"><EditorialImage className="cart-product-photo" kind={p.category} alt={`${p.name}, imagen referencial`} /><div className="cart-line-info min-w-0 flex-1"><Link to={`/producto/${p.id}`} className="font-bold">{p.name}</Link><p className="text-sm text-[var(--text-muted)]">{p.unit}</p><p className="font-semibold">{money(lineTotal(p))}</p></div><div className="flex items-center gap-2"><button aria-label={`Quitar una unidad de ${p.name}`} className="cart-quantity-button rounded-lg bg-[var(--trigo)] px-3 py-2" onClick={() => update(p.id, p.quantity - 1)}>−</button><span>{p.quantity}</span><button disabled={p.quantity >= 99} aria-label={`Agregar una unidad de ${p.name}`} className="cart-quantity-button rounded-lg bg-[var(--trigo)] px-3 py-2" onClick={() => update(p.id, p.quantity + 1)}>+</button></div>{p.quantity >= 99 && <p className="text-sm">Límite de 99 unidades alcanzado.</p>}<button className="text-sm text-[var(--text-accent)] underline" onClick={() => remove(p.id)}>Eliminar</button></article>)}<button className="text-sm underline" onClick={clear}>Vaciar carrito</button></div><aside className="h-fit rounded-2xl bg-[var(--surface)] p-6"><h2 className="text-2xl">Resumen</h2><div className="mt-5 flex justify-between"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p className="mt-3 text-sm text-[var(--text-muted)]">Envío y precio final por confirmar en WhatsApp.</p><button className="btn btn-primary mt-6 w-full text-center" onClick={checkout} disabled={BETA_MODE} aria-describedby={BETA_MODE ? 'cart-beta-note' : undefined}>{BETA_MODE ? 'WhatsApp deshabilitado en beta' : 'Consultar pedido por WhatsApp'}</button>{BETA_MODE && <p id="cart-beta-note" className="beta-action-note">{BETA_BLOCK_MESSAGE}</p>}{error && <p role="alert" className="mt-3 text-sm text-[var(--text-accent)]">{error}</p>}<p className="mt-4 text-xs">El pedido no se paga ni se confirma automáticamente.</p></aside></div>}</main>;
}
