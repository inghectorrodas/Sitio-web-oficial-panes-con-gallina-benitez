import React, { useState } from 'react';
import {
  Utensils,
  Search,
  Plus,
  Check,
  Flame,
  Info,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, notes?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  cartCount,
  onOpenCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemDetail, setSelectedItemDetail] = useState<MenuItem | null>(null);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [itemNote, setItemNote] = useState<string>('');

  const categories = [
    { id: 'todos', label: 'Todos los Platillos' },
    { id: 'panes', label: 'Panes con Gallina' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (item: MenuItem, note?: string) => {
    onAddToCart(item, note);
    setAddedAnimationId(item.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
    setSelectedItemDetail(null);
    setItemNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Menu Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="z-10">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-500 mb-2 tracking-widest">
            <Utensils className="w-4 h-4" />
            <span>Sabor 100% Salvadoreño</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Menú de la Casa Benítez
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
            Preparados al momento con ingredientes criollos de primera calidad. Todos nuestros panes incluyen Salsa caliente y curtido especial.
          </p>
        </div>

        <div className="z-10 flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onOpenCart}
            className="w-full md:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-500 text-black font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ver Mi Pedido ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-black shadow-lg shadow-orange-600/20'
                    : 'bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar platillo o ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isJustAdded = addedAnimationId === item.id;
          return (
            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80"></div>

                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-orange-600 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-xl shadow-md">
                      {item.badge}
                    </span>
                  )}

                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-orange-400 border border-orange-500/30 font-black text-lg px-3 py-1 rounded-xl">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <h3 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors leading-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>

                  {/* Ingredients Tags */}
                  {item.ingredients && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.ingredients.slice(0, 4).map((ing, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-lg border border-zinc-700/60"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => setSelectedItemDetail(item)}
                  className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-2xl border border-zinc-700 transition-colors"
                  title="Detalles"
                >
                  <Info className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleAdd(item)}
                  className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                    isJustAdded
                      ? 'bg-emerald-500 text-black'
                      : 'bg-orange-600 hover:bg-orange-500 text-black shadow-lg shadow-orange-600/20'
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>¡Agregado!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Agregar al Pedido</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Detail Modal */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full overflow-hidden space-y-4 shadow-2xl">
            <div className="relative h-56 w-full">
              <img
                src={selectedItemDetail.image}
                alt={selectedItemDetail.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItemDetail(null)}
                className="absolute top-4 right-4 bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-orange-600 text-black text-xl font-black px-3 py-1 rounded-xl">
                ${selectedItemDetail.price.toFixed(2)}
              </div>
            </div>

            <div className="p-6 pt-0 space-y-4">
              <h2 className="text-2xl font-black text-white uppercase">{selectedItemDetail.name}</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{selectedItemDetail.description}</p>

              {selectedItemDetail.ingredients && (
                <div>
                  <h4 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-2">Ingredientes Principales</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItemDetail.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs bg-zinc-800 text-zinc-200 px-2.5 py-1 rounded-xl border border-zinc-700">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-black text-orange-500 uppercase tracking-widest mb-1">
                  Notas de preparación (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Sin cebolla, curtido extra, Salsa..."
                  value={itemNote}
                  onChange={(e) => setItemNote(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setSelectedItemDetail(null)}
                  className="flex-1 py-3 bg-zinc-800 text-zinc-300 font-bold rounded-xl text-xs uppercase"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => handleAdd(selectedItemDetail, itemNote)}
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 text-black font-black rounded-xl text-xs uppercase flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Agregar al Pedido</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
