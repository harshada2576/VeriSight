const JobRow = ({ job, onClick }) => {
  const getStatusColor = (status) => {
    const colors = {
      preprocessing: '#FFA500',
      analyzing: '#2A6BFF',
      decision: '#35E2FF',
      completed: '#3BFFB3',
      failed: '#FF4444',
    };
    return colors[status] || '#D8DDE3';
  };

  const getStatusIcon = (status) => {
    if (status === 'preprocessing' || status === 'analyzing') {
      return (
        <div style={{
          width: '16px',
          height: '16px',
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}/>
      );
    }
    if (status === 'completed') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (status === 'failed') {
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2" strokeLinecap="round"/>
          <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    return null;
  };

  const getLabelColor = (label) => {
    if (label === 'FAKE') return '#FF4444';
    if (label === 'REAL') return '#3BFFB3';
    return '#D8DDE3';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <>
      <tr
        onClick={onClick}
        style={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(42, 107, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <td style={{
          padding: '16px',
          borderBottom: '1px solid rgba(42, 107, 255, 0.2)',
        }}>
          <div style={{
            width: '60px',
            height: '40px',
            borderRadius: '6px',
            background: `url(${job.thumbnail || 'https://via.placeholder.com/60x40?text=Video'}) center/cover`,
            border: '1px solid rgba(42, 107, 255, 0.3)',
          }}/>
        </td>
        
        <td style={{
          padding: '16px',
          borderBottom: '1px solid rgba(42, 107, 255, 0.2)',
        }}>
          <span style={{
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '500',
          }}>
            {job.filename || `Job #${job.id}`}
          </span>
        </td>

        <td style={{
          padding: '16px',
          borderBottom: '1px solid rgba(42, 107, 255, 0.2)',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: `${getStatusColor(job.status)}20`,
            border: `1px solid ${getStatusColor(job.status)}`,
            borderRadius: '6px',
            color: getStatusColor(job.status),
            fontSize: '12px',
            fontWeight: '500',
          }}>
            {getStatusIcon(job.status)}
            <span style={{ textTransform: 'capitalize' }}>{job.status}</span>
          </div>
        </td>

        <td style={{
          padding: '16px',
          borderBottom: '1px solid rgba(42, 107, 255, 0.2)',
        }}>
          {job.confidence !== null && job.confidence !== undefined ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                flex: 1,
                height: '6px',
                background: 'rgba(42, 107, 255, 0.2)',
                borderRadius: '3px',
                overflow: 'hidden',
                minWidth: '80px',
              }}>
                <div style={{
                  width: `${job.confidence}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${job.confidence > 70 ? '#3BFFB3' : job.confidence > 40 ? '#FFA500' : '#FF4444'}, ${job.confidence > 70 ? '#35E2FF' : job.confidence > 40 ? '#FFD700' : '#FF6666'})`,
                  borderRadius: '3px',
                  transition: 'width 0.5s ease',
                }}/>
              </div>
              <span style={{
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '600',
                minWidth: '40px',
              }}>
                {job.confidence}%
              </span>
            </div>
          ) : (
            <span style={{ color: '#D8DDE3', fontSize: '14px' }}>—</span>
          )}
        </td>

        <td style={{
          padding: '16px',
          borderBottom: '1px solid rgba(42, 107, 255, 0.2)',
        }}>
          {job.label ? (
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: `${getLabelColor(job.label)}20`,
              border: `1px solid ${getLabelColor(job.label)}`,
              borderRadius: '6px',
              color: getLabelColor(job.label),
              fontSize: '12px',
              fontWeight: '600',
            }}>
              {job.label}
            </span>
          ) : (
            <span style={{ color: '#D8DDE3', fontSize: '14px' }}>—</span>
          )}
        </td>

        <td style={{
          padding: '16px',
          borderBottom: '1px solid rgba(42, 107, 255, 0.2)',
          color: '#D8DDE3',
          fontSize: '14px',
        }}>
          {formatDate(job.created_at)}
        </td>
      </tr>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default JobRow;
