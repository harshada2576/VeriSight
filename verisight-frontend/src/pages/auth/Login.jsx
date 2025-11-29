import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import LoginForm from '../../components/forms/LoginForm';
import Card from '../../components/ui/Card';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      setError(null);
      await login(credentials.email, credentials.password);
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
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
              Sign in to your account
            </p>
          </div>

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

          {/* Login Form */}
          <Card>
            <LoginForm onSubmit={handleLogin} />
          </Card>

          {/* Links */}
          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#D8DDE3',
          }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                color: '#35E2FF',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
