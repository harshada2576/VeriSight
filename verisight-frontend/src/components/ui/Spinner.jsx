const Spinner = ({ size = 'medium', color = '#35E2FF', style = {} }) => {
  const sizes = {
    small: '16px',
    medium: '24px',
    large: '48px',
  };

  const spinnerStyles = {
    width: sizes[size],
    height: sizes[size],
    border: `3px solid rgba(42, 107, 255, 0.2)`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    ...style,
  };

  return (
    <>
      <div style={spinnerStyles} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Spinner;
