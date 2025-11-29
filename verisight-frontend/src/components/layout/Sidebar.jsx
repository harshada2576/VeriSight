import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      section: 'Main',
      items: [
        { name: 'Dashboard', path: '/app/dashboard', icon: 'dashboard' },
        { name: 'Upload', path: '/app/upload', icon: 'upload' },
        { name: 'Jobs', path: '/app/jobs', icon: 'jobs' },
      ],
    },
    {
      section: 'Review',
      items: [
        { name: 'Review Queue', path: '/app/review-queue', icon: 'review' },
      ],
    },
    {
      section: 'Account',
      items: [
        { name: 'Settings', path: '/app/settings', icon: 'settings' },
        { name: 'Billing', path: '/app/billing', icon: 'billing' },
      ],
    },
  ];

  const getIcon = (iconName) => {
    const icons = {
      dashboard: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      upload: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      jobs: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 11l3 3L22 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      review: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 11l3 3 8-8M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      settings: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      billing: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="1" y1="10" x2="23" y2="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    };
    return icons[iconName] || icons.dashboard;
  };

  return (
    <aside style={{
      width: isCollapsed ? '80px' : '260px',
      background: 'linear-gradient(180deg, #0A1E3F 0%, rgba(10, 30, 63, 0.95) 100%)',
      borderRight: '1px solid rgba(42, 107, 255, 0.3)',
      height: '100vh',
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
    }}>
      {/* Toggle Button */}
      <div style={{
        padding: '16px',
        display: 'flex',
        justifyContent: isCollapsed ? 'center' : 'flex-end',
      }}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            width: '36px',
            height: '36px',
            background: 'rgba(42, 107, 255, 0.1)',
            border: '1px solid rgba(42, 107, 255, 0.3)',
            borderRadius: '8px',
            color: '#35E2FF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(42, 107, 255, 0.2)';
            e.currentTarget.style.borderColor = '#35E2FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(42, 107, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(42, 107, 255, 0.3)';
          }}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{
            transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}>
            <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav style={{
        flex: 1,
        padding: '0 16px',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{ marginBottom: '24px' }}>
            {!isCollapsed && (
              <h3 style={{
                color: '#D8DDE3',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px',
                paddingLeft: '12px',
              }}>
                {section.section}
              </h3>
            )}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path} style={{ marginBottom: '4px' }}>
                    <Link
                      to={item.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: isCollapsed ? '12px' : '12px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: isActive ? '#35E2FF' : '#FFFFFF',
                        background: isActive ? 'rgba(42, 107, 255, 0.2)' : 'transparent',
                        border: isActive ? '1px solid rgba(53, 226, 255, 0.3)' : '1px solid transparent',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        justifyContent: isCollapsed ? 'center' : 'flex-start',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(42, 107, 255, 0.15)';
                          e.currentTarget.style.border = '1px solid rgba(53, 226, 255, 0.2)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.border = '1px solid transparent';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }
                      }}
                      title={isCollapsed ? item.name : ''}
                    >
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px',
                      }}>
                        {getIcon(item.icon)}
                      </span>
                      {!isCollapsed && (
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          whiteSpace: 'nowrap',
                        }}>
                          {item.name}
                        </span>
                      )}
                      {isActive && (
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '3px',
                          height: '60%',
                          background: 'linear-gradient(180deg, #2A6BFF 0%, #35E2FF 100%)',
                          borderRadius: '0 2px 2px 0',
                          boxShadow: '0 0 10px rgba(53, 226, 255, 0.5)',
                        }}/>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Stats/Info */}
      {!isCollapsed && (
        <div style={{
          padding: '16px',
          borderTop: '1px solid rgba(42, 107, 255, 0.2)',
        }}>
          <div style={{
            background: 'rgba(42, 107, 255, 0.1)',
            border: '1px solid rgba(42, 107, 255, 0.3)',
            borderRadius: '8px',
            padding: '12px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#3BFFB3',
                boxShadow: '0 0 10px rgba(59, 255, 179, 0.5)',
                animation: 'pulse-status 2s ease-in-out infinite',
              }}/>
              <span style={{
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: '500',
              }}>
                System Status
              </span>
            </div>
            <p style={{
              color: '#D8DDE3',
              fontSize: '11px',
              margin: 0,
            }}>
              All systems operational
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-status {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        aside::-webkit-scrollbar {
          width: 6px;
        }
        
        aside::-webkit-scrollbar-track {
          background: transparent;
        }
        
        aside::-webkit-scrollbar-thumb {
          background: rgba(42, 107, 255, 0.3);
          border-radius: 3px;
        }
        
        aside::-webkit-scrollbar-thumb:hover {
          background: rgba(42, 107, 255, 0.5);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
