import {BETA_MODE, BETA_BLOCK_MESSAGE} from '../config/beta';
import {openWhatsApp} from '../utils/whatsapp';
import { useState } from 'react';
import { wholesaleUrl } from '../utils/store';
export default function Mayoristas() {
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    email: '',
    producto: 'Café y miel',
    cantidad: '',
    mensaje: ''
  });
  const [error, setError] = useState('');
  const update = e => setForm(s => ({
    ...s,
    [e.target.name]: e.target.value
  }));
  const send = e => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    try {
      openWhatsApp(wholesaleUrl(form));
    } catch (error) {
      setError(error.message || 'No se pudo abrir WhatsApp. Inténtalo nuevamente.');
    }
  };
  return <main className="container-site grid gap-10 py-14 md:grid-cols-2"><div><p className="eyebrow">Trabajemos juntos</p><h1 className="mt-3 text-5xl">Ventas mayoristas</h1><p className="mt-6 leading-8 text-[var(--text-muted)]">¿Buscas café o miel artesanal para tu negocio? Cuéntanos qué productos y cantidades necesitas. Prepararemos una propuesta personalizada.</p><p className="mt-4 text-sm text-[var(--text-muted)]">{BETA_MODE ? 'Durante la beta puedes completar el formulario, pero las consultas por WhatsApp están deshabilitadas.' : 'El formulario abre WhatsApp con tus datos; no almacena ni envía información a un servidor.'}</p></div><form onSubmit={send} className="space-y-4 rounded-2xl bg-[var(--surface)] p-6 shadow-sm"><label className="block text-sm font-bold">Nombre *<input className="field mt-2" name="nombre" value={form.nombre} onChange={update} required maxLength={80} /></label><label className="block text-sm font-bold">Empresa<input className="field mt-2" name="empresa" value={form.empresa} onChange={update} maxLength={100} /></label><label className="block text-sm font-bold">Correo electrónico *<input className="field mt-2" name="email" type="email" value={form.email} onChange={update} required maxLength={120} /></label><label className="block text-sm font-bold">Producto<select className="field mt-2" name="producto" value={form.producto} onChange={update}><option>Café y miel</option><option>Café</option><option>Miel</option></select></label><label className="block text-sm font-bold">Cantidad aproximada *<input className="field mt-2" name="cantidad" value={form.cantidad} onChange={update} placeholder="Ej. 20 kg de café" required maxLength={100} /></label><label className="block text-sm font-bold">Mensaje<textarea className="field mt-2" rows="4" name="mensaje" value={form.mensaje} onChange={update} maxLength={1000} /></label><button className="btn btn-primary w-full" type="submit" disabled={BETA_MODE} aria-describedby={BETA_MODE ? 'wholesale-beta-note' : undefined}>{BETA_MODE ? 'WhatsApp deshabilitado en beta' : 'Enviar consulta por WhatsApp'}</button>{BETA_MODE && <p id="wholesale-beta-note" className="beta-action-note">{BETA_BLOCK_MESSAGE}</p>}{error && <p role="alert" className="text-sm text-[var(--text-accent)]">{error}</p>}</form></main>;
}
