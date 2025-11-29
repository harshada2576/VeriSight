import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';
import Card from '../../components/ui/Card';

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setError(null);
      // Backend Integration: Call forgot password API
      // await authAPI.forgotPassword(data.email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          {/* Logo/Title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #35E2FF 0%, #2A6BFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px',
            }}>
              VeriSight
            </h1>
            <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
              Reset your password
            </p>
          </div>

          {/* Success Message */}
          {success ? (
            <Card>
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#3BFFB3', marginBottom: '12px' }}>
                  Check Your Email
                </h2>
                <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '24px' }}>
                  We've sent password reset instructions to your email address.
                </p>
                <Link
                  to="/login"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  Back to Login
                </Link>
              </div>
            </Card>
          ) : (
            <>
              {/* Error Message */}
              {error && (
                <div style={{
                  padding: '16px',
                  marginBottom: '24px',
                  background: 'rgba(255, 68, 68, 0.1)',
                  border: '1px solid #FF4444',
                  borderRadius: '8px',
                  color: '#FF4444',
                  fontSize: '14px',
                }}>
                  {error}
                </div>
              )}

              {/* Forgot Password Form */}
              <Card>
                <ForgotPasswordForm onSubmit={handleSubmit} />
              </Card>

              {/* Links */}
              <div style={{
                marginTop: '24px',
                textAlign: 'center',
                fontSize: '14px',
                color: '#D8DDE3',
              }}>
                Remember your password?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#35E2FF',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
