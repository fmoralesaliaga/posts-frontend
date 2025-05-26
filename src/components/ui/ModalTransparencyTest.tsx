import React, { useState } from 'react';
import '../ui/modal-overlay.css';

const ModalTransparencyTest: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const overlayOptions = [
    { 
      id: 'transparent', 
      name: 'Completamente Transparente', 
      class: 'modal-overlay-transparent',
      description: 'Solo blur, sin color de fondo'
    },
    { 
      id: 'subtle', 
      name: 'Sutil (Actual Modal)', 
      class: 'modal-overlay-subtle',
      description: 'Muy poca opacidad blanca + blur'
    },
    { 
      id: 'light', 
      name: 'Ligero (Actual Delete)', 
      class: 'modal-overlay-light',
      description: 'Poca opacidad negra + blur'
    },
    { 
      id: 'glass', 
      name: 'Glassmorphism', 
      class: 'modal-overlay-glass',
      description: 'Efecto cristal moderno'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🔍 Prueba de Transparencia de Modales
        </h1>
        
        {/* Contenido de fondo para ver la transparencia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Posts Recientes</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                <h4 className="font-medium">✨ Post Destacado</h4>
                <p className="text-sm text-gray-600">Este contenido debe verse detrás del modal</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <h4 className="font-medium">Post Normal</h4>
                <p className="text-sm text-gray-600">Contenido adicional</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Estadísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded p-3">
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm">Posts totales</div>
              </div>
              <div className="bg-white/20 rounded p-3">
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm">Nuevos hoy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones para probar diferentes overlays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overlayOptions.map((option) => (
            <div key={option.id} className="bg-white rounded-lg p-4 shadow border">
              <h4 className="font-semibold text-gray-900 mb-2">{option.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{option.description}</p>
              <button
                onClick={() => setActiveModal(option.id)}
                className="w-full px-3 py-2 bg-gray-900 text-white rounded hover:bg-black transition-colors text-sm"
              >
                Probar Modal
              </button>
            </div>
          ))}
        </div>

        {/* Modales */}
        {overlayOptions.map((option) => (
          activeModal === option.id && (
            <div 
              key={option.id}
              className={`fixed inset-0 flex items-center justify-center z-50 ${option.class}`}
              onClick={() => setActiveModal(null)}
            >
              <div 
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-4">Modal de Prueba</h2>
                <p className="text-gray-600 mb-4">
                  Tipo: <strong>{option.name}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {option.description}
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  ¿Puedes ver el contenido de fondo detrás de este modal? 
                  El objetivo es que se vea transparente pero con un ligero blur.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-black"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ModalTransparencyTest;
