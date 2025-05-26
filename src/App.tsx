import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './layouts/MainLayout';
import PostsPage from './features/posts/PostsPage';
import HighlightTestPage from './pages/HighlightTestPage';
import ModalTransparencyTest from './components/ui/ModalTransparencyTest';
import './App.css';

function App() {
  // Cambiar entre páginas temporalmente
  const showHighlightDemo = window.location.hash === '#highlight-demo';
  const showModalTest = window.location.hash === '#modal-test';
  
  return (
    <Provider store={store}>
      <MainLayout>
        {showHighlightDemo ? (
          <HighlightTestPage />
        ) : showModalTest ? (
          <ModalTransparencyTest />
        ) : (
          <PostsPage />
        )}
      </MainLayout>
    </Provider>
  )
}

export default App
