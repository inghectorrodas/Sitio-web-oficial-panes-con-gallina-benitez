import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Facebook,
  Instagram,
  CheckCircle2,
  Navigation,
  Truck
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Consulta General',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: 'Consulta General', message: '' });
    }, 4000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Panes con Gallina Benítez! Mi nombre es ${formData.name || 'Cliente'}. ${formData.message}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-500 mb-2 tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>Estamos para Servirte</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Contacto & Domicilios
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed">
            Visítanos en nuestra sede principal en Usulután Este o solicita tus pedidos con envío express directo a tu residencia o trabajo.
          </p>
        </div>

        <div className="z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Hola!%20Quiero%20hacer%20un%20pedido%20a%20domicilio`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Pedir por WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-black text-white uppercase tracking-tight border-b border-zinc-800 pb-4">
              Información del Restaurante
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-600/20 text-orange-500 rounded-2xl border border-orange-500/30 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-zinc-500">Dirección Principal</div>
                  <div className="text-sm font-semibold text-white leading-snug mt-1">
                    {RESTAURANT_INFO.address}
                  </div>
                  <div className="text-xs text-orange-400 font-bold mt-1">
                    {RESTAURANT_INFO.city}, {RESTAURANT_INFO.country}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-600/20 text-orange-500 rounded-2xl border border-orange-500/30 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-zinc-500">Teléfono & Domicilio</div>
                  {RESTAURANT_INFO.phone && (
                    <div className="text-base font-black text-white mt-1">
                      {RESTAURANT_INFO.phone}
                    </div>
                  )}
                  <div className="text-xs text-emerald-400 font-bold mt-0.5">
                    WhatsApp: {RESTAURANT_INFO.whatsapp}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-600/20 text-orange-500 rounded-2xl border border-orange-500/30 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-zinc-500">Horarios de Atención</div>
                  <div className="text-xs text-zinc-300 font-medium mt-1">
                    {RESTAURANT_INFO.hoursWeekdays}
                  </div>
                  {RESTAURANT_INFO.hoursWeekends && (
                    <div className="text-xs text-zinc-300 font-medium mt-0.5">
                      {RESTAURANT_INFO.hoursWeekends}
                    </div>
                  )}
                </div>
              </div>

              {RESTAURANT_INFO.email && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-600/20 text-orange-500 rounded-2xl border border-orange-500/30 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-zinc-500">Correo Electrónico</div>
                    <div className="text-xs font-semibold text-zinc-300 mt-1">
                      {RESTAURANT_INFO.email}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Social Buttons */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase">Síguenos en Redes</span>
              <div className="flex gap-2">
                <a
                  href={RESTAURANT_INFO.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl bg-zinc-800 hover:bg-blue-600 hover:text-white text-zinc-300 flex items-center justify-center border border-zinc-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl bg-zinc-800 hover:bg-pink-600 hover:text-white text-zinc-300 flex items-center justify-center border border-zinc-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Simulation */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-orange-500 tracking-wider flex items-center gap-1.5">
                <Navigation className="w-4 h-4" /> Ubicación GPS
              </span>
              <a
                href="https://maps.app.goo.gl/Chc6dW1ACAJmYeU47"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-zinc-400 hover:text-white underline font-bold"
              >
                Abrir en Google Maps
              </a>
            </div>

           <div className="relative h-64 sm:h-80 w-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center text-center p-4">
  {/* Mapa interactivo de fondo */}
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4867.880744739416!2d-88.44303342407231!3d13.339524406703514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7b3832b510a249%3A0x57bd33254f943a26!2sPanes%20con%20Gallina%20Benitez!5e1!3m2!1ses!2ssv!4v1784908987517!5m2!1ses!2ssv" 
    className="absolute inset-0 w-full h-full border-0" 
    allowFullScreen
    loading="lazy" 
    referrerPolicy="strict-origin-when-cross-origin"
  />

  {/* Tarjeta flotante con la animación MapPin */}
  <div className="z-10 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-orange-500/40 pointer-events-none">
    <MapPin className="w-6 h-6 text-orange-500 mx-auto mb-1 animate-bounce" />
  </div>
</div>
            </div>
          </div>

        {/* Contact Form & WhatsApp Generator (col-span-7) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl space-y-6">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Envíanos un Mensaje
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Completa el formulario para eventos especiales, reservaciones de mesas grupales o dudas de nuestro servicio.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-black text-white uppercase">¡Mensaje Recibido!</h3>
              <p className="text-xs text-zinc-300">
                Gracias por escribir a Panes con Gallina Benítez. Nuestro equipo te responderá en breve a tu teléfono o correo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 7777-8888"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Asunto</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Consulta General">Consulta General</option>
                    <option value="Pedido Especial / Evento">Pedido Especial / Evento</option>
                    <option value="Reservación de Mesa">Reservación de Mesa</option>
                    <option value="Sugerencia o Comentario">Sugerencia o Comentario</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Mensaje *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Escribe aquí tu consulta o detalles de tu evento..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-orange-600 hover:bg-orange-500 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Formulario</span>
                </button>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Enviar por WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
