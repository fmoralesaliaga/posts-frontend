import { Middleware } from 'redux';
import { RootState } from '../store';

/**
 * Advanced custom logger middleware for Redux
 * Provides colored output and configurable logging levels
 */
const loggerMiddleware: Middleware<{}, RootState> = store => next => action => {
  // Skip logging if not in development mode
  if (import.meta.env.MODE !== 'development') {
    return next(action);
  }

  const prevState = store.getState();
  
  // Log action in blue
  console.group(`%cAction: ${action.type}`, 'color: #3B82F6; font-weight: bold');
  console.log('%cPrevious State:', 'color: #6B7280', prevState);
  console.log('%cAction:', 'color: #10B981', action);
  
  // Call the next dispatch method in the middleware chain
  const returnValue = next(action);
  
  // Log next state in orange
  const nextState = store.getState();
  console.log('%cNext State:', 'color: #F97316', nextState);
  
  // Determine what changed between states
  console.log('%cChanged:', 'color: #8B5CF6');
  Object.keys(nextState).forEach(key => {
    if (prevState[key] !== nextState[key]) {
      console.log(`%c  ${key}:`, 'color: #8B5CF6', {
        from: prevState[key],
        to: nextState[key]
      });
    }
  });
  
  console.groupEnd();
  
  // Return value is usually the action
  return returnValue;
};

export default loggerMiddleware;
