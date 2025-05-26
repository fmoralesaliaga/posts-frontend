import React from 'react';

const TailwindTest: React.FC = () => {
  return (
    <div className="p-4 bg-red-100 border border-red-300 rounded-lg mb-4">
      <h2 className="text-xl font-bold text-red-800 mb-2">Tailwind CSS Test</h2>
      <p className="text-red-600">
        If you can see this styled correctly with red background and border, Tailwind is working!
      </p>
      <div className="mt-4 space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Primary Button
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          Secondary Button
        </button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="h-12 bg-red-300 rounded"></div>
        <div className="h-12 bg-green-300 rounded"></div>
        <div className="h-12 bg-blue-300 rounded"></div>
      </div>
    </div>
  );
};

export default TailwindTest;
