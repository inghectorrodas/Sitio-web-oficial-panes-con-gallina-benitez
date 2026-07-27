import React, { useState } from 'react';
import { Header } from './components/Header';
import { BentoGridHome } from './components/BentoGridHome';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { SocialSection } from './components/SocialSection';
import { OrderCartModal } from './components/OrderCartModal';
import { ImageManagerModal } from './components/ImageManagerModal';
import { Footer } from './components/Footer';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);

  const handleAddToCart = (item: MenuItem, notes?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        if (notes) updated[existingIndex].notes = notes;
        return updated;
      } else {
        return [...prev, { menuItem: item, quantity: 1, notes }];
      }
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.menuItem.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-orange-600 selection:text-black">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setCartModalOpen(true)}
        onOpenImageManager={() => setImageModalOpen(true)}
      />

      {/* Main Content Render */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <BentoGridHome
            onSelectTab={setActiveTab}
            onAddToCart={handleAddToCart}
            onOpenImageManager={() => setImageModalOpen(true)}
          />
        )}

        {activeTab === 'menu' && (
          <MenuSection
            onAddToCart={handleAddToCart}
            cartCount={totalCartCount}
            onOpenCart={() => setCartModalOpen(true)}
          />
        )}

        {activeTab === 'nosotros' && <AboutSection />}

        {activeTab === 'social' && <SocialSection />}

        {activeTab === 'contacto' && <ContactSection />}
      </main>

      {/* Cart Drawer / Modal */}
      <OrderCartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Image Manager Modal */}
      <ImageManagerModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
      />

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} onOpenImageManager={() => setImageModalOpen(true)} />
    </div>
  );
}
