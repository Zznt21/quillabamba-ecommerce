import {useState} from 'react';

// Photographs illustrate categories, not actual packaging or verified production sites.
export default function EditorialImage({kind = 'cafe', alt, className = '', eager = false, sizes = '(max-width: 767px) 50vw, (max-width: 1023px) 45vw, 360px'}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const base = kind === 'miel' ? '/images/honey-editorial' : '/images/coffee-editorial';
  const source = base + '.webp';
  return <div className={`editorial-image ${className}`} data-loaded={loaded}>
    {failed ? <div className="image-fallback" role="img" aria-label={alt}>
      <span className="serif">{kind === 'miel' ? 'Miel' : 'Café'}</span>
      <span>Fotografía no disponible</span>
    </div> : <img src={source} srcSet={`${base}-small.webp ${kind === 'miel' ? 480 : 640}w, ${base}.webp ${kind === 'miel' ? 900 : 1400}w`} sizes={sizes} alt={alt} width={kind === 'miel' ? 1000 : 1600} height={kind === 'miel' ? 1500 : 1220}
      loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async"
      onLoad={() => setLoaded(true)} onError={() => setFailed(true)}/>}
  </div>;
}

