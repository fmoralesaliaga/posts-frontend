import React, { useEffect } from 'react';
import './modal-overlay.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  // Manejar el escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Clases para diferentes tamaños
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md';
      case 'md':
        return 'max-w-lg';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      default:
        return 'max-w-lg';
    }
  };

  if (!isOpen) return null;  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      style={{ pointerEvents: 'all' }}
    >
      {/* Overlay */}
      <div 
        className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0"
      >        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity z-40 modal-overlay-glass"
          aria-hidden="true"
          onClick={() => { if (closeOnOverlayClick) onClose(); }}
        />{/* Centering hack */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>        {/* Modal content */}        <div 
          className={`
             relative inline-block align-bottom z-50 modal-content-glass rounded-lg text-left overflow-hidden transform transition-all 
             sm:my-8 sm:align-middle sm:w-full ${getSizeClasses()}
           `}
           onClick={(e) => e.stopPropagation()}
         >{/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 
                className="text-lg leading-6 font-medium text-gray-900" 
                id="modal-title"
              >
                {title}
              </h3>
              {showCloseButton && (
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <svg 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Content */}
            <div className="pointer-events-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
