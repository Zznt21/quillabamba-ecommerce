// Datos e imágenes demostrativos: sustituir antes de vender.
export const products = [
 {id:'cafe-grano',name:'Café de altura en grano',category:'cafe',price:39.9,unit:'250 g',description:'Café artesanal de Quillabamba, presentado en grano para moler al momento. Perfil de sabor demostrativo.',image:'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1100&q=80'},
 {id:'cafe-molido',name:'Café artesanal molido',category:'cafe',price:36.9,unit:'250 g',description:'Una opción práctica para disfrutar café de Quillabamba en casa. Perfil y molienda sujetos a confirmación.',image:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1100&q=80'},
 {id:'miel-pura',name:'Miel natural',category:'miel',price:29.9,unit:'350 g',description:'Miel artesanal de Quillabamba. Presentación, origen floral y características por confirmar.',image:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1100&q=80'},
 {id:'miel-familiar',name:'Miel natural familiar',category:'miel',price:49.9,unit:'700 g',description:'Formato familiar de miel artesanal de Quillabamba. Presentación demostrativa.',image:'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1100&q=80'}
];
export const money = n => new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN'}).format(n);
export const WHATSAPP_NUMBER = '51940806346'; // IMPORTANTE: escribe aquí tu número en formato internacional, ej. 519XXXXXXXX
