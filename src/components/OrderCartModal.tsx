import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Truck,
  Store,
  MapPin,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getImage } from '../utils/imageStore';

interface OrderCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const OrderCartModal: React.FC<OrderCartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );
  const deliveryFee = subtotal === 0 || orderType === 'pickup' ? 0 : 3.00;
  const grandTotal = subtotal + deliveryFee;

  const buildWhatsAppText = () => {
    let text = `*NUEVO PEDIDO / RESERVA - PANES CON GALLINA BENÍTEZ*\n`;
    text += `-----------------------------------\n`;
    text += `*Cliente:* ${customerName || 'Cliente'}\n`;
    text += `*Tipo de Servicio:* ${orderType === 'delivery' ? '🛵 Envío a Domicilio' : '🏪 Retiro en Local'}\n`;
    if (orderType === 'delivery') {
      text += `*Dirección de Entrega:* ${deliveryAddress || 'Pendiente por especificar'}\n`;
      text += `*Horario de Entrega:* Sábado entre 4:40 PM y 5:40 PM\n`;
    } else {
      text += `*Lugar de Retiro:* ${RESTAURANT_INFO.address}\n`;
      text += `*Horario de Retiro:* Sábado de 4:40 PM a 5:40 PM\n`;
    }
    text += `*Método de Pago:* ${paymentMethod}\n\n`;
    text += `*DETALLE DEL PEDIDO:*\n`;

    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.quantity}x ${item.menuItem.name} - $${(item.menuItem.price * item.quantity).toFixed(2)}\n`;
      if (item.notes) {
        text += `   _Nota: ${item.notes}_\n`;
      }
    });

    text += `\n-----------------------------------\n`;
    text += `*Subtotal:* $${subtotal.toFixed(2)}\n`;
    text += `*Costo de Envío:* ${orderType === 'pickup' ? 'GRATIS ($0.00)' : `$${deliveryFee.toFixed(2)}`}\n`;
    text += `*TOTAL A PAGAR:* $${grandTotal.toFixed(2)}\n\n`;
    text += `¡Gracias! Quedo a la espera de la confirmación de mi pedido/reserva.`;

    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="bg-zinc-950 border-l border-zinc-800 w-full max-w-md h-full flex flex-col justify-between p-6 overflow-y-auto">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-black text-white uppercase tracking-wider">
                Mi Pedido
              </h2>
              <span className="text-xs font-bold bg-orange-600 text-black px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-zinc-900 text-zinc-400 hover:text-white rounded-xl border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Announcement Banner for Buyer */}
          <div className="bg-orange-950/40 border border-orange-500/30 p-3 rounded-2xl mb-3 flex items-start gap-2.5 text-xs">
            <div className="p-1.5 bg-orange-500/20 text-orange-400 rounded-lg shrink-0 mt-0.5">
              {orderType === 'delivery' ? <Truck className="w-4 h-4" /> : <Store className="w-4 h-4" />}
            </div>
            <div className="text-zinc-300 space-y-1 text-[11px] leading-snug">
              <div className="font-bold text-orange-400 uppercase tracking-wide">
                📢 Pedidos & Reservas Anticipadas
              </div>
              <p>
                Puedes realizar tu pedido o reserva con anticipación para el día <strong className="text-white">Sábado</strong>.
              </p>
              <div className="bg-zinc-900/90 p-2 rounded-xl border border-orange-500/20 space-y-1 mt-1.5 text-[10px]">
                {orderType === 'delivery' ? (
                  <>
                    <div className="text-zinc-300 font-semibold flex items-center justify-between">
                      <span>⏰ Lapso de entrega a domicilio:</span>
                      <span className="text-orange-400 font-bold">Sábados 4:40 PM - 5:40 PM</span>
                    </div>
                    <div className="text-zinc-300 font-semibold flex items-center justify-between">
                      <span>🛵 Costo de envío:</span>
                      <span className="text-emerald-400 font-bold">$3.00 USD</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-zinc-300 font-semibold flex items-center justify-between">
                      <span>🏪 Horario de retiro en local:</span>
                      <span className="text-orange-400 font-bold">Sábados 4:40 PM - 5:40 PM</span>
                    </div>
                    <div className="text-zinc-300 font-semibold flex items-center justify-between">
                      <span>✨ Costo de envío:</span>
                      <span className="text-emerald-400 font-bold uppercase">GRATIS ($0.00)</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Cart items list */}
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-900 text-zinc-600 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-zinc-300 uppercase">Tu carrito está vacío</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Explora nuestro menú y agrega unos deliciosos Panes con Gallina o Sopa caliente.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
              {cartItems.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl flex items-center justify-between gap-3"
                >
                  <img
                    src={getImage(item.menuItem.id === 'pan-pechuga' ? 'pan1' : item.menuItem.id === 'pan-entre-pierna' ? 'pan2' : 'pan1', item.menuItem.image)}
                    alt={item.menuItem.name}
                    className="w-14 h-14 rounded-xl object-cover border border-zinc-800 flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = item.menuItem.id === 'pan-entre-pierna' ? '/pan2.jpg' : '/pan1.jpg';
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.menuItem.name}</h4>
                    <div className="text-xs font-black text-orange-400 mt-0.5">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </div>
                    {item.notes && (
                      <div className="text-[10px] text-zinc-400 italic truncate">
                        "{item.notes}"
                      </div>
                    )}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                    <button
                      onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                      className="p-1 hover:bg-zinc-800 text-zinc-300 rounded-lg"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-black text-white px-1.5">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                      className="p-1 hover:bg-zinc-800 text-zinc-300 rounded-lg"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.menuItem.id)}
                    className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Details & WhatsApp Checkout */}
        {cartItems.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <div className="space-y-2.5">
              {/* Order Type Selector: Domicilio vs Retiro */}
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  ¿Cómo deseas recibir tu pedido?
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      orderType === 'delivery'
                        ? 'bg-orange-600/20 border-orange-500 text-orange-400 shadow-sm'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Domicilio ($3.00)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${
                      orderType === 'pickup'
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 shadow-sm'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Retiro en Local ($0)</span>
                  </button>
                </div>
              </div>

              {/* Customer Name */}
              <input
                type="text"
                placeholder="Tu Nombre completo..."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
              />

              {/* Address Field or Store Location Info */}
              {orderType === 'delivery' ? (
                <input
                  type="text"
                  placeholder="Dirección exacta de entrega en Usulután Este..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                />
              ) : (
                <div className="bg-zinc-900/90 border border-emerald-500/30 p-2.5 rounded-xl flex items-start gap-2 text-xs">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-emerald-400 text-[11px]">Dirección de Retiro:</div>
                    <div className="text-zinc-300 text-[11px] font-medium leading-tight">
                      {RESTAURANT_INFO.address}
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="flex gap-2 text-xs">
                <label className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center text-zinc-300 font-bold cursor-pointer has-[:checked]:border-orange-500 has-[:checked]:text-orange-400">
                  <input
                    type="radio"
                    name="payment"
                    value="Efectivo"
                    checked={paymentMethod === 'Efectivo'}
                    onChange={() => setPaymentMethod('Efectivo')}
                    className="hidden"
                  />
                  Efectivo
                </label>
                <label className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center text-zinc-300 font-bold cursor-pointer has-[:checked]:border-orange-500 has-[:checked]:text-orange-400">
                  <input
                    type="radio"
                    name="payment"
                    value="Tarjeta / Chivo"
                    checked={paymentMethod === 'Tarjeta / Chivo'}
                    onChange={() => setPaymentMethod('Tarjeta / Chivo')}
                    className="hidden"
                  />
                  Tarjeta / QR
                </label>
              </div>
            </div>

            {/* Calculations */}
            <div className="bg-zinc-900 p-3.5 rounded-2xl border border-zinc-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span className="flex items-center gap-1">
                  {orderType === 'delivery' ? (
                    <Truck className="w-3.5 h-3.5 text-orange-400" />
                  ) : (
                    <Store className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  {orderType === 'delivery' ? 'Envío Domicilio:' : 'Retiro en Local:'}
                </span>
                <span className={`font-bold ${orderType === 'pickup' ? 'text-emerald-400' : 'text-white'}`}>
                  {orderType === 'pickup' ? 'GRATIS ($0.00)' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="text-[10px] text-zinc-400 font-medium pt-1 border-t border-zinc-800/60">
                {orderType === 'delivery' ? (
                  <span>* Envíos los Sábados entre <span className="text-orange-400 font-bold">4:40 PM y 5:40 PM</span> ($3.00)</span>
                ) : (
                  <span>* Retiro los Sábados entre <span className="text-emerald-400 font-bold">4:40 PM y 5:40 PM</span> (Sin costo)</span>
                )}
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
                <span>TOTAL:</span>
                <span className="text-orange-500">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit via WhatsApp */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${buildWhatsAppText()}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Enviar Pedido a WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

