import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Componente de prueba muy simple
function TestApp() {
  console.log('🚀 TestApp is rendering');
  return (
    <div style={{ padding: '20px', backgroundColor: 'red', color: 'white' }}>
      <h1>EMERGENCY TEST - React is working!</h1>
      <p>If you see this, React can render</p>
    </div>
  );
}

console.log('🔧 main.tsx is executing');
console.log('🔧 Looking for root element...');

const rootElement = document.getElementById('root');
console.log('🔧 Root element found:', rootElement);

if (rootElement) {
  console.log('🔧 Creating React root...');
  const root = createRoot(rootElement);
  console.log('🔧 Rendering TestApp...');
  root.render(
    <StrictMode>
      <TestApp />
    </StrictMode>
  );
  console.log('🔧 Render complete');
} else {
  console.error('❌ Root element not found!');
}
