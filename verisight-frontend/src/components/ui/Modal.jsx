import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, footer, size = 'medium' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    small: '400px',
    medium: '600px',
    large: '800px',
    xlarge: '1000px',
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-out',
  };

  const modalStyles = {
    background: '#0A1E3F',
    border: '1px solid rgba(53, 226, 255, 0.5)',
    borderRadius: '12px',
    width: '90%',
    maxWidth: sizes[size],
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideUp 0.3s ease-out',
    boxShadow: '0 8px 32px rgba(53, 226, 255, 0.2)',
  };

  const headerStyles = {
    padding: '24px',
    borderBottom: '1px solid rgba(53, 226, 255, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyles = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#FFFFFF',
  };

  const closeButtonStyles = {
    background: 'transparent',
    border: 'none',
    color: '#D8DDE3',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '4px 8px',
    transition: 'color 0.3s ease',
  };

  const bodyStyles = {
    padding: '24px',
    overflowY: 'auto',
    flex: 1,
  };

  const footerStyles = {
    padding: '24px',
    borderTop: '1px solid rgba(53, 226, 255, 0.3)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  };

  return (
    <>
      <div style={overlayStyles} onClick={onClose}>
        <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
          <div style={headerStyles}>
            <h2 style={titleStyles}>{title}</h2>
            <button
              style={closeButtonStyles}
              onClick={onClose}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#35E2FF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#D8DDE3')}
            >
              ×
            </button>
          </div>
          <div style={bodyStyles}>{children}</div>
          {footer && <div style={footerStyles}>{footer}</div>}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Modal;
