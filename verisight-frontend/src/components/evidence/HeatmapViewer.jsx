import { useState } from 'react';

const HeatmapViewer = ({ heatmaps = [] }) => {
  const [selectedHeatmap, setSelectedHeatmap] = useState(null);

  if (heatmaps.length === 0) {
    return (
      <div style={{
        padding: '48px 24px',
        textAlign: 'center',
        background: 'rgba(42, 107, 255, 0.05)',
        borderRadius: '12px',
        border: '1px dashed rgba(42, 107, 255, 0.3)',
      }}>
        <p style={{ color: '#D8DDE3', fontSize: '14px' }}>
          No heatmap data available
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Heatmap Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {heatmaps.map((heatmap, index) => (
          <div
            key={index}
            onClick={() => setSelectedHeatmap(heatmap)}
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              borderRadius: '8px',
              overflow: 'hidden',
              border: selectedHeatmap === heatmap ? '2px solid #35E2FF' : '1px solid rgba(42, 107, 255, 0.3)',
              background: 'rgba(10, 30, 63, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(53, 226, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img
              src={heatmap.url || 'https://via.placeholder.com/250x141?text=Heatmap'}
              alt={`Heatmap ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '4px 8px',
              background: 'rgba(10, 30, 63, 0.9)',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '600',
              color: heatmap.score > 0.7 ? '#FF4444' : heatmap.score > 0.4 ? '#FFA500' : '#3BFFB3',
              border: `1px solid ${heatmap.score > 0.7 ? '#FF4444' : heatmap.score > 0.4 ? '#FFA500' : '#3BFFB3'}`,
            }}>
              {(heatmap.score * 100).toFixed(1)}%
            </div>
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
                fontSize: '12px',
                fontWeight: '500',
                margin: 0,
              }}>
                {heatmap.type || 'Face Region'}
              </p>
              {heatmap.timestamp && (
                <p style={{
                  color: '#35E2FF',
                  fontSize: '11px',
                  margin: 0,
                }}>
                  {heatmap.timestamp}s
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Heatmap Detail View */}
      {selectedHeatmap && (
        <div style={{
          padding: '24px',
          background: 'rgba(42, 107, 255, 0.05)',
          border: '1px solid rgba(42, 107, 255, 0.3)',
          borderRadius: '12px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}>
            <h3 style={{
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: '600',
              margin: 0,
            }}>
              Heatmap Analysis
            </h3>
            <button
              onClick={() => setSelectedHeatmap(null)}
              style={{
                padding: '8px',
                background: 'transparent',
                border: '1px solid rgba(42, 107, 255, 0.3)',
                borderRadius: '6px',
                color: '#D8DDE3',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
          }}>
            <div>
              <img
                src={selectedHeatmap.url}
                alt="Selected heatmap"
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid rgba(42, 107, 255, 0.3)',
                }}
              />
            </div>
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  color: '#D8DDE3',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'block',
                  marginBottom: '4px',
                }}>
                  Manipulation Score
                </label>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: selectedHeatmap.score > 0.7 ? '#FF4444' : selectedHeatmap.score > 0.4 ? '#FFA500' : '#3BFFB3',
                }}>
                  {(selectedHeatmap.score * 100).toFixed(1)}%
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  color: '#D8DDE3',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Region Type
                </label>
                <div style={{
                  padding: '8px 12px',
                  background: 'rgba(42, 107, 255, 0.1)',
                  border: '1px solid rgba(42, 107, 255, 0.3)',
                  borderRadius: '6px',
                  color: '#35E2FF',
                  fontSize: '14px',
                }}>
                  {selectedHeatmap.type || 'Face Region'}
                </div>
              </div>

              {selectedHeatmap.metadata && (
                <div>
                  <label style={{
                    color: '#D8DDE3',
                    fontSize: '12px',
                    fontWeight: '500',
                    display: 'block',
                    marginBottom: '8px',
                  }}>
                    Additional Details
                  </label>
                  <div style={{
                    padding: '12px',
                    background: 'rgba(10, 30, 63, 0.5)',
                    border: '1px solid rgba(42, 107, 255, 0.2)',
                    borderRadius: '6px',
                    color: '#D8DDE3',
                    fontSize: '12px',
                    lineHeight: '1.6',
                  }}>
                    {Object.entries(selectedHeatmap.metadata).map(([key, value]) => (
                      <div key={key} style={{ marginBottom: '4px' }}>
                        <strong style={{ color: '#FFFFFF' }}>{key}:</strong> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatmapViewer;
