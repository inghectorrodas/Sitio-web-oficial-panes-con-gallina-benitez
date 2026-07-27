import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, RotateCcw, Check, Sparkles, Trash2, Camera } from 'lucide-react';
import { IMAGE_SLOTS, getStoredImages, saveStoredImages, ImageSlot } from '../utils/imageStore';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({ isOpen, onClose }) => {
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [selectedSlot, setSelectedSlot] = useState<ImageSlot>(IMAGE_SLOTS[0]);
  const [urlInput, setUrlInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCustomImages(getStoredImages());
      setUrlInput('');
      setSuccessMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, slotId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es demasiado grande. El tamaño máximo recomendado es 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        const updated = { ...customImages, [slotId]: result };
        setCustomImages(updated);
        saveStoredImages(updated);
        setSuccessMessage(`¡Imagen actualizada para "${IMAGE_SLOTS.find(s => s.id === slotId)?.name || slotId}"!`);
        setTimeout(() => setSuccessMessage(''), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSave = (slotId: string) => {
    if (!urlInput.trim()) return;
    const updated = { ...customImages, [slotId]: urlInput.trim() };
    setCustomImages(updated);
    saveStoredImages(updated);
    setUrlInput('');
    setSuccessMessage('¡URL de imagen guardada correctamente!');
    setTimeout(() => setSuccessMessage(''), 3500);
  };

  const handleRemoveImage = (slotId: string) => {
    const updated = { ...customImages };
    delete updated[slotId];
    setCustomImages(updated);
    saveStoredImages(updated);
    setSuccessMessage('Imagen restaurada a su diseño original.');
    setTimeout(() => setSuccessMessage(''), 3500);
  };

  const handleResetAll = () => {
    if (window.confirm('¿Estás seguro de restablecer todas las imágenes a sus valores originales?')) {
      setCustomImages({});
      saveStoredImages({});
      setSuccessMessage('Todas las imágenes han sido restablecidas.');
      setTimeout(() => setSuccessMessage(''), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-zinc-950 border border-orange-500/40 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-600/20 border border-orange-500/40 rounded-2xl text-orange-400">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                Gestor de Imágenes y Personalización <Sparkles className="w-4 h-4 text-orange-400" />
              </h2>
              <p className="text-xs text-zinc-400">
                Sube o reemplaza las fotografías que aparecen en el menú, historia, fundadores y redes sociales. Se guardan localmente.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-300 px-6 py-2.5 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left List of Slots */}
          <div className="md:col-span-1 space-y-2 pr-2 border-r border-zinc-800/80">
            <div className="text-xs font-black uppercase text-zinc-500 tracking-wider mb-3">
              Secciones con Imágenes ({IMAGE_SLOTS.length})
            </div>
            {IMAGE_SLOTS.map((slot) => {
              const currentImg = customImages[slot.id] || slot.defaultImage;
              const isCustomized = !!customImages[slot.id];
              const isSelected = selectedSlot.id === slot.id;

              return (
                <button
                  key={slot.id}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setUrlInput('');
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-orange-600/15 border-orange-500 text-white'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 text-zinc-300'
                  }`}
                >
                  <img
                    src={currentImg}
                    alt={slot.name}
                    className="w-12 h-12 rounded-xl object-cover border border-zinc-700 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = slot.defaultImage;
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-black truncate">{slot.name}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{slot.section}</div>
                    {isCustomized && (
                      <span className="inline-block mt-0.5 text-[9px] bg-orange-500/20 text-orange-400 font-bold px-1.5 py-0.2 rounded border border-orange-500/30">
                        Personalizada
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Slot Details & Upload Actions */}
          <div className="md:col-span-2 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                      {selectedSlot.section}
                    </span>
                    <h3 className="text-lg font-black text-white mt-2">{selectedSlot.name}</h3>
                    <p className="text-xs text-zinc-400 mt-1">{selectedSlot.description}</p>
                  </div>
                  {customImages[selectedSlot.id] && (
                    <button
                      onClick={() => handleRemoveImage(selectedSlot.id)}
                      className="text-xs text-red-400 hover:text-red-300 bg-red-950/40 border border-red-500/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                      title="Restaurar imagen original"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Restaurar original</span>
                    </button>
                  )}
                </div>

                {/* Preview Box */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-black flex items-center justify-center group">
                  <img
                    src={customImages[selectedSlot.id] || selectedSlot.defaultImage}
                    alt={selectedSlot.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = selectedSlot.defaultImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-black text-white bg-black/70 px-3 py-1.5 rounded-xl border border-zinc-700">
                      Vista Previa Activa
                    </span>
                  </div>
                </div>
              </div>

              {/* Upload Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option A: File Upload */}
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-black text-white mb-1 flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-orange-400" />
                      <span>Subir desde tu dispositivo</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mb-4">
                      Selecciona una foto (JPG, PNG, WEBP hasta 5MB).
                    </p>
                  </div>
                  <label className="cursor-pointer bg-orange-600 hover:bg-orange-500 text-black font-black text-xs py-2.5 px-4 rounded-xl text-center transition-colors block shadow-md shadow-orange-600/20">
                    <span>Elegir Archivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, selectedSlot.id)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Option B: Image URL */}
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-black text-white mb-1 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-orange-400" />
                      <span>Pegar Enlace Web (URL)</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mb-2">
                      Pega cualquier enlace directo de imagen.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/foto.jpg"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                    <button
                      onClick={() => handleUrlSave(selectedSlot.id)}
                      disabled={!urlInput.trim()}
                      className="w-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white font-black text-xs py-2 px-3 rounded-xl transition-colors"
                    >
                      Guardar URL
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                onClick={handleResetAll}
                className="text-xs font-bold text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer todo a fábrica</span>
              </button>

              <button
                onClick={onClose}
                className="bg-orange-600 hover:bg-orange-500 text-black font-black text-xs px-6 py-2.5 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
              >
                Listo / Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
