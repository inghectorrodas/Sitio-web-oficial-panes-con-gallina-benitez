import React from 'react';
import { Facebook, Instagram, Phone, MapPin, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-xl font-black tracking-tighter uppercase leading-none">
                  <span className="text-orange-500">Panes con Gallina</span> Benítez
                </div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
                  DESDE NOVIEMBRE DE 1968 • {RESTAURANT_INFO.city}
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Tradición culinaria salvadoreña servida con la sazón casera de la abuela Lucía. Panes con gallina india, Salsa espeso caliente y curtido artesanal.
            </p>

            <div className="flex gap-3 pt-1">
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-blue-600 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-800 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-pink-600 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-800 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-orange-500 tracking-widest">Navegación</h4>
            <ul className="space-y-2 text-xs font-semibold text-zinc-400">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-orange-400 transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('menu')} className="hover:text-orange-400 transition-colors">
                  Nuestro Menú & Precios
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('nosotros')} className="hover:text-orange-400 transition-colors">
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('contacto')} className="hover:text-orange-400 transition-colors">
                  Ubicación & Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase text-orange-500 tracking-widest">Atención al Cliente</h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp Domicilios: {RESTAURANT_INFO.whatsapp}</span>
              </div>
              <div className="text-[11px] text-zinc-500 mt-2">
                Horario: {RESTAURANT_INFO.hoursWeekdays}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} Panes con Gallina Benítez. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-current" />
            <span>en El Salvador</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
