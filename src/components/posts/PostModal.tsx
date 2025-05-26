import React, { useEffect } from 'react';
import Modal from '../ui/Modal';
import type { Post, PostCreateDto } from '../../types/post';
import { useForm } from '../../hooks/useForm';

interface PostModalProps {
  isOpen: boolean;
  post?: Post | null;
  loading?: boolean;
  onSubmit: (data: PostCreateDto) => void;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  post = null,
  loading = false,
  onSubmit,
  onClose,
}) => {
  // Reglas de validación
  const validationRules = {
    name: (value: string) => !value.trim() ? 'Title is required' : null,
    description: (value: string) => !value.trim() ? 'Description is required' : null,
  };

  // Usar el hook personalizado de formulario
  const { 
    formData, 
    errors, 
    handleChange, 
    handleBlur,
    validateForm, 
    setValues,
    resetForm 
  } = useForm<PostCreateDto>(
    { name: '', description: '' },
    validationRules
  );

  // Si estamos editando, actualizar los campos con los datos del post
  useEffect(() => {
    if (post) {
      setValues({
        name: post.name,
        description: post.description
      });
    } else {
      resetForm();
    }
  }, [post, setValues, resetForm]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const modalTitle = post ? 'Edit Post' : 'Create New Post';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle}
      size="lg"
      closeOnOverlayClick={!loading}
      closeOnEscape={!loading}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label 
            htmlFor="post-name" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="post-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              ${errors.name ? 'border-red-500' : 'border-gray-300'}
              ${loading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            `}
            placeholder="Enter post title"
            disabled={loading}
            autoComplete="off"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label 
            htmlFor="post-description" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="post-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={6}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical
              ${errors.description ? 'border-red-500' : 'border-gray-300'}
              ${loading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            `}
            placeholder="Enter post description"
            disabled={loading}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>          <button
            type="submit"
            className={`
              px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
              }
            `}
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
                Saving...
              </div>
            ) : (
              post ? 'Update Post' : 'Create Post'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PostModal;
