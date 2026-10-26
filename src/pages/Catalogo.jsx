import Icon from '../components/Icon';
import {normalizeSearch} from '../utils/store';
import {useMemo, useState} from 'react';
import ProductCard from '../components/ProductCard';
import Botanical from '../components/Botanical';
import {products} from '../data/products';

export default function Catalogo() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todos');
  const filtered = useMemo(() => products.filter(p => (category === 'todos' || p.category === category) && normalizeSearch(`${p.name} ${p.description}`).includes(normalizeSearch(search))), [search, category]);
  return <main className="container-site catalog-page">
    <div className="catalog-heading"><div><p className="eyebrow">De nuestra tierra, para tu mesa</p><h1>Nuestro <em>catálogo.</em></h1><p>Café y miel artesanal. Encuentra tu próxima pausa.</p></div><Botanical/></div>
    <p className="demo-note">Selección demostrativa · Fotografías referenciales y precios por confirmar.</p>
    <div className="catalog-filters"><label>¿Qué te gustaría descubrir?<span className="search-field"><Icon name="search"/><input className="field" aria-label="Buscar productos" placeholder="Buscar café, miel..." value={search} onChange={e => setSearch(e.target.value)}/></span></label><label>Categoría<select className="field" aria-label="Filtrar por categoría" value={category} onChange={e => setCategory(e.target.value)}><option value="todos">Todas las categorías</option><option value="cafe">Café</option><option value="miel">Miel</option></select></label></div>
    <p className="catalog-count" role="status">{filtered.length} productos encontrados</p>
    {filtered.length ? <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <div className="catalog-empty"><h2>Una pausa en la búsqueda.</h2><p>No encontramos productos con esos filtros.</p></div>}
  </main>;
}
