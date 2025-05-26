import api from './api';
import type { Post, PostCreateDto } from '../types/post';

export const PostService = {
  /**
   * Obtiene todos los posts, con opción de filtrado por nombre
   * @param name - Filtro opcional por nombre
   * @returns Promise con array de posts
   */  
  async getAll(name?: string): Promise<Post[]> {
    const params = name ? { name } : {};
    const response = await api.get('/posts', { params });
    return response.data;
  },

  /**
   * Obtiene un post por su ID
   * @param id - ID del post
   * @returns Promise con el post
   */
  async getById(id: number): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  /**
   * Crea un nuevo post
   * @param post - Datos del nuevo post
   * @returns Promise con el post creado
   */
  async create(post: PostCreateDto): Promise<Post> {
    const response = await api.post('/posts', post);
    return response.data;
  },

  /**
   * Actualiza un post existente
   * @param id - ID del post
   * @param post - Nuevos datos del post
   * @returns Promise con el post actualizado
   */
  async update(id: number, post: PostCreateDto): Promise<Post> {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
  },

  /**
   * Elimina un post
   * @param id - ID del post a eliminar
   * @returns Promise<void>
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/posts/${id}`);
  },
};
