import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import PostsPage from './features/posts/PostsPage';
import HighlightTestPage from './pages/HighlightTestPage';
import ModalTransparencyTest from './components/ui/ModalTransparencyTest';
import ErrorBoundary from './components/ErrorBoundary';
import type { ReactElement, ErrorInfo } from 'react';
import './App.css';
import './styles/accessibility.css';

/**
 * Main application component
 * Provides Redux store and handles routing
 * 
 * @returns The rendered application
 */
function App(): ReactElement {
  // Simple hash-based routing
  const currentRoute = window.location.hash || '#posts';
  
  // Page title management for accessibility
  document.title = getPageTitle(currentRoute);
  
  // Error handler function
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // You could send to an error tracking service like Sentry
    console.error('Application error:', error, errorInfo);
  };
  
  return (
    <ErrorBoundary onError={handleError}>
      <Provider store={store}>
        <div className="app" role="application">
          <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
            Skip to main content
          </a>
          <MainLayout>
            <main id="main-content" tabIndex={-1}>
              {renderCurrentPage(currentRoute)}
            </main>
          </MainLayout>
        </div>
      </Provider>
    </ErrorBoundary>
  );
}

/**
 * Determines which page to render based on the current route
 * 
 * @param route - The current route hash
 * @returns The component to render
 */
function renderCurrentPage(route: string): ReactElement {
  switch (route) {
    case '#highlight-demo':
      return <HighlightTestPage />;
    case '#modal-test':
      return <ModalTransparencyTest />;
    default:
      return <PostsPage />;
  }
}

/**
 * Gets the appropriate page title for the current route
 * 
 * @param {string} route - The current route hash
 * @returns {string} The page title
 */
function getPageTitle(route: string): string {
  const appName = import.meta.env.VITE_APP_TITLE || 'Posts Manager';
  
  switch (route) {
    case '#highlight-demo':
      return `Highlight Demo | ${appName}`;
    case '#modal-test':
      return `Modal Test | ${appName}`;
    default:
      return `Posts | ${appName}`;
  }
}

export default App
