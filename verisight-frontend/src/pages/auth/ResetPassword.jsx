import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ResetPasswordForm from '../../components/forms/ResetPasswordForm';
import Card from '../../components/ui/Card';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setError(null);
      // Backend Integration: Call reset password API
      // await authAPI.resetPassword({ token, password: data.password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    }
  };

  if (!token) {
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
          <Card style={{ maxWidth: '480px', textAlign: 'center' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFA500', marginBottom: '12px' }}>
                Invalid Reset Link
              </h2>
              <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '24px' }}>
                This password reset link is invalid or has expired.
              </p>
              <Link
                to="/forgot-password"
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
                Request New Link
              </Link>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

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
              Set your new password
            </p>
          </div>

          {/* Success Message */}
          {success ? (
            <Card>
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#3BFFB3', marginBottom: '12px' }}>
                  Password Reset Successful
                </h2>
                <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '8px' }}>
                  Your password has been updated successfully.
                </p>
                <p style={{ fontSize: '14px', color: '#D8DDE3' }}>
                  Redirecting to login...
                </p>
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

              {/* Reset Password Form */}
              <Card>
                <ResetPasswordForm onSubmit={handleSubmit} />
              </Card>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
