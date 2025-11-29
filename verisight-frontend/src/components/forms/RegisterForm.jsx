import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
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
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
      await onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <Input
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
        error={errors.name}
        disabled={isLoading}
        prefix={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="2"/>
            <circle cx="12" cy="7" r="4" strokeWidth="2"/>
          </svg>
        }
      />

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

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.confirmPassword}
        disabled={isLoading}
        prefix={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2"/>
          </svg>
        }
      />

      <div>
        <label style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
          cursor: 'pointer',
          userSelect: 'none',
        }}>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            disabled={isLoading}
            style={{
              width: '18px',
              height: '18px',
              marginTop: '2px',
              cursor: 'pointer',
              accentColor: '#2A6BFF',
            }}
          />
          <span style={{
            color: '#D8DDE3',
            fontSize: '14px',
            lineHeight: '1.5',
          }}>
            I accept the{' '}
            <a
              href="/terms"
              style={{
                color: '#35E2FF',
                textDecoration: 'none',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2A6BFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#35E2FF'}
            >
              Terms of Service
            </a>
            {' '}and{' '}
            <a
              href="/privacy"
              style={{
                color: '#35E2FF',
                textDecoration: 'none',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2A6BFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#35E2FF'}
            >
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.acceptTerms && (
          <p style={{
            color: '#FF4444',
            fontSize: '12px',
            marginTop: '4px',
            marginLeft: '26px',
          }}>
            {errors.acceptTerms}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        style={{ width: '100%', marginTop: '8px' }}
      >
        Create Account
      </Button>

      <div style={{
        textAlign: 'center',
        color: '#D8DDE3',
        fontSize: '14px',
      }}>
        Already have an account?{' '}
        <a
          href="/login"
          style={{
            color: '#35E2FF',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#2A6BFF'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#35E2FF'}
        >
          Sign in
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
