import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PostService } from '../post.service';
import api from '../api';

// Mock the API module
vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

describe('PostService', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
  });

  it('should fetch all posts', async () => {
    // Arrange
    const mockPosts = [
      { id: 1, name: 'Test Post 1', description: 'Test Description 1', createdAt: '2023-01-01T00:00:00Z' },
      { id: 2, name: 'Test Post 2', description: 'Test Description 2', createdAt: '2023-01-02T00:00:00Z' }
    ];
    
    (api.get as any).mockResolvedValueOnce({ data: mockPosts });
    
    // Act
    const result = await PostService.getAll();
    
    // Assert
    expect(result).toEqual(mockPosts);
    expect(api.get).toHaveBeenCalledWith('/posts', { params: {} });
  });

  it('should fetch posts with name filter', async () => {
    // Arrange
    const mockPosts = [
      { id: 1, name: 'Test Post 1', description: 'Test Description 1', createdAt: '2023-01-01T00:00:00Z' }
    ];
    
    (api.get as any).mockResolvedValueOnce({ data: mockPosts });
    
    // Act
    const result = await PostService.getAll('Test Post 1');
    
    // Assert
    expect(result).toEqual(mockPosts);
    expect(api.get).toHaveBeenCalledWith('/posts', { params: { name: 'Test Post 1' } });
  });

  it('should fetch a post by id', async () => {
    // Arrange
    const mockPost = {
      id: 1, name: 'Test Post 1', description: 'Test Description 1', createdAt: '2023-01-01T00:00:00Z'
    };
    
    (api.get as any).mockResolvedValueOnce({ data: mockPost });
    
    // Act
    const result = await PostService.getById(1);
    
    // Assert
    expect(result).toEqual(mockPost);
    expect(api.get).toHaveBeenCalledWith('/posts/1');
  });

  it('should create a post', async () => {
    // Arrange
    const newPost = { name: 'New Post', description: 'New Description' };
    const mockCreatedPost = { 
      id: 3, 
      name: 'New Post', 
      description: 'New Description', 
      createdAt: '2023-01-03T00:00:00Z' 
    };
    
    (api.post as any).mockResolvedValueOnce({ data: mockCreatedPost });
    
    // Act
    const result = await PostService.create(newPost);
    
    // Assert
    expect(result).toEqual(mockCreatedPost);
    expect(api.post).toHaveBeenCalledWith('/posts', newPost);
  });

  it('should update a post', async () => {
    // Arrange
    const updatedPost = { name: 'Updated Post', description: 'Updated Description' };
    const mockUpdatedPost = { 
      id: 1, 
      name: 'Updated Post', 
      description: 'Updated Description', 
      createdAt: '2023-01-01T00:00:00Z' 
    };
    
    (api.put as any).mockResolvedValueOnce({ data: mockUpdatedPost });
    
    // Act
    const result = await PostService.update(1, updatedPost);
    
    // Assert
    expect(result).toEqual(mockUpdatedPost);
    expect(api.put).toHaveBeenCalledWith('/posts/1', updatedPost);
  });

  it('should delete a post', async () => {
    // Arrange
    (api.delete as any).mockResolvedValueOnce({ status: 200 });
    
    // Act
    await PostService.delete(1);
    
    // Assert
    expect(api.delete).toHaveBeenCalledWith('/posts/1');
  });
});
