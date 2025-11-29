import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', path: '/#features' },
      { name: 'How It Works', path: '/how-it-works' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Demo', path: '/demo' },
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookie-policy' },
      { name: 'GDPR', path: '/gdpr' },
    ],
    social: [
      { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
      { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
      { name: 'GitHub', icon: 'github', url: 'https://github.com' },
      { name: 'Discord', icon: 'discord', url: 'https://discord.com' },
    ],
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, rgba(10, 30, 63, 0.95) 0%, #0A1E3F 100%)',
      borderTop: '1px solid rgba(42, 107, 255, 0.3)',
      marginTop: 'auto',
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '64px 24px 32px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(42, 107, 255, 0.5)',
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
            </div>
            <p style={{
              color: '#D8DDE3',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '24px',
            }}>
              Autonomous agentic AI pipeline for deepfake detection with visual, audio, and temporal analysis.
            </p>
            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '12px',
            }}>
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(42, 107, 255, 0.1)',
                    border: '1px solid rgba(42, 107, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#35E2FF',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(42, 107, 255, 0.2)';
                    e.currentTarget.style.borderColor = '#35E2FF';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(53, 226, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(42, 107, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(42, 107, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-label={social.name}
                >
                  {social.icon === 'twitter' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  )}
                  {social.icon === 'linkedin' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  )}
                  {social.icon === 'github' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                    </svg>
                  )}
                  {social.icon === 'discord' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 style={{
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
            }}>
              Product
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.product.map((link) => (
                <li key={link.path} style={{ marginBottom: '12px' }}>
                  <Link
                    to={link.path}
                    style={{
                      color: '#D8DDE3',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#35E2FF'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D8DDE3'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 style={{
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
            }}>
              Company
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.company.map((link) => (
                <li key={link.path} style={{ marginBottom: '12px' }}>
                  <Link
                    to={link.path}
                    style={{
                      color: '#D8DDE3',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#35E2FF'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D8DDE3'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 style={{
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
            }}>
              Legal
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.legal.map((link) => (
                <li key={link.path} style={{ marginBottom: '12px' }}>
                  <Link
                    to={link.path}
                    style={{
                      color: '#D8DDE3',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#35E2FF'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D8DDE3'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid rgba(42, 107, 255, 0.2)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          <p style={{
            color: '#D8DDE3',
            fontSize: '14px',
            margin: 0,
          }}>
            © {currentYear} VeriSight. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#D8DDE3',
            fontSize: '14px',
          }}>
            <span>Powered by</span>
            <span style={{
              background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '600',
            }}>
              Agentic AI
            </span>
          </div>
        </div>
      </div>

      {/* Scanning Line Effect */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #35E2FF, transparent)',
        animation: 'scan 3s linear infinite',
      }}/>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
