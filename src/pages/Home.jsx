import Icon from '../components/Icon';
import {Link} from 'react-router-dom';
import Botanical from '../components/Botanical';
import EditorialImage from '../components/EditorialImage';
import ProductCard from '../components/ProductCard';
import {products} from '../data/products';

export default function Home() {
  return <main className="home-editorial">
    <section className="editorial-hero container-site" aria-labelledby="hero-title">
      <div className="hero-topline"><p className="eyebrow">Quillabamba · Cusco · Perú</p><span>Café & miel artesanal</span></div>
      <h1 id="hero-title">El sabor de<br/><em>nuestra tierra.</em></h1>
      <div className="hero-composition">
        <EditorialImage eager sizes="(max-width: 767px) 80vw, 900px" className="hero-coffee" alt="Detalle de granos de café tostado, fotografía referencial"/>
        <div className="hero-note"><span className="small-index">01 / EL ORIGEN</span><p>Hay sabores que nos<br/>hacen volver a la tierra.</p><Botanical className="hero-botanical"/></div>
        <figure className="hero-honey"><EditorialImage kind="miel" eager alt="Miel ámbar en un frasco con cuchara de madera, fotografía referencial"/><figcaption>Dos sabores. Una misma raíz.</figcaption></figure>
        <span className="hero-photo-note">Fotografías referenciales</span>
      </div>
      <div className="hero-bottom"><p>Café y miel artesanal de Quillabamba.<br/>Una invitación a descubrir lo nuestro, sin prisa.</p><div className="hero-actions"><Link className="btn btn-primary" to="/catalogo">Explorar productos <Icon name="arrow"/></Link><Link className="text-link" to="/nosotros">Conoce nuestro origen <Icon name="arrow"/></Link></div></div>
      <p className="demo-note">Catálogo demostrativo · Productos, precios y presentaciones por confirmar.</p>
    </section>

    <section className="category-story container-site" aria-labelledby="categories-title">
      <div className="section-heading"><p className="eyebrow">Dos formas de saborear la tierra</p><h2 id="categories-title">Distintos por naturaleza.<br/><em>Unidos por el origen.</em></h2></div>
      <div className="category-composition">
        <article className="coffee-universe"><div className="category-caption"><span className="small-index">01 / CAFÉ</span><span>En grano & molido</span></div><Link to="/producto/cafe-grano" className="category-image-link" aria-label="Descubrir café de altura en grano"><EditorialImage alt="Textura de granos tostados de café, imagen referencial"/><span className="category-word">Café.</span><span className="round-arrow" aria-hidden="true"><Icon name="arrow"/></span></Link><p>Un momento para hacer una pausa.<br/>Descubre las presentaciones de nuestro café.</p><Link to="/catalogo" className="text-link">Explorar el catálogo de café y miel <Icon name="arrow"/></Link></article>
        <article className="honey-universe"><Botanical className="category-botanical"/><div className="honey-title"><span className="small-index">02 / MIEL</span><h3>La dulzura<br/><em>de lo simple.</em></h3></div><Link to="/producto/miel-pura" className="category-image-link" aria-label="Descubrir miel natural"><EditorialImage kind="miel" alt="Miel dorada sobre un frasco, imagen referencial"/><span className="round-arrow" aria-hidden="true"><Icon name="arrow"/></span></Link><div className="honey-description"><span className="serif">Miel.</span><p>El lado ámbar de nuestra selección.<br/>Conoce sus dos presentaciones.</p></div></article>
      </div>
    </section>

    <section className="selection-section" aria-labelledby="selection-title"><div className="container-site">
      <div className="section-heading heading-row"><div><p className="eyebrow">Para tu mesa</p><h2 id="selection-title">Nuestra selección.</h2></div><Link to="/catalogo" className="text-link">Ver todos los productos <Icon name="arrow"/></Link></div>
      <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product}/>)}</div>
      <p className="demo-note">Imágenes referenciales. Los envases y las características finales están por confirmar.</p>
    </div></section>

    <section className="origin-story" aria-labelledby="origin-title"><div className="container-site origin-grid">
      <div className="origin-intro"><p className="eyebrow">Nuestra raíz · La Convención, Cusco</p><h2 id="origin-title">La tierra tiene<br/><em>una historia.</em></h2><p>Y la nuestra empieza en Quillabamba. Un lugar que inspira esta propuesta de café y miel artesanal y nuestra forma de mirar el origen.</p><Link to="/nosotros" className="text-link">Conoce nuestro origen <Icon name="arrow"/></Link></div>
      <figure className="origin-landscape"><svg viewBox="0 0 600 440" role="img" aria-labelledby="landscape-title"><title id="landscape-title">Interpretación gráfica de montañas y vegetación, no es un mapa de Quillabamba</title><circle cx="419" cy="114" r="47" fill="var(--miel-dorada)"/><g fill="none" stroke="currentColor" strokeWidth="1.2">{[0,1,2,3,4,5,6,7].map(i => <path key={i} d={`M-30 ${285+i*18} Q80 ${90+i*15} 190 ${252+i*14} T390 ${218+i*17} T640 ${165+i*24}`}/>) }<path d="M0 360Q100 260 210 360T420 343T600 340M0 395Q140 300 290 400T600 382"/></g><text x="34" y="63" fill="currentColor" fontSize="11" letterSpacing="4">QUILLABAMBA</text><text x="34" y="85" fill="currentColor" fontSize="10" letterSpacing="2">CUSCO / PERÚ</text></svg><figcaption>Una interpretación de la tierra que nos inspira.</figcaption></figure>
    </div></section>

    <section className="craft-story container-site" aria-labelledby="craft-title"><div className="craft-mark"><Botanical/><span className="small-index">TIERRA · ORIGEN · ENCUENTRO</span></div><div><p className="eyebrow">La mirada artesanal</p><h2 id="craft-title">Lo cotidiano merece<br/><em>un lugar especial.</em></h2><p>Un café compartido. Un poco de miel en la mesa. Queremos acercar los sabores de Quillabamba a esos pequeños momentos.</p><p className="craft-disclosure">Nuestra historia está creciendo. Pronto compartiremos información verificada de productores, elaboración y fotografías propias.</p></div></section>

    <section className="wholesale-section container-site" aria-labelledby="wholesale-title"><div><p className="eyebrow">Para negocios & nuevos encuentros</p><h2 id="wholesale-title">Llevemos este origen<br/><em>a más mesas.</em></h2></div><div><p>¿Café o miel para tu negocio? Cuéntanos qué productos y cantidades buscas para preparar una consulta mayorista.</p><Link to="/mayoristas" className="btn btn-primary">Conversemos de tu negocio <Icon name="arrow"/></Link></div></section>
  </main>;
}

