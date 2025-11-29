const Toggle = ({ checked, onChange, label, disabled = false }) => {
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  const switchStyles = {
    position: 'relative',
    width: '48px',
    height: '24px',
    background: checked ? '#2A6BFF' : 'rgba(216, 221, 227, 0.2)',
    borderRadius: '12px',
    transition: 'background 0.3s ease',
    border: `1px solid ${checked ? '#35E2FF' : 'rgba(216, 221, 227, 0.3)'}`,
  };

  const knobStyles = {
    position: 'absolute',
    top: '2px',
    left: checked ? '26px' : '2px',
    width: '18px',
    height: '18px',
    background: '#FFFFFF',
    borderRadius: '50%',
    transition: 'left 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const labelStyles = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#D8DDE3',
  };

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div style={containerStyles} onClick={handleClick}>
      <div style={switchStyles}>
        <div style={knobStyles} />
      </div>
      {label && <span style={labelStyles}>{label}</span>}
    </div>
  );
};

export default Toggle;
