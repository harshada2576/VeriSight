import { useState } from 'react';

const Tooltip = ({ children, text, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const containerStyles = {
    position: 'relative',
    display: 'inline-block',
  };

  const getTooltipStyles = () => {
    const baseStyles = {
      position: 'absolute',
      background: '#0A1E3F',
      color: '#FFFFFF',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      whiteSpace: 'nowrap',
      zIndex: 1000,
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(53, 226, 255, 0.5)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      pointerEvents: 'none',
    };

    const positions = {
      top: {
        bottom: '100%',
        left: '50%',
        transform: isVisible ? 'translateX(-50%) translateY(-8px)' : 'translateX(-50%) translateY(0)',
        marginBottom: '8px',
      },
      bottom: {
        top: '100%',
        left: '50%',
        transform: isVisible ? 'translateX(-50%) translateY(8px)' : 'translateX(-50%) translateY(0)',
        marginTop: '8px',
      },
      left: {
        right: '100%',
        top: '50%',
        transform: isVisible ? 'translateY(-50%) translateX(-8px)' : 'translateY(-50%) translateX(0)',
        marginRight: '8px',
      },
      right: {
        left: '100%',
        top: '50%',
        transform: isVisible ? 'translateY(-50%) translateX(8px)' : 'translateY(-50%) translateX(0)',
        marginLeft: '8px',
      },
    };

    return { ...baseStyles, ...positions[position] };
  };

  return (
    <div
      style={containerStyles}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div style={getTooltipStyles()}>{text}</div>
    </div>
  );
};

export default Tooltip;
