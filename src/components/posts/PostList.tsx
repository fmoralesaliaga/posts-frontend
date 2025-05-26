import type { Post } from '../../types/post';
import PostItem from './PostItem';

interface PostListProps {
  posts: Post[];
  onDeletePost: (id: number) => void;
  loading: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, onDeletePost, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <p className="text-gray-500">No posts found. Create a new one!</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostItem 
          key={post.id} 
          post={post}
          onDelete={onDeletePost} 
        />
      ))}
    </div>
  );
};

export default PostList;
