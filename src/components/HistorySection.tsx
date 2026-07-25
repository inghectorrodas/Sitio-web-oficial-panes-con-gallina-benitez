import React from 'react';
import { HISTORY_TIMELINE } from '../data/restaurantData';
import { Clock, Award, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

export const HistorySection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-500 mb-2 tracking-widest">
            <Clock className="w-4 h-4" />
            <span>Desde noviembre de 1968 en Usulután Este</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Nuestra Historia & Tradición
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
            Más de 5 décadas preservando la auténtica sazón de los Panes con Gallina India salvadoreña. Una herencia familiar de amor, dedicación y sabor único.
          </p>
        </div>

        <div className="z-10 bg-orange-600 text-black p-6 rounded-3xl text-center shadow-2xl flex-shrink-0 w-full md:w-auto">
          <div className="text-4xl sm:text-5xl font-black">58 Años</div>
          <div className="text-xs font-extrabold uppercase tracking-widest mt-1">De Tradición Criolla</div>
        </div>
      </div>

      {/* Secret Recipe Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-3">
          <div className="w-10 h-10 bg-orange-600/20 text-orange-500 rounded-2xl flex items-center justify-center border border-orange-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-white uppercase">El Salsa Secreto</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Elaborado diariamente con tomates de ramada, ajonjolí tostado, pepitoria, clavo de olor, achiote criollo y verduras frescas molidas en piedra.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-3">
          <div className="w-10 h-10 bg-orange-600/20 text-orange-500 rounded-2xl flex items-center justify-center border border-orange-500/30">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-white uppercase">100% Gallina de Criolla</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Solo utilizamos gallinas criollas alimentadas naturalmente, garantizando una carne suave, sabrosa y un caldo espeso rico en colágeno.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-3">
          <div className="w-10 h-10 bg-orange-600/20 text-orange-500 rounded-2xl flex items-center justify-center border border-orange-500/30">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-black text-white uppercase">Curtido de Vinagre de Piña</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Fermentación artesanal de piñas maduras con orégano silvestre, chile verde y cebolla morada que le da el toque ácido crujiente perfecto.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-white uppercase text-center tracking-wider">
          Línea del Tiempo del Sabor
        </h2>

        <div className="relative border-l-2 border-orange-600/40 ml-4 sm:ml-32 space-y-12">
          {HISTORY_TIMELINE.map((item, index) => (
            <div key={index} className="relative pl-6 sm:pl-10 group">
              {/* Year Marker Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-black border-4 border-orange-600 flex items-center justify-center text-orange-500 font-bold group-hover:scale-125 transition-transform">
                <CheckCircle2 className="w-4 h-4 fill-orange-600 text-black" />
              </div>

              {/* Year Label */}
              <div className="sm:absolute sm:-left-32 sm:top-1 font-black text-3xl sm:text-2xl text-orange-500 tracking-tighter sm:text-right sm:w-24 mb-2 sm:mb-0">
                {item.year}
              </div>

              {/* Content Card */}
              <div className="bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 p-6 rounded-3xl transition-all shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-800 pb-3">
                  <h3 className="text-xl font-black text-white uppercase">{item.title}</h3>
                  {item.highlight && (
                    <span className="text-[10px] font-black uppercase bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">
                      {item.highlight}
                    </span>
                  )}
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed">{item.description}</p>

                {item.image && (
                  <div className="h-48 sm:h-64 w-full rounded-2xl overflow-hidden border border-zinc-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
