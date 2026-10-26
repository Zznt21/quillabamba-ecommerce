import Icon from './Icon';
import {Link} from 'react-router-dom';
import Botanical from './Botanical';

export default function Footer() {
  return <footer className="site-footer"><div className="container-site">
    <div className="footer-top"><p className="eyebrow">Café & miel · Quillabamba, Perú</p><p>Una misma tierra.<br/>Mucho por compartir.</p></div>
    <div className="footer-main"><Link className="footer-wordmark serif" to="/">Raíces<span>de Quillabamba</span></Link><Botanical className="footer-botanical"/><nav aria-label="Enlaces del pie de página"><Link to="/catalogo">Nuestros productos <Icon name="arrow"/></Link><Link to="/nosotros">Nuestro origen <Icon name="arrow"/></Link><Link to="/mayoristas">Ventas mayoristas <Icon name="arrow"/></Link><Link to="/carrito">Tu carrito <Icon name="arrow"/></Link></nav></div>
    <div className="footer-bottom"><span>Hecho de una tierra con historia.</span><p>Proyecto demostrativo · Marca provisional.<br/>Precios y fotografías referenciales; no constituyen una oferta comercial real.</p></div>
  </div></footer>;
}
