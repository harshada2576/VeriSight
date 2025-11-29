const Card = ({ children, style = {}, onClick, ...props }) => {
  const cardStyles = {
    background: '#0A1E3F',
    border: '1px solid rgba(53, 226, 255, 0.3)',
    borderRadius: '12px',
    padding: '24px',
    transition: 'all 0.3s ease',
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (onClick) {
      e.currentTarget.style.borderColor = 'rgba(53, 226, 255, 0.6)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(53, 226, 255, 0.2)';
    }
  };

  const handleMouseLeave = (e) => {
    if (onClick) {
      e.currentTarget.style.borderColor = 'rgba(53, 226, 255, 0.3)';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  return (
    <div
      style={cardStyles}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
