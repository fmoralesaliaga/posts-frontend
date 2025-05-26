import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchPosts, createPost, deletePost, setNameFilter } from '../../features/posts/postsSlice';
import PostsDataTable from '../../components/posts/PostsDataTable';
import PostFilter from '../../components/posts/PostFilter';
import InlinePostForm from '../../components/posts/InlinePostForm';

const PostsPageDebug = () => {
  console.log('🔍 PostsPageDebug rendering...');
  const [testStep, setTestStep] = useState(1);
  
  try {
    const dispatch = useAppDispatch();
    const { posts, loading, error, nameFilter, recentlyCreatedIds } = useAppSelector((state) => state.posts);
    console.log('📊 Redux state loaded:', { postsCount: posts.length, loading, error, nameFilter });
    
    // Test API call when step 2 is reached
    useEffect(() => {
      if (testStep === 2) {
        console.log('🌐 Testing API call...');
        dispatch(fetchPosts()).catch((error) => {
          console.error('❌ API call failed:', error);
        });
      }
    }, [dispatch, testStep]);

    // Handlers para Step 6
    const handleFilterChange = (value: string) => {
      console.log('🔍 Filter changed:', value);
      dispatch(setNameFilter(value));
    };

    const handleCreatePost = async (data: { name: string; description: string }) => {
      console.log('➕ Creating post:', data);
      try {
        await dispatch(createPost(data)).unwrap();
        console.log('✅ Post created successfully');
      } catch (error) {
        console.error('❌ Failed to create post:', error);
      }
    };

    const handleDeletePost = async (id: number) => {
      console.log('🗑️ Deleting post:', id);
      try {
        await dispatch(deletePost(id)).unwrap();
        console.log('✅ Post deleted successfully');
      } catch (error) {
        console.error('❌ Failed to delete post:', error);
      }
    };

    // Filtrar posts basado en nameFilter
    const filteredPosts = posts.filter(post => 
      post.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
    
    return (
      <div style={{ padding: '20px', border: '2px solid blue' }}>
        <h1 style={{ color: 'blue' }}>🔧 PostsPage Debug Version - Step {testStep}</h1>
        <p>✅ Component rendered successfully</p>
        <p>✅ Redux connection working</p>
        <p>Posts count: {posts.length}</p>
        <p>Filtered posts: {filteredPosts.length}</p>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
        <p>Name Filter: "{nameFilter || 'None'}"</p>
        <p>Recently Created: {recentlyCreatedIds.length}</p>
        
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'lightblue' }}>
          <h3>Test Steps:</h3>
          <button 
            onClick={() => setTestStep(2)}
            style={{ margin: '5px', padding: '10px', backgroundColor: testStep >= 2 ? 'green' : 'lightgray' }}
            disabled={testStep >= 2}
          >
            Step 2: Test API Call
          </button>
          <button 
            onClick={() => setTestStep(3)}
            style={{ margin: '5px', padding: '10px', backgroundColor: testStep >= 3 ? 'green' : 'lightgray' }}
            disabled={testStep < 2}
          >
            Step 3: Test PostsDataTable ✅
          </button>
          <button 
            onClick={() => setTestStep(4)}
            style={{ margin: '5px', padding: '10px', backgroundColor: testStep >= 4 ? 'green' : 'lightgray' }}
            disabled={testStep < 3}
          >
            Step 4: Test PostFilter ✅
          </button>
          <button 
            onClick={() => setTestStep(5)}
            style={{ margin: '5px', padding: '10px', backgroundColor: testStep >= 5 ? 'green' : 'lightgray' }}
            disabled={testStep < 4}
          >
            Step 5: Test InlinePostForm ✅
          </button>
          <button 
            onClick={() => setTestStep(6)}
            style={{ margin: '5px', padding: '10px', backgroundColor: testStep >= 6 ? 'green' : 'lightgray' }}
            disabled={testStep < 5}
          >
            Step 6: Full PostsPage Logic
          </button>
          <button 
            onClick={() => setTestStep(7)}
            style={{ margin: '5px', padding: '10px', backgroundColor: testStep >= 7 ? 'green' : 'lightgray' }}
            disabled={testStep < 6}
          >
            Step 7: Replace Original PostsPage
          </button>
        </div>
        
        {testStep >= 2 && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'lightyellow' }}>
            <p>📡 API test {testStep === 2 ? 'active' : 'complete'}</p>
          </div>
        )}
        
        {testStep >= 3 && testStep < 6 && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'lightgreen', border: '2px solid green' }}>
            <h3>✅ PostsDataTable Working:</h3>
            <PostsDataTable 
              posts={posts}
              loading={loading}
              onDeletePost={(id) => console.log('Delete post clicked:', id)}
              recentlyCreatedIds={recentlyCreatedIds}
            />
          </div>
        )}
        
        {testStep >= 4 && testStep < 6 && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'lightcyan', border: '2px solid cyan' }}>
            <h3>🧪 Testing PostFilter:</h3>
            <PostFilter 
              value={nameFilter}
              onChange={(value) => console.log('Filter changed:', value)}
            />
          </div>
        )}
        
        {testStep >= 5 && testStep < 6 && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'lavender', border: '2px solid purple' }}>
            <h3>🧪 Testing InlinePostForm:</h3>
            <InlinePostForm 
              onSubmit={(data) => console.log('Form submitted:', data)}
            />
          </div>
        )}
        
        {testStep >= 6 && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: 'mistyrose', border: '2px solid red' }}>
            <h3>🧪 Full PostsPage Logic Integrated:</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <h4>🔍 Filter Posts:</h4>
              <PostFilter 
                value={nameFilter}
                onChange={handleFilterChange}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4>➕ Create New Post:</h4>
              <InlinePostForm 
                onSubmit={handleCreatePost}
              />
            </div>
            
            <div>
              <h4>📋 Posts Table (Filtered: {filteredPosts.length} of {posts.length}):</h4>
              <PostsDataTable 
                posts={filteredPosts}
                loading={loading}
                onDeletePost={handleDeletePost}
                recentlyCreatedIds={recentlyCreatedIds}
              />
            </div>
          </div>
        )}

        {testStep >= 7 && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'lightgreen', border: '3px solid green' }}>
            <h2>🎉 Success! All components working!</h2>
            <p><strong>Next steps:</strong></p>
            <ol>
              <li>Replace the original PostsPage with this working version</li>
              <li>Test in Docker with the working configuration</li>
              <li>Apply proper styling with Tailwind CSS</li>
            </ol>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('❌ Error in PostsPageDebug:', error);
    return (
      <div style={{ padding: '20px', backgroundColor: 'red', color: 'white' }}>
        <h1>❌ PostsPageDebug Error</h1>
        <p>Error: {String(error)}</p>
      </div>
    );
  }
};

export default PostsPageDebug;
