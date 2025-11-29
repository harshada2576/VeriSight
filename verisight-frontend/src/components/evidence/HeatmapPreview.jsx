import Card from '../ui/Card';

const HeatmapPreview = ({ heatmap, onClick }) => {
  if (!heatmap) {
    return null;
  }

  return (
    <Card
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(42, 107, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        position: 'relative',
        aspectRatio: '16/9',
      }}>
        <img
          src={heatmap.url || 'https://via.placeholder.com/400x225?text=Heatmap'}
          alt="Heatmap preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        
        {/* Score Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          padding: '8px 12px',
          background: 'rgba(10, 30, 63, 0.95)',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          color: heatmap.score > 0.7 ? '#FF4444' : heatmap.score > 0.4 ? '#FFA500' : '#3BFFB3',
          border: `1px solid ${heatmap.score > 0.7 ? '#FF4444' : heatmap.score > 0.4 ? '#FFA500' : '#3BFFB3'}`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        }}>
          {(heatmap.score * 100).toFixed(1)}%
        </div>

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(10, 30, 63, 0.95) 100%)',
        }}>
          <h4 style={{
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '4px',
          }}>
            {heatmap.type || 'Manipulation Heatmap'}
          </h4>
          {heatmap.timestamp && (
            <p style={{
              color: '#35E2FF',
              fontSize: '12px',
              margin: 0,
            }}>
              Timestamp: {heatmap.timestamp}s
            </p>
          )}
        </div>
      </div>

      <div style={{
        padding: '16px',
      }}>
        <p style={{
          color: '#D8DDE3',
          fontSize: '14px',
          lineHeight: '1.6',
          margin: 0,
        }}>
          {heatmap.description || 'Click to view detailed heatmap analysis and manipulation regions'}
        </p>
      </div>
    </Card>
  );
};

export default HeatmapPreview;
