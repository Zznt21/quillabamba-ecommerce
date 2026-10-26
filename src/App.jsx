import RouteFocus from './components/RouteFocus';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Producto from './pages/Producto';
import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';
import Mayoristas from './pages/Mayoristas';
export default function App() {
  return <BrowserRouter><CartProvider><RouteFocus /><div className="flex min-h-screen flex-col"><Navbar /><div className="flex-1"><Routes><Route path="/" element={<Home />} /><Route path="/catalogo" element={<Catalogo />} /><Route path="/producto/:id" element={<Producto />} /><Route path="/carrito" element={<Carrito />} /><Route path="/nosotros" element={<Nosotros />} /><Route path="/mayoristas" element={<Mayoristas />} /><Route path="*" element={<main className="container-site py-20"><h1 className="text-4xl">Página no encontrada</h1></main>} /></Routes></div><Footer /></div></CartProvider></BrowserRouter>;
}
