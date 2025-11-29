import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ForgotPasswordForm = ({ onSubmit, isLoading = false }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!email) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email is invalid';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Backend integration point
    // The parent component should handle the actual API call
    if (onSubmit) {
      await onSubmit({ email });
      setSubmitted(true);
    }
  };

  if (submitted) {
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
          Check Your Email
        </h3>
        <p style={{
          color: '#D8DDE3',
          fontSize: '16px',
          lineHeight: '1.6',
          marginBottom: '24px',
        }}>
          We've sent a password reset link to <strong style={{ color: '#35E2FF' }}>{email}</strong>
        </p>
        <p style={{
          color: '#D8DDE3',
          fontSize: '14px',
          marginBottom: '24px',
        }}>
          Didn't receive the email? Check your spam folder or{' '}
          <button
            onClick={() => setSubmitted(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#35E2FF',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '14px',
              padding: 0,
            }}
          >
            try again
          </button>
        </p>
        <Button
          variant="secondary"
          onClick={() => window.location.href = '/login'}
          style={{ width: '100%' }}
        >
          Back to Login
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2"/>
          </svg>
        </div>
        <p style={{
          color: '#D8DDE3',
          fontSize: '14px',
          lineHeight: '1.6',
        }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError('');
        }}
        placeholder="you@example.com"
        error={error}
        disabled={isLoading}
        prefix={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
            <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
          </svg>
        }
      />

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        style={{ width: '100%', marginTop: '8px' }}
      >
        Send Reset Link
      </Button>

      <div style={{
        textAlign: 'center',
        color: '#D8DDE3',
        fontSize: '14px',
      }}>
        Remember your password?{' '}
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

export default ForgotPasswordForm;
