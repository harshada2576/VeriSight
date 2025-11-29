import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Backend integration point
    // The parent component should handle the actual API call
    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={errors.email}
        disabled={isLoading}
        prefix={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
            <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
          </svg>
        }
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.password}
        disabled={isLoading}
        prefix={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2"/>
          </svg>
        }
      />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          userSelect: 'none',
        }}>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            disabled={isLoading}
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              accentColor: '#2A6BFF',
            }}
          />
          <span style={{
            color: '#D8DDE3',
            fontSize: '14px',
          }}>
            Remember me
          </span>
        </label>

        <a
          href="/forgot-password"
          style={{
            color: '#35E2FF',
            fontSize: '14px',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#2A6BFF'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#35E2FF'}
        >
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        style={{ width: '100%', marginTop: '8px' }}
      >
        Sign In
      </Button>

      <div style={{
        textAlign: 'center',
        color: '#D8DDE3',
        fontSize: '14px',
      }}>
        Don't have an account?{' '}
        <a
          href="/register"
          style={{
            color: '#35E2FF',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#2A6BFF'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#35E2FF'}
        >
          Sign up
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
