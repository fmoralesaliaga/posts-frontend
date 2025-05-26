import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Post, PostCreateDto } from '../../types/post';
import { PostService } from '../../services/post.service';

interface PostsState {
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: string | null;
  nameFilter: string;
  recentlyCreatedIds: number[]; // IDs de posts recién creados para destacar
}

const initialState: PostsState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  nameFilter: '',
  recentlyCreatedIds: [],
};

// Thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (name: string | undefined = undefined, { rejectWithValue }) => {
    try {
      console.log('🔍 API CALL: Fetching posts from server...', { timestamp: new Date().toLocaleTimeString() });
      return await PostService.getAll(name);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await PostService.getById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/create',
  async (post: PostCreateDto, { rejectWithValue }) => {
    try {
      const result = await PostService.create(post);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, post }: { id: number; post: PostCreateDto }, { rejectWithValue }) => {
    try {
      const result = await PostService.update(id, post);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await PostService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload;
    },
    clearPostError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.post = null;
    },
    removeFromRecentlyCreated: (state, action: PayloadAction<number>) => {
      state.recentlyCreatedIds = state.recentlyCreatedIds.filter(id => id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch post by id
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
        // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        console.log('✅ Post created successfully - adding to first position without API refetch', action.payload);
        // Agregar al principio de la lista (primera posición)
        state.posts.unshift(action.payload);
        // Agregar a la lista de recién creados para destacar
        state.recentlyCreatedIds.push(action.payload.id);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        console.log('✅ Post updated successfully - updating local list without API refetch', action.payload);
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        console.log('✅ Post deleted successfully - removing from local list without API refetch', { deletedId: action.payload });
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setNameFilter, clearPostError, clearCurrentPost, removeFromRecentlyCreated } = postsSlice.actions;
const postsReducer = postsSlice.reducer;
export default postsReducer;
