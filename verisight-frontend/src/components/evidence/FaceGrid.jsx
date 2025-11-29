const FaceGrid = ({ faces = [] }) => {
  if (faces.length === 0) {
    return (
      <div style={{
        padding: '48px 24px',
        textAlign: 'center',
        background: 'rgba(42, 107, 255, 0.05)',
        borderRadius: '12px',
        border: '1px dashed rgba(42, 107, 255, 0.3)',
      }}>
        <p style={{ color: '#D8DDE3', fontSize: '14px' }}>
          No face crops available
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '16px',
    }}>
      {faces.map((face, index) => (
        <div
          key={index}
          style={{
            position: 'relative',
            aspectRatio: '1',
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
            src={face.url || 'https://via.placeholder.com/150?text=Face'}
            alt={`Face ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          
          {/* Confidence Score Overlay */}
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '4px 8px',
            background: 'rgba(10, 30, 63, 0.9)',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '600',
            color: face.confidence > 0.7 ? '#3BFFB3' : face.confidence > 0.4 ? '#FFA500' : '#FF4444',
            border: `1px solid ${face.confidence > 0.7 ? '#3BFFB3' : face.confidence > 0.4 ? '#FFA500' : '#FF4444'}`,
          }}>
            {face.confidence ? `${(face.confidence * 100).toFixed(0)}%` : 'N/A'}
          </div>

          {/* Frame Info */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '8px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(10, 30, 63, 0.95) 100%)',
          }}>
            <p style={{
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: '500',
              margin: 0,
            }}>
              Face #{index + 1}
            </p>
            {face.frame && (
              <p style={{
                color: '#35E2FF',
                fontSize: '10px',
                margin: 0,
              }}>
                Frame {face.frame}
              </p>
            )}
          </div>

          {/* Detection Box Overlay (if coordinates provided) */}
          {face.bbox && (
            <div style={{
              position: 'absolute',
              top: `${face.bbox.y}%`,
              left: `${face.bbox.x}%`,
              width: `${face.bbox.width}%`,
              height: `${face.bbox.height}%`,
              border: '2px solid #35E2FF',
              boxShadow: '0 0 10px rgba(53, 226, 255, 0.5)',
              pointerEvents: 'none',
            }}/>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaceGrid;
