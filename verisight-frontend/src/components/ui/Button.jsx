import Spinner from './Spinner';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '8px',
      border: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      opacity: disabled || loading ? 0.6 : 1,
      ...style,
    };

    const variants = {
      primary: {
        background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
        color: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(42, 107, 255, 0.3)',
      },
      secondary: {
        background: 'transparent',
        color: '#35E2FF',
        border: '1px solid #35E2FF',
      },
      ghost: {
        background: 'transparent',
        color: '#D8DDE3',
        border: 'none',
      },
      danger: {
        background: 'linear-gradient(135deg, #FF4444 0%, #FF6B6B 100%)',
        color: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(255, 68, 68, 0.3)',
      },
    };

    return { ...baseStyles, ...variants[variant] };
  };

  const handleMouseEnter = (e) => {
    if (disabled || loading) return;
    
    if (variant === 'primary') {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(42, 107, 255, 0.4)';
    } else if (variant === 'secondary') {
      e.currentTarget.style.background = 'rgba(53, 226, 255, 0.1)';
    } else if (variant === 'ghost') {
      e.currentTarget.style.background = 'rgba(216, 221, 227, 0.1)';
    } else if (variant === 'danger') {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 68, 68, 0.4)';
    }
  };

  const handleMouseLeave = (e) => {
    if (disabled || loading) return;
    
    e.currentTarget.style.transform = 'translateY(0)';
    if (variant === 'primary') {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(42, 107, 255, 0.3)';
    } else if (variant === 'secondary' || variant === 'ghost') {
      e.currentTarget.style.background = 'transparent';
    } else if (variant === 'danger') {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 68, 68, 0.3)';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={getVariantStyles()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading && <Spinner size="small" />}
      {children}
    </button>
  );
};

export default Button;
