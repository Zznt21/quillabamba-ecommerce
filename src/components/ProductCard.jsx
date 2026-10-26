import Icon from './Icon';
import {Link} from 'react-router-dom';
import {money} from '../data/products';
import {useCart} from '../context/CartContext';
import EditorialImage from './EditorialImage';

export default function ProductCard({product}) {
  const {add, lines} = useCart();
  const atLimit = lines.some(line => line.id === product.id && line.quantity >= 99);
  return <article className={`product-card product-${product.category}`}>
    <Link className="product-photo-link" to={`/producto/${product.id}`}>
      <EditorialImage kind={product.category} alt={`${product.category === 'cafe' ? 'Granos de café' : 'Frasco de miel'}, fotografía referencial`}/>
      <span className="product-photo-label">{product.unit}</span>
    </Link>
    <div className="product-info"><p className="eyebrow">{product.category === 'cafe' ? 'Café' : 'Miel'} · Quillabamba</p>
      <Link to={`/producto/${product.id}`}><h3>{product.name}</h3></Link>
      <div className="product-price"><strong>{money(product.price)}</strong><span>{product.unit} · Precio de ejemplo</span></div>
      <button disabled={atLimit} onClick={() => add(product.id)} aria-label={`Añadir ${product.name} al carrito`} className="product-add">{atLimit ? 'Límite alcanzado' : 'Agregar al carrito'}<Icon name="plus"/></button>
      {atLimit && <p className="mt-2 text-sm">Límite de 99 unidades alcanzado.</p>}
    </div>
  </article>;
}
