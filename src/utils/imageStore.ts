import pan1Img from '../assets/pan1.jpg';
import pan2Img from '../assets/pan2.jpg';
import mamaImg from '../assets/mama.png';
import abuelaImg from '../assets/abuela.jpg';

export interface ImageSlot {
  id: string;
  name: string;
  section: string;
  defaultImage: string;
  description: string;
}

export const IMAGE_SLOTS: ImageSlot[] = [
  {
    id: 'pan1',
    name: 'Pan con Pechuga de Gallina India',
    section: 'Menú - Especialidades',
    defaultImage: pan1Img,
    description: 'Imagen principal del tradicional Pan con Pechuga servido con berro y salsa de recaudo.'
  },
  {
    id: 'pan2',
    name: 'Pan con Entre Pierna Benítez',
    section: 'Menú - Especialidades',
    defaultImage: pan2Img,
    description: 'Imagen principal del suculento Pan con Entre Pierna de gallina india.'
  },
  {
    id: 'abuela',
    name: 'Doña Lucía Benítez (Fundadora)',
    section: 'Nosotros & Historia',
    defaultImage: abuelaImg,
    description: 'Fotografía histórica de la fundadora que inició la tradición en noviembre de 1968.'
  },
  {
    id: 'mama',
    name: 'Morenas del Carmen Benítez de Rodas',
    section: 'Nosotros & Directora',
    defaultImage: mamaImg,
    description: 'Fotografía actual de la propietaria y guardiana de la receta secreta.'
  },
  {
    id: 'history1',
    name: 'Inicios en Usulután (1968)',
    section: 'Historia / Cronología',
    defaultImage: abuelaImg,
    description: 'Imagen para el evento de fundación en noviembre de 1968.'
  },
  {
    id: 'social1',
    name: 'Publicación Redes Sociales #1',
    section: 'Redes / Comentarios',
    defaultImage: pan1Img,
    description: 'Imagen destacada en el muro social de Facebook / Instagram.'
  },
  {
    id: 'social2',
    name: 'Publicación Redes Sociales #2',
    section: 'Redes / Comentarios',
    defaultImage: pan2Img,
    description: 'Segunda imagen destacada en el muro social.'
  }
];

const STORAGE_KEY = 'panes_benitez_custom_images_v1';

export function getStoredImages(): Record<string, string> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading custom images from localStorage', e);
  }
  return {};
}

export function saveStoredImages(images: Record<string, string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    // Dispatch custom event so components can react instantly
    window.dispatchEvent(new Event('customImagesChanged'));
  } catch (e) {
    console.error('Error saving custom images to localStorage', e);
  }
}

export function getImage(id: string, defaultFallback: string): string {
  const custom = getStoredImages();
  if (custom[id]) {
    return custom[id];
  }
  return defaultFallback;
}
