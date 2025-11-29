import Card from '../ui/Card';

const StatsCard = ({ title, value, change, icon, trend = 'up' }) => {
  const getTrendColor = () => {
    if (trend === 'up') return '#3BFFB3';
    if (trend === 'down') return '#FF4444';
    return '#35E2FF';
  };

  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="18 15 12 9 6 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (trend === 'down') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    return null;
  };

  return (
    <Card style={{
      padding: '24px',
      background: 'linear-gradient(135deg, rgba(10, 30, 63, 0.8) 0%, rgba(42, 107, 255, 0.1) 100%)',
      border: '1px solid rgba(42, 107, 255, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(42, 107, 255, 0.3)';
      e.currentTarget.style.borderColor = '#35E2FF';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = 'rgba(42, 107, 255, 0.3)';
    }}
    >
      {/* Background glow effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(42, 107, 255, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}/>

      <div style={{
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}>
          <div>
            <p style={{
              color: '#D8DDE3',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px',
            }}>
              {title}
            </p>
            <h3 style={{
              color: '#FFFFFF',
              fontSize: '32px',
              fontWeight: '700',
              margin: 0,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #35E2FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {value}
            </h3>
          </div>
          
          {icon && (
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(42, 107, 255, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#35E2FF',
              border: '1px solid rgba(53, 226, 255, 0.3)',
            }}>
              {icon}
            </div>
          )}
        </div>

        {change && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: getTrendColor(),
            fontSize: '14px',
            fontWeight: '500',
          }}>
            {getTrendIcon()}
            <span>{change}</span>
            <span style={{ color: '#D8DDE3', fontWeight: '400' }}>vs last period</span>
          </div>
        )}
      </div>

      {/* Scanning line animation */}
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
    </Card>
  );
};

export default StatsCard;
