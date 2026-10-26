import Icon from './Icon';
import {BETA_MODE, BETA_NOTICE} from '../config/beta';
import {useEffect, useRef, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {useCart} from '../context/CartContext';

export default function Navbar() {
  const {count} = useCart();
  const {pathname} = useLocation();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const resize = () => {
      setOpen(false);
      if (desktop.matches && document.activeElement === toggleRef.current) {
        navRef.current?.querySelector('a')?.focus();
      } else if (!desktop.matches && navRef.current?.contains(document.activeElement)) {
        toggleRef.current?.focus();
      }
    };
    desktop.addEventListener('change', resize);
    return () => desktop.removeEventListener('change', resize);
  }, []);
  const closeMenu = event => {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      toggleRef.current?.focus();
    }
  };
  const followLink = to => {
    setOpen(false);
    if (to === pathname && open) toggleRef.current?.focus();
  };
  return <header className="site-header" onKeyDown={closeMenu}>
    {BETA_MODE && <p className="beta-notice">{BETA_NOTICE}</p>}
    <div className="announcement">De Quillabamba a tu mesa <span className="announcement-mark"><Icon name="asterisk" size={14}/></span> Café & miel artesanal</div>
    <div className="container-site navigation-shell">
      <Link to="/" onClick={() => followLink('/')} className="brand" aria-label="Raíces de Quillabamba, inicio"><Icon name="leaf" size={30}/><span className="serif">Raíces<small>de Quillabamba</small></span></Link>
      <button ref={toggleRef} className="mobile-menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" aria-label={open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'} onClick={() => setOpen(value => !value)}>
        {open ? <Icon name="close" size={20}/> : <Icon name="menu" size={20}/>}<span>Menú</span>
      </button>
      <nav ref={navRef} id="primary-navigation" className={open ? 'primary-navigation is-open' : 'primary-navigation'} aria-label="Navegación principal">
        {[['/','Inicio'],['/catalogo','Productos'],['/nosotros','Nuestro origen'],['/mayoristas','Mayoristas']].map(([to,label]) => <NavLink key={to} to={to} onClick={() => followLink(to)} end={to==='/'} className={({isActive}) => isActive ? 'nav-active' : ''}>{label}</NavLink>)}
      </nav>
      <Link to="/carrito" onClick={() => followLink('/carrito')} aria-label={`Carrito, ${count} productos`} className="nav-cart"><Icon name="bag" size={20}/><span className="cart-label">Tu carrito</span><span className="cart-count">{count}</span></Link>
    </div>
  </header>;
}
