import React, { useState } from 'react';
import './highlight-styles.css';

interface HighlightOption {
  id: string;
  name: string;
  description: string;
  className: string;
  tailwindClasses?: string;
}

const highlightOptions: HighlightOption[] = [
  {
    id: 'shimmer-black',
    name: 'Shimmer Effect Negro (ACTUAL)',
    description: '✨ Destello elegante con borde negro - Muy sofisticado',
    className: 'highlight-shimmer-black'
  },
  {
    id: 'glow',
    name: 'Glow Effect',
    description: 'Efecto de brillo azul sutil con pulsación',
    className: '',
    tailwindClasses: 'bg-blue-50/30 hover:bg-blue-50/50 transition-all duration-1000 shadow-lg shadow-blue-200/50 ring-1 ring-blue-200/30 animate-pulse'
  },
  {
    id: 'shimmer',
    name: 'Shimmer Effect Azul',
    description: 'Destello que se desliza horizontalmente con borde azul',
    className: 'highlight-shimmer'
  },
  {
    id: 'slide',
    name: 'Slide Highlight',
    description: 'Onda que se desliza de izquierda a derecha',
    className: 'highlight-slide'
  },
  {
    id: 'scale',
    name: 'Subtle Scale',
    description: 'Escala ligeramente con sombra morada',
    className: 'highlight-scale'
  },
  {
    id: 'gradient',
    name: 'Gradient Border',
    description: 'Borde con gradiente rotativo multicolor',
    className: 'highlight-gradient'
  },
  {
    id: 'breathe',
    name: 'Breathe Effect',
    description: 'Respiración suave con color dorado',
    className: 'highlight-breathe'
  }
];

interface HighlightDemoProps {
  onSelect: (className: string, tailwindClasses?: string) => void;
}

const HighlightDemo: React.FC<HighlightDemoProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('shimmer-black');

  const handleSelect = (option: HighlightOption) => {
    setSelectedOption(option.id);
    onSelect(option.className, option.tailwindClasses);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Opciones de Resaltado Elegantes
      </h3>
      
      <div className="grid gap-4">
        {highlightOptions.map((option) => (
          <div key={option.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{option.name}</h4>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              <button
                onClick={() => handleSelect(option)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedOption === option.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedOption === option.id ? 'Seleccionado' : 'Seleccionar'}
              </button>
            </div>
            
            {/* Vista previa */}
            <div className="mt-3">
              <div className="bg-gray-50 rounded border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Título
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Contenido
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2 text-sm">Post Normal</td>
                      <td className="px-4 py-2 text-sm">Contenido regular</td>
                    </tr>
                    <tr 
                      className={`border-b ${
                        option.className || option.tailwindClasses || ''
                      }`}
                    >
                      <td className="px-4 py-2 text-sm font-medium">✨ Post Nuevo</td>
                      <td className="px-4 py-2 text-sm">Este es un post recién creado</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-sm">Post Normal</td>
                      <td className="px-4 py-2 text-sm">Contenido regular</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Recomendación:</strong> El efecto "Glow" es el más sutil y profesional, 
          mientras que "Shimmer" y "Slide" son más llamativos pero elegantes.
        </p>
      </div>
    </div>
  );
};

export default HighlightDemo;
