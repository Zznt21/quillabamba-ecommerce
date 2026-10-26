import Icon from '../components/Icon';
import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {products, money} from '../data/products';
import {useCart} from '../context/CartContext';
import EditorialImage from '../components/EditorialImage';

export default function Producto() {
  const {id} = useParams();
  const p = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const {add, lines} = useCart();
  const available = 99 - (lines.find(line => line.id === id)?.quantity || 0);
  useEffect(() => setQty(1), [id]);
  const selected = Math.min(qty, available);
  if (!p) return <main className="container-site py-20"><h1>Producto no encontrado</h1><Link to="/catalogo" className="btn btn-primary mt-5">Volver al catálogo</Link></main>;
  return <main className="container-site product-page">
    <nav className="product-breadcrumb" aria-label="Ubicación"><Link to="/catalogo">Productos</Link><span aria-hidden="true">/</span><span>{p.name}</span></nav>
    <div className="product-detail-grid"><figure className={`detail-photo detail-${p.category}`}><EditorialImage key={p.id} eager kind={p.category} alt={`${p.category === 'cafe' ? 'Granos de café tostado' : 'Miel en un frasco'}, imagen referencial`}/><figcaption>Fotografía referencial · Envase final por confirmar</figcaption></figure>
      <div className="detail-information"><p className="eyebrow">{p.category === 'cafe' ? 'Café' : 'Miel'} · Quillabamba, Cusco</p><h1>{p.name}</h1><div className="detail-price"><strong>{money(p.price)}</strong><span>{p.unit} · Precio demostrativo</span></div><p className="detail-description">{p.description}</p>
        <div className="detail-purchase"><div className="quantity-control"><button disabled={selected <= 1} aria-label="Disminuir cantidad" onClick={() => setQty(q => Math.max(1, Math.min(q, available) - 1))}><Icon name="minus"/></button><span aria-live="polite">{selected}</span><button disabled={selected >= available} aria-label="Aumentar cantidad" onClick={() => setQty(q => Math.min(available, q + 1))}><Icon name="plus"/></button></div><button className="btn btn-primary" disabled={available === 0} onClick={() => add(p.id, selected)}>Añadir al carrito <Icon name="plus"/></button></div>
        {available === 0 && <p className="mt-3 text-sm">Límite de 99 unidades alcanzado.</p>}
        <dl className="detail-facts"><div><dt>Origen</dt><dd>Quillabamba, Cusco, Perú</dd></div><div><dt>Presentación</dt><dd>{p.unit}</dd></div><div><dt>Tu pedido</dt><dd>Disponibilidad y envío por confirmar en WhatsApp.</dd></div></dl>
        <Link to="/catalogo" className="text-link"><Icon name="back"/> Volver al catálogo</Link>
      </div>
    </div>
  </main>;
}
