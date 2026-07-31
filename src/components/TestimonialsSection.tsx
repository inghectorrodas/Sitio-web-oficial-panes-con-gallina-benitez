import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, Quote, User, ThumbsUp, Send, X, Award } from 'lucide-react';
import { Testimonial } from '../types';
import { INITIAL_TESTIMONIALS } from '../data/restaurantData';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [filterRating, setFilterRating] = useState<number>(0); // 0 = all
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Form State
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newDish, setNewDish] = useState('Pan Con Pechuga');

  useEffect(() => {
    const stored = localStorage.getItem('pcgb_testimonials');
    if (stored) {
      try {
        setTestimonials(JSON.parse(stored));
      } catch (e) {
        setTestimonials(INITIAL_TESTIMONIALS);
      }
    } else {
      setTestimonials(INITIAL_TESTIMONIALS);
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newEntry: Testimonial = {
      id: `t-user-${Date.now()}`,
      name: newName.trim(),
      location: newLocation.trim() || 'Usulután',
      comment: newComment.trim(),
      rating: newRating,
      date: 'Hace un momento',
      dishRecommended: newDish,
      verified: true,
    };

    const updated = [newEntry, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('pcgb_testimonials', JSON.stringify(updated));

    // Reset Form
    setNewName('');
    setNewLocation('');
    setNewComment('');
    setNewRating(5);
    setShowAddModal(false);
  };

  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredTestimonials = filterRating === 0
    ? testimonials
    : testimonials.filter((t) => t.rating === filterRating);

  return (
    <section className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Opiniones & Experiencias</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
            Lo que dicen nuestros <span className="text-orange-500">Clientes</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            La sazón casera de la abuela Lucía ha deleitado a generaciones. Conoce las historias y recomendaciones de quienes nos visitan en Usulután Este.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-black font-black text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-600/20 flex-shrink-0"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Dejar mi Opinión</span>
        </button>
      </div>

      {/* Key Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-black text-white font-mono">5.0 / 5.0</div>
            <div className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">
              Satisfacción de Clientes
            </div>
          </div>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-white font-mono">+58 Años</div>
            <div className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">
              Tradición Criolla
            </div>
          </div>
        </div>

        <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-black text-white font-mono">100% Orgánico</div>
            <div className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">
              Gallina Criolla de Patio
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar relative z-10">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mr-2">Filtrar:</span>
        <button
          onClick={() => setFilterRating(0)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterRating === 0
              ? 'bg-orange-500 text-black shadow-md shadow-orange-500/20'
              : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
          }`}
        >
          Todas ({testimonials.length})
        </button>
        <button
          onClick={() => setFilterRating(5)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
            filterRating === 5
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
          }`}
        >
          <Star className="w-3 h-3 fill-current" />
          <span>5 Estrellas ({testimonials.filter((t) => t.rating === 5).length})</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredTestimonials.map((item) => {
          const isLiked = !!likedMap[item.id];
          return (
            <div
              key={item.id}
              className="bg-zinc-950/90 border border-zinc-800/90 hover:border-orange-500/40 rounded-2xl p-6 flex flex-col justify-between gap-4 transition-all hover:shadow-xl hover:shadow-orange-950/20 group relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-zinc-800/40 group-hover:text-orange-500/10 transition-colors pointer-events-none" />

              <div className="space-y-3">
                {/* Stars and Verified badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verificado</span>
                    </span>
                  )}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{item.comment}"
                </p>

                {/* Recommended Dish */}
                {item.dishRecommended && (
                  <div className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    Platillo: {item.dishRecommended}
                  </div>
                )}
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs uppercase">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white leading-snug">{item.name}</div>
                    <div className="text-[11px] text-zinc-500">{item.location} • {item.date}</div>
                  </div>
                </div>

                <button
                  onClick={() => toggleLike(item.id)}
                  className={`p-2 rounded-xl transition-all ${
                    isLiked
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900'
                  }`}
                  title="¿Te sirvió esta reseña?"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-orange-400' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for adding a new review */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Escribe tu Reseña</span>
              </div>
              <h3 className="text-xl font-black uppercase text-white">
                Tu opinión nos importa mucho
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Comparte tu experiencia probando los Panes con Gallina Benítez en Usulután Este.
              </p>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Calificación
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= newRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-zinc-700 hover:text-zinc-500'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-2 font-mono">
                    {newRating}.0 / 5.0
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Ramos"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Ubicación / Ciudad
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Usulután Este"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Platillo Recomendado
                </label>
                <select
                  value={newDish}
                  onChange={(e) => setNewDish(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Pan Con Pechuga">Pan Con Pechuga ($6.00)</option>
                  <option value="Pan Con Entre Pierna">Pan Con Entre Pierna ($6.00)</option>
                  <option value="Sopa de Gallina India">Sopa de Gallina India</option>
                  <option value="Salsa Especial y Curtido">Salsa Especial y Curtido</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Tu Opinión / Comentario *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Escribe aquí tu experiencia con la sazón, los ingredientes o la atención..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-black text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Opinión</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
