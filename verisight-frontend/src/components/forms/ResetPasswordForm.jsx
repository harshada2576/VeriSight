import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ResetPasswordForm = ({ onSubmit, isLoading = false, token }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
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
        password: formData.password,
        token: token, // Token from URL query params
      });
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '24px',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          background: 'rgba(59, 255, 179, 0.1)',
          border: '2px solid rgba(59, 255, 179, 0.3)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'scaleIn 0.5s ease',
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3BFFB3">
            <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 style={{
          color: '#FFFFFF',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '12px',
        }}>
          Password Reset Successfully
        </h3>
        <p style={{
          color: '#D8DDE3',
          fontSize: '16px',
          lineHeight: '1.6',
          marginBottom: '24px',
        }}>
          Your password has been reset. You can now sign in with your new password.
        </p>
        <Button
          variant="primary"
          onClick={() => window.location.href = '/login'}
          style={{ width: '100%' }}
        >
          Go to Login
        </Button>

        <style>{`
          @keyframes scaleIn {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '8px',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          margin: '0 auto 16px',
          background: 'rgba(42, 107, 255, 0.1)',
          border: '2px solid rgba(42, 107, 255, 0.3)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#35E2FF">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/>
          </svg>
        </div>
        <p style={{
          color: '#D8DDE3',
          fontSize: '14px',
          lineHeight: '1.6',
        }}>
          Create a strong password with at least 8 characters, including uppercase, lowercase, and numbers.
        </p>
      </div>

      <Input
        label="New Password"
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

      {formData.password && (
        <div style={{
          padding: '12px',
          background: 'rgba(42, 107, 255, 0.05)',
          border: '1px solid rgba(42, 107, 255, 0.2)',
          borderRadius: '8px',
          marginTop: '-8px',
        }}>
          <p style={{
            color: '#D8DDE3',
            fontSize: '12px',
            marginBottom: '8px',
            fontWeight: '500',
          }}>
            Password strength:
          </p>
          <div style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '8px',
          }}>
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  background: formData.password.length >= level * 2 
                    ? (level <= 2 ? '#FF4444' : level === 3 ? '#FFA500' : '#3BFFB3')
                    : 'rgba(216, 221, 227, 0.2)',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {[
              { test: formData.password.length >= 8, text: 'At least 8 characters' },
              { test: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
              { test: /[a-z]/.test(formData.password), text: 'One lowercase letter' },
              { test: /\d/.test(formData.password), text: 'One number' },
            ].map((requirement, index) => (
              <li
                key={index}
                style={{
                  color: requirement.test ? '#3BFFB3' : '#D8DDE3',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '4px',
                }}
              >
                <span style={{ fontSize: '16px' }}>{requirement.test ? '✓' : '○'}</span>
                {requirement.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Input
        label="Confirm New Password"
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

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        style={{ width: '100%', marginTop: '8px' }}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
