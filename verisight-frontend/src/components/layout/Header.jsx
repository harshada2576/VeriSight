import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock auth state - will be replaced with AuthContext
  const isAuthenticated = location.pathname.startsWith('/app');
  const user = isAuthenticated ? { name: 'John Doe', email: 'john@example.com' } : null;

  const handleLogout = () => {
    // Backend integration point: Call logout API
    // await authAPI.logout();
    navigate('/login');
  };

  const publicNav = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Demo', path: '/demo' },
  ];

  const appNav = [
    { name: 'Dashboard', path: '/app/dashboard' },
    { name: 'Upload', path: '/app/upload' },
    { name: 'Jobs', path: '/app/jobs' },
    { name: 'Review Queue', path: '/app/review-queue' },
  ];

  const navigation = isAuthenticated ? appNav : publicNav;

  return (
    <header style={{
      background: 'linear-gradient(180deg, #0A1E3F 0%, rgba(10, 30, 63, 0.95) 100%)',
      borderBottom: '1px solid rgba(42, 107, 255, 0.3)',
      boxShadow: '0 4px 24px rgba(42, 107, 255, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
    }}>
      <nav style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to={isAuthenticated ? '/app/dashboard' : '/'} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(42, 107, 255, 0.5)',
            animation: 'pulse 2s ease-in-out infinite',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontSize: '24px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #35E2FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            VeriSight
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'none',
          gap: '8px',
          alignItems: 'center',
        }}
        className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: '8px 16px',
                color: location.pathname === item.path ? '#35E2FF' : '#FFFFFF',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '8px',
                background: location.pathname === item.path ? 'rgba(42, 107, 255, 0.2)' : 'transparent',
                border: location.pathname === item.path ? '1px solid rgba(53, 226, 255, 0.3)' : '1px solid transparent',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = 'rgba(42, 107, 255, 0.15)';
                  e.currentTarget.style.border = '1px solid rgba(53, 226, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.border = '1px solid transparent';
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}>
          {isAuthenticated ? (
            <>
              <div style={{
                display: 'none',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                background: 'rgba(42, 107, 255, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(42, 107, 255, 0.3)',
              }}
              className="user-info">
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                }}>
                  {user?.name.charAt(0)}
                </div>
                <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '500' }}>
                  {user?.name}
                </span>
              </div>
              <Button variant="secondary" onClick={() => navigate('/app/settings')}>
                Settings
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="primary" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              padding: '8px',
              background: 'transparent',
              border: '1px solid rgba(42, 107, 255, 0.3)',
              borderRadius: '8px',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            className="mobile-menu-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <>
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          padding: '16px 24px',
          background: 'rgba(10, 30, 63, 0.98)',
          borderTop: '1px solid rgba(42, 107, 255, 0.3)',
          animation: 'slideDown 0.3s ease',
        }}
        className="mobile-menu">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 16px',
                color: location.pathname === item.path ? '#35E2FF' : '#FFFFFF',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '8px',
                background: location.pathname === item.path ? 'rgba(42, 107, 255, 0.2)' : 'transparent',
                marginBottom: '8px',
                transition: 'all 0.3s ease',
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(42, 107, 255, 0.5); }
          50% { box-shadow: 0 0 30px rgba(53, 226, 255, 0.8); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .user-info { display: flex !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
