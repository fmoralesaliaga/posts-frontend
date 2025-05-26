import { configureStore } from '@reduxjs/toolkit';
import type { ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import loggerMiddleware from './middleware/logger';

/**
 * Configure the Redux store with all reducers and middleware
 */
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    // Add additional reducers here as the application grows
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific action types or paths in the state that aren't serializable
        ignoredActions: ['some/action/type'],
        ignoredPaths: ['some.path.to.ignore'],
      },
    }).concat(loggerMiddleware),
  // Enable Redux DevTools integration
  devTools: import.meta.env.MODE !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
