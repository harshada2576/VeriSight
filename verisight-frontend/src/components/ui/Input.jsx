const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  prefix,
  suffix,
  style = {},
  rows = 4,
  ...props
}) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  };

  const labelStyles = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#D8DDE3',
  };

  const inputWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#0C0C0C',
    border: `1px solid ${error ? '#FF4444' : 'rgba(53, 226, 255, 0.3)'}`,
    borderRadius: '8px',
    padding: type === 'textarea' ? '0' : '12px 16px',
    transition: 'all 0.3s ease',
    ...style,
  };

  const inputStyles = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#FFFFFF',
    fontSize: '16px',
    fontFamily: 'inherit',
    ...(type === 'textarea' ? { padding: '12px 16px', resize: 'vertical', minHeight: `${rows * 24}px` } : {}),
  };

  const errorStyles = {
    fontSize: '14px',
    color: '#FF4444',
  };

  const handleFocus = (e) => {
    const wrapper = e.currentTarget.parentElement;
    if (!error) {
      wrapper.style.borderColor = '#35E2FF';
      wrapper.style.boxShadow = '0 0 0 3px rgba(53, 226, 255, 0.1)';
    }
  };

  const handleBlur = (e) => {
    const wrapper = e.currentTarget.parentElement;
    wrapper.style.borderColor = error ? '#FF4444' : 'rgba(53, 226, 255, 0.3)';
    wrapper.style.boxShadow = 'none';
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: '#FF4444' }}>*</span>}
        </label>
      )}
      <div style={inputWrapperStyles}>
        {prefix && <span style={{ color: '#D8DDE3' }}>{prefix}</span>}
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            style={inputStyles}
            rows={rows}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            style={inputStyles}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        )}
        {suffix && <span style={{ color: '#D8DDE3' }}>{suffix}</span>}
      </div>
      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
};

export default Input;
