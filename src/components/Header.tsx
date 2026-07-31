import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Clock, MapPin, Menu, X, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenImageManager: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenImageManager
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSaturday, setIsSaturday] = useState(false);

  // Check if today is Saturday (6)
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

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'menu', label: 'Nuestro Menú' },
    { id: 'social', label: 'Redes Sociales' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'contacto', label: 'Contacto & Pedidos' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-black px-4 py-1.5 text-xs font-bold tracking-wide">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded text-[11px]">
              <span className={`w-2 h-2 rounded-full ${isSaturday ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
              {isSaturday
                ? 'HOY ABRIMOS DE 4:00 PM A 10:00 PM (HASTA AGOTAR EXISTENCIAS)'
                : 'HOY CERRADO - ABRIMOS SÁBADOS DE 4:00 PM A 10:00 PM'}
            </span>
            <span className="hidden sm:inline-block">|</span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {RESTAURANT_INFO.hoursWeekdays}
            </span>
            <span className="hidden md:inline-block">|</span>
            <span className="hidden md:inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hola!%20Quiero%20pedir%20panes%20con%20gallina`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-black text-orange-400 hover:text-white px-2.5 py-0.5 rounded text-[11px] transition-colors"
            >
              <Phone className="w-3 h-3 fill-current" />
              <span>Pedido WhatsApp</span>
            </a>
            <span className="font-extrabold tracking-widest text-[10px] uppercase opacity-80">DESDE NOVIEMBRE DE 1968</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div>
            <div className="text-lg sm:text-2xl font-black tracking-tighter uppercase leading-none">
              <span className="text-orange-500">Panes con Gallina</span> <span className="text-white">Benítez</span>
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-zinc-400 tracking-widest uppercase flex items-center gap-1">
              Un Legado que Sigue VIVO....
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-600 text-black shadow-md shadow-orange-600/20 font-black'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Image Manager, Cart & Mobile Menu Trigger) */}
        <div className="flex items-center space-x-3">

          <button
            onClick={onOpenCart}
            className="relative bg-zinc-900 border border-orange-500/40 hover:border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black p-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 group"
            title="Ver Pedido"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-black uppercase">Pedido</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-black font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden bg-zinc-900 text-zinc-300 p-2.5 rounded-xl border border-zinc-800 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-between ${
                  isActive
                    ? 'bg-orange-600 text-black font-black'
                    : 'text-zinc-300 bg-zinc-900/60 hover:bg-zinc-800'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <Sparkles className="w-4 h-4 text-black" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
