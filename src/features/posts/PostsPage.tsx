// filepath: c:\github\Examen TCIT\posts-frontend-vite\src\features\posts\PostsPage.tsx
import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { 
  createPost, 
  deletePost, 
  fetchPosts, 
  setNameFilter,
  removeFromRecentlyCreated
} from '../../features/posts/postsSlice';
import PostsDataTable from '../../components/posts/PostsDataTable';
import PostFilter from '../../components/posts/PostFilter';
import DeleteConfirmationModal from '../../components/posts/DeleteConfirmationModal';
import Notification from '../../components/ui/Notification';
import InlinePostForm from '../../components/posts/InlinePostForm';
import type { Post, PostCreateDto } from '../../types/post';

const PostsPage = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error, nameFilter, recentlyCreatedIds } = useAppSelector((state) => state.posts);
  // Estado local
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [forcePageNumber, setForcePageNumber] = useState<number | undefined>(undefined);
  // Cargar posts solo al montar el componente (carga inicial)
  useEffect(() => {
    if (isInitialLoad) {
      console.log('📄 PostsPage: Loading posts on initial mount...', { timestamp: new Date().toLocaleTimeString() });
      dispatch(fetchPosts());
      setIsInitialLoad(false);
    }
  }, [dispatch, isInitialLoad]);

  // Filtrar posts localmente cuando cambia el filtro
  const filteredPosts = useMemo(() => {
    if (!nameFilter) return posts;
    return posts.filter(post => 
      post.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }, [posts, nameFilter]);
  // Efecto para remover IDs de elementos recién creados después de 3 segundos
  useEffect(() => {
    if (recentlyCreatedIds.length > 0) {
      const timers = recentlyCreatedIds.map(id => 
        setTimeout(() => {
          dispatch(removeFromRecentlyCreated(id));
        }, 3000) // 3 segundos de destacado
      );

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [recentlyCreatedIds, dispatch]);

  // Efecto para limpiar la navegación forzada después de usarla
  useEffect(() => {
    if (forcePageNumber !== undefined) {
      // Limpiar después de un breve tiempo para permitir que el DataTable procese el cambio
      const timer = setTimeout(() => {
        setForcePageNumber(undefined);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [forcePageNumber]);

  // Mostrar notificación si hay un error
  useEffect(() => {
    if (error) {
      setNotification({
        message: error,
        type: 'error'
      });
    }
  }, [error]);  // Manejador para crear un nuevo post
  const handleFormSubmit = async (formData: PostCreateDto) => {
    try {
      console.log('➕ Creating post with optimistic update (no additional API call to fetch posts)');
      await dispatch(createPost(formData)).unwrap();
      // Navegar a la primera página donde aparecerá el nuevo post
      setForcePageNumber(1);
      console.log('📄 Navigating to page 1 to show new post');
      setNotification({
        message: 'Post created successfully',
        type: 'success'
      });
    } catch (err) {
      // Error handling is done via useEffect watching the error state
    }
  };

  // Manejadores de eliminación
  const handleDeleteClick = (id: number) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setPostToDelete(post);
      setDeleteModalOpen(true);
    }
  };
  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        console.log('🗑️ Deleting post with optimistic update (no additional API call to fetch posts)');
        await dispatch(deletePost(postToDelete.id)).unwrap();
        setNotification({
          message: 'Post deleted successfully',
          type: 'success'
        });
      } catch (err) {
        // Error handling is done via useEffect watching the error state
      }
      setDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };  const handleFilterChange = (newFilter: string) => {
    console.log('🔍 Filter changed - using local filtering (no API call)', { filter: newFilter });
    dispatch(setNameFilter(newFilter));
  };

  return (
    <div className="pb-0" style={{ minHeight: 'auto', height: 'auto' }}>
      {/* Título de la página */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
      </div>      {/* Filtro */}
      <PostFilter initialFilter={nameFilter} onFilterChange={handleFilterChange} />      {/* DataTable de posts */}
      <PostsDataTable
        posts={filteredPosts}
        onDeletePost={handleDeleteClick}
        loading={loading}
        recentlyCreatedIds={recentlyCreatedIds}
        forcePageNumber={forcePageNumber}
      />

      {/* Formulario en línea para crear post */}
      <InlinePostForm 
        onSubmit={handleFormSubmit}
        loading={loading}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={postToDelete?.name || ''}
        loading={loading}
      />

      {/* Notificaciones */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default PostsPage;