import React from 'react';
import type { Post } from '../../types/post';

interface PostItemProps {
  post: Post;
  onDelete: (id: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete }) => {
  const dateFormatted = new Date(post.createdAt).toLocaleDateString();
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 transition-shadow hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{post.name}</h3>
          <p className="text-gray-600 mt-1 whitespace-pre-line">{post.description}</p>
          <p className="text-xs text-gray-500 mt-2">Created: {dateFormatted}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onDelete(post.id)} 
            className="text-red-600 hover:text-red-800 transition-colors"
            aria-label="Delete post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
