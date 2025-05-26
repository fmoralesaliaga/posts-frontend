import { describe, it, expect, vi, beforeEach } from 'vitest';
import postsReducer, {
  setNameFilter,
  clearPostError,
  clearCurrentPost,
  removeFromRecentlyCreated,
  fetchPosts,
  createPost,
  deletePost,
} from '../postsSlice';
import { configureStore } from '@reduxjs/toolkit';

// Mock the PostService
vi.mock('../../../services/post.service', () => ({
  PostService: {
    getAll: vi.fn().mockResolvedValue([
      { id: 1, name: 'Test Post 1', description: 'Test Description 1', createdAt: '2023-01-01T00:00:00Z' },
      { id: 2, name: 'Test Post 2', description: 'Test Description 2', createdAt: '2023-01-02T00:00:00Z' },
    ]),
    create: vi.fn().mockResolvedValue(
      { id: 3, name: 'New Post', description: 'New Description', createdAt: '2023-01-03T00:00:00Z' }
    ),
    delete: vi.fn().mockResolvedValue({}),
  }
}));

describe('Posts Reducer', () => {
  const initialState = {
    posts: [],
    post: null,
    loading: false,
    error: null,
    nameFilter: '',
    recentlyCreatedIds: [],
  };

  it('should handle initial state', () => {
    expect(postsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setNameFilter', () => {
    const filter = 'test filter';
    const actual = postsReducer(initialState, setNameFilter(filter));
    expect(actual.nameFilter).toEqual(filter);
  });

  it('should handle clearPostError', () => {
    const state = { ...initialState, error: 'Some error' };
    const actual = postsReducer(state, clearPostError());
    expect(actual.error).toBeNull();
  });

  it('should handle clearCurrentPost', () => {
    const state = { 
      ...initialState, 
      post: { id: 1, name: 'Test', description: 'Test', createdAt: '2023-01-01' } 
    };
    const actual = postsReducer(state, clearCurrentPost());
    expect(actual.post).toBeNull();
  });

  it('should handle removeFromRecentlyCreated', () => {
    const state = { ...initialState, recentlyCreatedIds: [1, 2, 3] };
    const actual = postsReducer(state, removeFromRecentlyCreated(2));
    expect(actual.recentlyCreatedIds).toEqual([1, 3]);
  });
});

describe('Posts Async Actions', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: postsReducer,
      },
    });
  });

  it('should fetch posts and update the state', async () => {
    // Act - Dispatch the fetchPosts action
    await store.dispatch(fetchPosts());
    
    // Assert - Check the state
    const state = store.getState().posts;
    expect(state.loading).toBe(false);
    expect(state.posts.length).toBe(2);
    expect(state.posts[0].name).toBe('Test Post 1');
  });

  it('should create a post and update the state', async () => {
    // Arrange
    const newPost = { name: 'New Post', description: 'New Description' };
    
    // Act - Dispatch the createPost action
    await store.dispatch(createPost(newPost));
    
    // Assert - Check the state
    const state = store.getState().posts;
    expect(state.loading).toBe(false);
    expect(state.posts.length).toBe(1); // Added to the empty initial state
    expect(state.posts[0].name).toBe('New Post');
    expect(state.recentlyCreatedIds).toContain(3);
  });

  it('should delete a post and update the state', async () => {
    // Arrange - First create a post
    await store.dispatch(createPost({ name: 'Post to delete', description: 'Will be deleted' }));
    const initialState = store.getState().posts;
    expect(initialState.posts.length).toBe(1);
    
    // Act - Dispatch the deletePost action
    await store.dispatch(deletePost(3));
    
    // Assert - Check the state
    const state = store.getState().posts;
    expect(state.posts.length).toBe(0);
  });
});
