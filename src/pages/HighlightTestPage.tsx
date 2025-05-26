import React, { useState } from 'react';
import HighlightDemo from '../components/ui/HighlightDemo';

const HighlightTestPage: React.FC = () => {  const [selectedStyle, setSelectedStyle] = useState<{
    className: string;
    tailwindClasses?: string;
  }>({
    className: 'highlight-shimmer-black',
    tailwindClasses: ''
  });

  const handleStyleSelect = (className: string, tailwindClasses?: string) => {
    setSelectedStyle({ className, tailwindClasses });
    console.log('Estilo seleccionado:', { className, tailwindClasses });
  };

  const applyToDataTable = () => {
    alert(`Para aplicar este estilo:
    
1. ${selectedStyle.className ? `Clase CSS: ${selectedStyle.className}` : ''}
2. ${selectedStyle.tailwindClasses ? `Clases Tailwind: ${selectedStyle.tailwindClasses}` : ''}

¡Ve a la consola para copiar el código!`);
    
    console.log(`
// Para aplicar en DataTable.tsx, reemplaza en la línea ~276:
className={\`\${isHighlighted 
  ? '${selectedStyle.tailwindClasses || selectedStyle.className}' 
  : 'hover:bg-gray-50'
}\`}
    `);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎨 Galería de Estilos de Resaltado
          </h1>
          <p className="text-gray-600">
            Elige el estilo más elegante para destacar elementos recién creados
          </p>
        </div>

        <HighlightDemo onSelect={handleStyleSelect} />

        <div className="mt-8 text-center">          <button
            onClick={applyToDataTable}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Aplicar Estilo Seleccionado
          </button>
          
          <a
            href="/#modal-test"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium ml-4"
          >
            🔍 Probar Transparencia de Modales
          </a>
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-green-800 text-sm">
              ✅ <strong>Glassmorphism aplicado</strong> - Los modales ahora usan efecto cristal transparente
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-3">Vista Previa del Estilo Actual:</h3>
          <div className="border rounded">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Título
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contenido
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">1</td>
                  <td className="px-4 py-3 text-sm">Post Antiguo</td>
                  <td className="px-4 py-3 text-sm">Este es un post normal</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Normal</span>
                  </td>
                </tr>
                <tr 
                  className={`${
                    selectedStyle.className || selectedStyle.tailwindClasses || ''
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-medium">2</td>
                  <td className="px-4 py-3 text-sm font-medium">✨ Post Recién Creado</td>
                  <td className="px-4 py-3 text-sm">Este post acaba de ser creado</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Nuevo</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">3</td>
                  <td className="px-4 py-3 text-sm">Otro Post</td>
                  <td className="px-4 py-3 text-sm">Contenido adicional</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Normal</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightTestPage;
