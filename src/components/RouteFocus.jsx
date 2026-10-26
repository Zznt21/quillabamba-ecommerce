import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export default function RouteFocus() {
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    const target = document.querySelector('main h1, main, h1');
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
    }
  }, [pathname]);
  return null;
}
