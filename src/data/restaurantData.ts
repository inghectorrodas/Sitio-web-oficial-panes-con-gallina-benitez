import { MenuItem, SocialPost, HistoryEvent, ContactInfo } from '../types';
import pan1Img from '../assets/images/pan1.jpg';
import pan2Img from '../assets/images/pan2.jpg';
import mamaImg from '../assets/images/mama.png';
import abuelaImg from '../assets/images/abuela.jpg';

export const RESTAURANT_INFO: ContactInfo = {
  whatsapp: '+503 7216-4704',
  address: '4a Calle Pte. Barrio El Calvario, Usulután Este',
  city: 'Usulután Este, El Salvador',
  country: 'El Salvador',
  hoursWeekdays: 'Sábados: 04:00 PM - 10:00 PM',
  facebookUrl: 'https://facebook.com/PanesConGallinaBenitez',
  instagramUrl: 'https://instagram.com/panescongallina_benitez'
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'pan-pechuga',
    name: 'Pan Con Pechuga',
    description: 'Sabroso pan de agua suave cargado con pechuga entera de gallina india, berro fresco, pepino, rábano, huevo duro, curtido de la casa y abundante salsa de recaudo tradicional.',
    price: 6.00,
    category: 'panes',
    image: pan1Img,
    popular: true,
    badge: 'Especialidad',
    ingredients: ['Gallina India (Pechuga)', 'Berro Fresco', 'Pepino', 'Rábano', 'Huevo Duro', 'Curtido Benítez', 'Salsa de Recaudo']
  },
  {
    id: 'pan-entre-pierna',
    name: 'Pan Con Entre Pierna',
    description: 'Suculento pan de agua relleno con jugosa entrepierna de gallina india bien sazonada, vegetales frescos de temporada, curtido agridulce y nuestra famosa salsa criolla.',
    price: 6.00,
    category: 'panes',
    image: pan2Img,
    popular: true,
    badge: 'Favorito',
    ingredients: ['Gallina India (Entre Pierna)', 'Berro Fresco', 'Pepino', 'Rábano', 'Huevo Duro', 'Curtido Benítez', 'Salsa de Recaudo']
  }
];

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    platform: 'instagram',
    author: 'Panes con Gallina Benítez',
    handle: '@panescongallina_benitez',
    avatar: mamaImg,
    timeAgo: 'Hace 2 horas',
    timestamp: '2026-07-24T05:15:00Z',
    content: '¡Sábado de Panes con Gallina Benítez! 🥖🐔 Vente hoy por tu Pan Con Pechuga o Pan Con Entre Pierna a solo $6.00 cada uno. Servidos con abundante berro fresco, huevo duro, curtido artesanal y nuestra salsa caliente secreta.',
    image: pan1Img,
    likes: 342,
    comments: 3,
    shares: 19,
    tags: ['#PanConPechuga', '#PanConEntrePierna', '#SaborSalvadoreño', '#UsulutánEste'],
    commentsList: [
      { id: 'c1', author: 'Carlos Reyes', text: '¡El mejor pan de todo Usulután! Esos berros frescos no fallan jamás.', timeAgo: 'Hace 1 hora' },
      { id: 'c2', author: 'María José G.', text: 'Ya envié mi pedido por WhatsApp. ¡Guárdenme 3 panes con entrepierna!', timeAgo: 'Hace 45 min' },
      { id: 'c3', author: 'Roberto Lemus', text: 'Sabor 100% de la abuela Lucía, una delicia inigualable.', timeAgo: 'Hace 20 min' }
    ]
  },
  {
    id: 'post-2',
    platform: 'facebook',
    author: 'Panes con Gallina Benítez - Oficial',
    handle: 'PanesConGallinaBenitez',
    avatar: mamaImg,
    timeAgo: 'Ayer a las 4:30 PM',
    timestamp: '2026-07-23T16:30:00Z',
    content: '¡Te esperamos este Sábado de 4:00 PM a 10:00 PM en Usulután Este! 📍 4a Calle Pte. Barrio El Calvario. Disfruta el auténtico Pan Con Pechuga ($6.00) y Pan Con Entre Pierna ($6.00). Haz tus pedidos a domicilio por WhatsApp al 7216-4704.',
    image: pan2Img,
    likes: 512,
    comments: 2,
    shares: 88,
    tags: ['#PanesConGallina', '#UsulutanEste', '#SazonDeLaAbuela', '#PedidosWhatsApp'],
    commentsList: [
      { id: 'c4', author: 'Familia Mendoza', text: '¿Hacen entregas a domicilio cerca del Calvario? ¡Queremos cena familiar!', timeAgo: 'Ayer' },
      { id: 'c5', author: 'Panes con Gallina Benítez', text: '¡Hola! Sí, escríbenos al WhatsApp 7216-4704 y con gusto te llevamos tu pedido.', timeAgo: 'Ayer' }
    ]
  },
  {
    id: 'post-3',
    platform: 'instagram',
    author: 'Panes con Gallina Benítez',
    handle: '@panescongallina_benitez',
    avatar: mamaImg,
    timeAgo: 'Hace 3 días',
    timestamp: '2026-07-21T12:00:00Z',
    content: '¿Prefieres la jugosa entrepierna o la suculenta pechuga? 😋 En Panes con Gallina Benítez ambas opciones valen $6.00. Gallina 100% india sazonada con el amor y la receta original de noviembre de 1968.',
    image: pan2Img,
    likes: 289,
    comments: 2,
    shares: 12,
    tags: ['#PanConPechuga', '#PanConEntrePierna', '#RecetaTradicional'],
    commentsList: [
      { id: 'c6', author: 'Andrea Vasquez', text: '¡Entrepierna toda la vida! Es súper jugosa.', timeAgo: 'Hace 2 días' },
      { id: 'c7', author: 'David Flores', text: 'Pechuga con bastante salsa y extra curtido, mi combinación perfecta.', timeAgo: 'Hace 2 días' }
    ]
  },
  {
    id: 'post-4',
    platform: 'facebook',
    author: 'Panes con Gallina Benítez - Oficial',
    handle: 'PanesConGallinaBenitez',
    avatar: mamaImg,
    timeAgo: 'Hace 5 días',
    timestamp: '2026-07-19T10:00:00Z',
    content: '¡Gracias por elegir la sazón de la abuela Lucía Benítez! Catalogados entre las mejores paradas imperdibles de gastronomía salvadoreña en Usulután. ¡Visítanos este sábado!',
    image: pan1Img,
    likes: 890,
    comments: 1,
    shares: 142,
    tags: ['#OrgulloSalvadoreño', '#UsulutanEste', '#PanesBenitez'],
    commentsList: [
      { id: 'c8', author: 'Sonia de Portillo', text: '¡Muy merecido reconocimiento! Orgullo de nuestra tierra usuluteca.', timeAgo: 'Hace 4 días' }
    ]
  }
];

