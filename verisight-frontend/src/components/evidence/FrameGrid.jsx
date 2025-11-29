const FrameGrid = ({ frames = [] }) => {
  if (frames.length === 0) {
    return (
      <div style={{
        padding: '48px 24px',
        textAlign: 'center',
        background: 'rgba(42, 107, 255, 0.05)',
        borderRadius: '12px',
        border: '1px dashed rgba(42, 107, 255, 0.3)',
      }}>
        <p style={{ color: '#D8DDE3', fontSize: '14px' }}>
          No frames available
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
    }}>
      {frames.map((frame, index) => (
        <div
          key={index}
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(42, 107, 255, 0.3)',
            background: 'rgba(10, 30, 63, 0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = '#35E2FF';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(53, 226, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(42, 107, 255, 0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <img
            src={frame.url || 'https://via.placeholder.com/200x113?text=Frame'}
            alt={`Frame ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '8px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(10, 30, 63, 0.9) 100%)',
          }}>
            <p style={{
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '500',
              margin: 0,
            }}>
              Frame {index + 1}
            </p>
            {frame.timestamp && (
              <p style={{
                color: '#35E2FF',
                fontSize: '11px',
                margin: 0,
              }}>
                {frame.timestamp}s
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrameGrid;
