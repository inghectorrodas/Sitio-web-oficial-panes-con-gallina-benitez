import React from 'react';
import { Users, Heart, CheckCircle, ShieldCheck, Camera, Award } from 'lucide-react';
import pan1Img from '../assets/pan1.jpg';
import pan2Img from '../assets/pan2.jpg';
import mamaImg from '../assets/mama.png';
import abuelaImg from '../assets/abuela.jpg';
import { getImage } from '../utils/imageStore';

export const AboutSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-500 mb-2 tracking-widest">
            <Users className="w-4 h-4" />
            <span>Familia Benítez</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Sobre Nosotros
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
            Somos una empresa familiar salvadoreña dedicada a ofrecer la experiencia gastronómica más auténtica de panes con gallina india en Usulután Este.
          </p>
        </div>

        <div className="z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-800 w-full md:w-auto">
          <div className="flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-zinc-800 pb-3 sm:pb-0 sm:pr-4">
            <img
              src={getImage('abuela', abuelaImg)}
              alt="Doña Lucía Benítez"
              className="w-12 h-12 rounded-xl object-cover border border-orange-500/50 shrink-0 shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300';
              }}
            />
            <div>
              <div className="text-sm font-black text-white">Doña Lucía Benítez</div>
              <div className="text-[11px] text-orange-400 font-bold uppercase">Fundadora (1968)</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={getImage('mama', mamaImg)}
              alt="Morenas del Carmen Benítez de Rodas"
              className="w-12 h-12 rounded-xl object-cover border border-amber-500/50 shrink-0 shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300';
              }}
            />
            <div>
              <div className="text-sm font-black text-white">Morenas del Carmen Benítez de Rodas</div>
              <div className="text-[11px] text-orange-400 font-bold uppercase">Legado & Dirección</div>
            </div>
          </div>
        </div>
      </div>

      {/* Photography & Leadership Highlight */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-orange-500 text-xs font-black uppercase tracking-widest">
              <Camera className="w-4 h-4" />
              <span>Fotografía & Historia Familiar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Legado & Rostros de Nuestra Tradición
            </h2>
          </div>
          <span className="bg-orange-600/20 border border-orange-500/40 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Sazón de Generaciones</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-square">
            <img
              src={getImage('abuela', abuelaImg)}
              alt="Doña Lucía Benítez - Fundadora"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
              <span className="text-xs font-black text-orange-400 uppercase tracking-wider">Doña Lucía Benítez</span>
              <p className="text-xs text-zinc-300 font-medium">Fundadora Original (Nov. 1968)</p>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-square">
            <img
              src={getImage('mama', mamaImg)}
              alt="Morenas del Carmen Benítez de Rodas"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
              <span className="text-xs font-black text-orange-400 uppercase tracking-wider">Morenas del Carmen Benítez de Rodas</span>
              <p className="text-xs text-zinc-300 font-medium">Continuidad y Dirección Familiar</p>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-square">
            <img
              src={getImage('pan1', pan1Img)}
              alt="Pan Con Pechuga Tradicional"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/pan1.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
              <span className="text-xs font-black text-orange-400 uppercase tracking-wider">Pan Con Pechuga</span>
              <p className="text-xs text-zinc-300 font-medium">Servido con Berro Fresco & Salsa</p>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-square">
            <img
              src={getImage('pan2', pan2Img)}
              alt="Pan Con Entre Pierna Benítez"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/pan2.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
              <span className="text-xs font-black text-orange-400 uppercase tracking-wider">Pan Con Entre Pierna</span>
              <p className="text-xs text-zinc-300 font-medium">Jugosa Gallina India de Patio</p>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2">
          Bajo la dedicación de <strong className="text-white font-bold">Morenas del Carmen Benítez de Rodas</strong>, mantenemos vivos los estándares artesanales que dieron inicio en noviembre de 1968. Cada platillo se prepara siguiendo rigurosos procesos de higiene, gallina india de corral y la receta familiar inconfundible que nos ha convertido en un referente gastronómico de Usulután Este.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-4">
          <div className="p-3 bg-orange-600/20 text-orange-500 rounded-2xl w-fit border border-orange-500/30">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase">Nuestra Misión</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Preservar, dignificar y promover los sabores criollos de El Salvador, brindando platillos preparados con gallinas criollas seleccionadas, vegetales frescos de pequeños agricultores locales y el trato cálido de nuestro personal.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl space-y-4">
          <div className="p-3 bg-orange-600/20 text-orange-500 rounded-2xl w-fit border border-orange-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase">Nuestros Valores</h2>
          <ul className="space-y-2 text-zinc-300 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-orange-500" />
              <span><strong>Autenticidad:</strong> Sin saborizantes ni sazonadores artificiales.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-orange-500" />
              <span><strong>Higiene y Calidad:</strong> Estándares rigurosos de manipulado de alimentos.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-orange-500" />
              <span><strong>Servicio Cálido:</strong> El comensal es recibido como en casa.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};


