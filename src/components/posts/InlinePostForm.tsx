import React from 'react';
import type { PostCreateDto } from '../../types/post';
import { useForm } from '../../hooks/useForm';

interface InlinePostFormProps {
  loading?: boolean;
  onSubmit: (data: PostCreateDto) => void;
}

const InlinePostForm: React.FC<InlinePostFormProps> = ({ 
  loading = false, 
  onSubmit 
}) => {
  // Reglas de validación
  const validationRules = {
    name: (value: string) => !value.trim() ? 'Name is required' : null,
    description: (value: string) => !value.trim() ? 'Description is required' : null,
  };

  // Usar el hook personalizado de formulario
  const { 
    formData, 
    errors, 
    handleChange, 
    handleBlur,
    validateForm, 
    resetForm
  } = useForm<PostCreateDto>(
    { name: '', description: '' },
    validationRules
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      resetForm();
    }
  };
  return (
    <div className="mt-4 bg-white shadow-md rounded-lg p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-end gap-4">
          {/* Name */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter post name"
              disabled={loading}
              autoComplete="off"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Descripción */}
          <div className="flex-[2] min-w-[300px]">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter post description"
              disabled={loading}
              autoComplete="off"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>          {/* Botón Crear */}
          <div className="flex-none self-end">
            <button
              type="submit"
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating...
                </div>
              ) : 'Create Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InlinePostForm;
