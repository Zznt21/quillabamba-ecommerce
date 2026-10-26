import {useLayoutEffect, useRef} from 'react';

// Presentation only: notification state and its 3-second lifecycle remain in CartContext.
export default function ToastViewport({message, revision, onDismiss}) {
  const toastRef = useRef(null);
  useLayoutEffect(() => {
    if (!message) return;
    const root = document.documentElement;
    const measure = () => {
      const toast = toastRef.current;
      if (!toast) return;
      const rect = toast.getBoundingClientRect();
      root.style.setProperty('--toast-reserve', `${Math.ceil(rect.height + 32)}px`);
      const active = document.activeElement;
      if (active instanceof HTMLElement && !toast.contains(active) && active.matches('button, a, input, select, textarea')) {
        const control = active.getBoundingClientRect();
        if (control.bottom > rect.top && control.top < rect.bottom) {
          active.scrollIntoView({block: 'center', behavior: 'instant'});
        }
      }
    };
    measure();
    document.addEventListener('focusin', measure);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    if (toastRef.current) observer?.observe(toastRef.current);
    return () => {
      observer?.disconnect();
      document.removeEventListener('focusin', measure);
      root.style.removeProperty('--toast-reserve');
    };
  }, [message, revision]);
  return <div ref={toastRef} className={message ? 'toast-viewport' : 'sr-only'}>
    <div role="status" aria-live="polite" aria-atomic="true" className="min-w-0 flex-1">
      <span key={revision}>{message}</span>
    </div>
    {message && <button type="button" aria-label="Cerrar notificación" className="toast-close" onClick={onDismiss}><span aria-hidden="true">×</span></button>}
  </div>;
}
