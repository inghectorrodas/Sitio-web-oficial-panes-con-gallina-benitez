import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Plus,
  Utensils,
  Award,
  CheckCircle,
  Flame,
  Truck,
  Camera
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO, INITIAL_SOCIAL_POSTS } from '../data/restaurantData';
import { MenuItem } from '../types';
import { getImage } from '../utils/imageStore';

interface BentoGridHomeProps {
  onSelectTab: (tab: string) => void;
  onAddToCart: (item: MenuItem) => void;
  onOpenImageManager?: () => void;
}

export const BentoGridHome: React.FC<BentoGridHomeProps> = ({
  onSelectTab,
  onAddToCart,
  onOpenImageManager,
}) => {
  const [isSaturday, setIsSaturday] = useState(false);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 6 = Saturday
      setIsSaturday(day === 6);
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const menuHighlights = MENU_ITEMS.filter((i) => i.popular || i.badge).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Welcome Notification / Announcement */}
      <div className="bg-gradient-to-r from-zinc-900 via-orange-950/40 to-zinc-900 border border-orange-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-600/20 text-orange-500 rounded-xl border border-orange-500/30 flex-shrink-0">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              ¡Sabor Criollo Auténtico desde noviembre de 1968!
            </h3>
            <p className="text-xs text-zinc-400">
              Disfruta de nuestros Panes con Gallina India con abundante Salsa caliente y curtido artesanal.
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => onSelectTab('menu')}
            className="flex-1 sm:flex-none px-4 py-2 bg-orange-600 hover:bg-orange-500 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-600/20 flex items-center justify-center gap-1.5"
          >
            <span>Ver Menú</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
        
        {/* BRAND HEADER TILE (col-span-8) */}
        <div className="md:col-span-8 bg-zinc-900 border-2 border-orange-600 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-600/20 transition-all"></div>

          <div className="my-6 z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
                <span className="text-orange-500 block">Panes con Gallina</span>
                <span className="text-white">Benítez</span>
              </h1>
              <p className="text-zinc-400 mt-3 text-sm sm:text-base max-w-xl font-medium">
                El verdadero sabor criollo servido con berro fresco, huevo duro, pepino y la receta secreta de la Salsa de la abuela Lucía.
              </p>
            </div>
          </div>


        </div>

        {/* QUICK STATUS / EST TILE (col-span-4) */}
        <div className="md:col-span-4 bg-orange-600 rounded-3xl p-6 text-black flex flex-col justify-between shadow-xl shadow-orange-600/10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full pointer-events-none"></div>

          <div>
            <div className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Estado del Servicio</div>
            <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isSaturday ? 'bg-black animate-ping' : 'bg-black/30'}`}></span>
              {isSaturday ? 'HOY ABRIMOS' : 'HOY CERRADO'}
            </div>
            <div className="text-sm font-bold opacity-90 mt-1">
              {isSaturday
                ? 'De 4:00 PM a 10:00 PM (hasta agotar existencias)'
                : 'Abrimos el día Sábados de 4:00 PM a 10:00 PM (hasta agotar existencias)'}
            </div>
          </div>

          <div className="my-6 py-4 border-y border-black/15 flex justify-around items-center text-center">
            <div>
              <div className="text-2xl font-black">58 Años</div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">De Tradición</div>
            </div>
            <div className="h-8 w-px bg-black opacity-20"></div>
            <div>
              <div className="text-2xl font-black">NOV. 1968</div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Usulután Este</div>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('contacto')}
            className="w-full py-3 bg-black hover:bg-zinc-900 text-orange-500 font-black rounded-2xl uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <MapPin className="w-4 h-4" />
            <span>Cómo Llegar</span>
          </button>
        </div>

        {/* MENU HIGHLIGHTS (col-span-6) */}
        <div className="md:col-span-6 lg:col-span-6 bg-orange-600 rounded-3xl p-6 text-black flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-black uppercase leading-tight tracking-tight">
                Nuestro<br />Menú Estrella
              </h2>
              <Utensils className="w-7 h-7 text-black opacity-80" />
            </div>

            <div className="space-y-3">
              {menuHighlights.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-black/15 pb-2.5 group"
                >
                  <div>
                    <div className="font-extrabold text-sm leading-tight flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-black text-orange-400 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-black/70 line-clamp-1 font-medium">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="font-black text-base">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="p-1 bg-black text-orange-400 rounded-lg hover:bg-zinc-900 transition-colors"
                      title="Agregar"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectTab('menu')}
            className="mt-6 w-full py-3.5 bg-black hover:bg-zinc-900 text-orange-500 font-black rounded-2xl uppercase tracking-widest text-xs transition-colors shadow-lg"
          >
            Ver Menú Completo & Precios
          </button>
        </div>

        {/* CONTACT INFO CARD (col-span-6) */}
        <div className="md:col-span-6 lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-black text-orange-500 uppercase mb-4 tracking-[0.2em] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Contacto
            </h2>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">Dirección</div>
                <div className="text-xs font-semibold text-white leading-snug mt-0.5">
                  Final Avenida Gregorio Melara al costado Oriente de Iglesia El Calvario Barrio El Calvario, Usulután Este, El Salvador.
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">Teléfono Directo</div>
                <div className="text-base font-black text-orange-400 tracking-tight">
                  {RESTAURANT_INFO.phone}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-zinc-500">WhatsApp Pedidos</div>
                <div className="text-sm font-extrabold text-emerald-400 tracking-tight">
                  {RESTAURANT_INFO.whatsapp}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Redes Oficiales</span>
            <div className="flex gap-2">
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-blue-600 hover:text-white text-zinc-300 flex items-center justify-center border border-zinc-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-pink-600 hover:text-white text-zinc-300 flex items-center justify-center border border-zinc-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* NOSOTROS TILE (col-span-3) */}
        <div className="md:col-span-6 lg:col-span-3 bg-zinc-800/80 border border-zinc-700/60 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-black text-orange-400 uppercase mb-3 tracking-[0.2em]">
              Sobre Nosotros
            </h2>
            <p className="text-xs leading-relaxed text-zinc-300 font-medium">
              Fundado por la <strong className="text-white font-bold">Familia Benítez</strong> en noviembre de 1968, preservamos el auténtico sabor de la gallina india de patio, servida con amor, abundante Salsa y tradición salvadoreña.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-700/60 flex items-center justify-between">
            <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">Desde 1968</span>
            <button
              onClick={() => onSelectTab('nosotros')}
              className="text-xs font-black text-white hover:text-orange-400 uppercase tracking-wider flex items-center gap-1"
            >
              <span>Conócenos</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* SOCIAL MEDIA FEEDS WIDGETS TILE (col-span-12) */}
        <div className="md:col-span-12 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-orange-500 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Comunidad & Noticias</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
                Feeds de <span className="text-blue-400">Facebook</span> & <span className="text-pink-500">Instagram</span>
              </h2>
            </div>

            <button
              onClick={() => onSelectTab('social')}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-orange-400 font-black text-xs uppercase tracking-wider rounded-xl transition-all border border-orange-500/30 flex items-center gap-1.5"
            >
              <span>Ver Feed Completo & Interactivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid showing Facebook and Instagram preview cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facebook News Widget Card */}
            <div className="bg-zinc-950 border border-blue-500/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    <Facebook className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-white">Facebook Noticias</div>
                    <div className="text-[10px] text-zinc-400">Página Oficial • 5.8k seguidores</div>
                  </div>
                </div>
                <a
                  href={RESTAURANT_INFO.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-black text-blue-400 hover:underline uppercase"
                >
                  Ir a Facebook
                </a>
              </div>

              <div className="text-xs text-zinc-300 line-clamp-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 font-medium">
                "{INITIAL_SOCIAL_POSTS.find((p) => p.platform === 'facebook')?.content}"
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <span>👍 {INITIAL_SOCIAL_POSTS.find((p) => p.platform === 'facebook')?.likes} Me gusta</span>
                <button
                  onClick={() => onSelectTab('social')}
                  className="font-bold text-orange-400 hover:underline"
                >
                  Ver comentarios →
                </button>
              </div>
            </div>

            {/* Instagram Feed Widget Card */}
            <div className="bg-zinc-950 border border-pink-500/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-white">Instagram Feed</div>
                    <div className="text-[10px] text-zinc-400">@panescongallina_benitez</div>
                  </div>
                </div>
                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-black text-pink-400 hover:underline uppercase"
                >
                  Ir a Instagram
                </a>
              </div>

              <div className="text-xs text-zinc-300 line-clamp-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 font-medium">
                "{INITIAL_SOCIAL_POSTS.find((p) => p.platform === 'instagram')?.content}"
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                <span>❤️ {INITIAL_SOCIAL_POSTS.find((p) => p.platform === 'instagram')?.likes} Me gusta</span>
                <button
                  onClick={() => onSelectTab('social')}
                  className="font-bold text-orange-400 hover:underline"
                >
                  Ver fotos y tags →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION / RESERVATION & DELIVERY (col-span-9) */}
        <div className="md:col-span-12 lg:col-span-9 bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
          <div className="z-10 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-[10px] font-black uppercase mb-3 border border-orange-500/30">
              <Truck className="w-3.5 h-3.5" />
              Servicio a Domicilio Express
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase italic leading-none mb-2 text-white">
              ¿Hambre de lo bueno? <br />
              <span className="text-orange-500">Pide a tu puerta</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Llevamos tus panes con gallina recién preparados y la Salsa bien caliente.
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hola%20Panes%20Ben%C3%ADtez!%20Quiero%20hacer%20un%20pedido%20a%20domicilio`}
              target="_blank"
              rel="noreferrer"
              className="bg-orange-600 hover:bg-orange-500 text-black px-8 py-4 rounded-2xl font-black text-xl text-center shadow-xl shadow-orange-600/20 transition-all transform hover:scale-105 rotate-1 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>

          {/* Abstract background shape */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-600/10 rounded-full pointer-events-none"></div>
        </div>

      </div>
    </div>
  );
};