export const HISTORY_TIMELINE: HistoryEvent[] = [
  {
    year: '1968',
    title: 'El Humilde Inicio en Usulután (Noviembre de 1968)',
    description: 'En noviembre de 1968, doña Lucía Benítez comenzó a vender sus primeros panes con gallina india criolla en una carreta tradicional cerca del parque central, usando la mítica receta familiar de recaudo criollo.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
    highlight: 'Fundación en Noviembre de 1968'
  },
  {
    year: '1995',
    title: 'Perfeccionamiento del Curtido Secreto',
    description: 'Nace la firma registrada del curtido de piña fermentada y la salsa caliente de berro que distingue a la marca Benítez en toda la capital.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
    highlight: 'Inauguración del primer local con mesas'
  },
  {
    year: '2008',
    title: 'Sede Principal en la 4a Calle Pte. Barrio El Calvario, Usulután Este',
    description: 'Apertura del espacioso restaurante familiar en la 4a Calle Pte. Barrio El Calvario, Usulután Este, incorporando sopas de gallina criolla y asados a la leña.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    highlight: 'Espacio para 150 comensales'
  },
  {
    year: '2020',
    title: 'Reconocimiento Gastronómico y Expansión',
    description: 'Ganan el premio a la Mejor Receta Tradicional de Panes con Gallina de El Salvador por 3 años consecutivos.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    highlight: 'Premio Culinario Cuscatlán'
  },
  {
    year: '2026',
    title: 'Modernización Digital e Integración Social',
    description: 'Lanzamiento de la plataforma en línea con sincronización de noticias en tiempo real con Facebook e Instagram y servicio express a todo el país.',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=800',
    highlight: 'Pedidos por WhatsApp y Feed en vivo'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    comment: 'Los mejores panes con gallina de todo San Salvador. La salsa de recaudo está bien especiada y la carne super jugosa.',
    rating: 5,
    location: 'Antiguo Cuscatlán'
  },
  {
    id: 2,
    name: 'Sonia de Portillo',
    comment: 'Llevo viniendo con mi familia desde los noventa. El sabor no ha cambiado nada, el curtido artesanal es inigualable.',
    rating: 5,
    location: 'Escalón'
  },
  {
    id: 3,
    name: 'Roberto Gómez',
    comment: 'Increíble servicio. Pido por WhatsApp para pasar trayendo los domingos la sopa y el pan especial. 100% recomendado.',
    rating: 5,
    location: 'Santa Tecla'
  }
];
