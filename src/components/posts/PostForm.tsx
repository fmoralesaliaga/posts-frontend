import { useEffect } from 'react';
import type { Post, PostCreateDto } from '../../types/post';
import { useForm } from '../../hooks/useForm';

interface PostFormProps {
  post?: Post | null;
  loading?: boolean;
  onSubmit: (data: PostCreateDto) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ 
  post = null, 
  loading = false, 
  onSubmit, 
  onCancel 
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
    setValues 
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
    }
  }, [post, setValues]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {post ? 'Edit Post' : 'Create New Post'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Title</label>          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter post title"
            disabled={loading}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={5}
            className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter post description"
            disabled={loading}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
