import {ArrowUpRight, ArrowLeft, Plus, Minus, X, Search, Asterisk, ShoppingBag, Leaf, Menu} from 'lucide-react';

const icons = {arrow: ArrowUpRight, back: ArrowLeft, plus: Plus, minus: Minus, close: X, search: Search, asterisk: Asterisk, bag: ShoppingBag, leaf: Leaf, menu: Menu};

// Icons are decorative; their parent link/button supplies the accessible name.
export default function Icon({name, size = 18, className = ''}) {
  const Shape = icons[name];
  return <Shape size={size} strokeWidth={1.5} className={`ui-icon ${className}`} aria-hidden="true" focusable="false"/>;
}
