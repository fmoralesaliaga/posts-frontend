import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const PostsPageSimple = () => {
  console.log('🔍 PostsPageSimple rendering...');
  
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  
  console.log('📊 Posts state:', { posts: posts.length, loading, error });
  
  // NO hacer fetch de posts automáticamente para evitar errores de API
  
  return (
    <div style={{ padding: '20px', border: '1px solid blue' }}>
      <h2 style={{ color: 'blue' }}>Posts Page Simple Test</h2>
      <p>Posts count: {posts.length}</p>
      <p>Loading: {loading ? 'Yes' : 'No'}</p>
      <p>Error: {error || 'None'}</p>
      <button 
        onClick={() => console.log('Button clicked')}
        style={{ padding: '10px', backgroundColor: 'lightblue' }}
      >
        Test Button
      </button>
    </div>
  );
};

export default PostsPageSimple;
