import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FrameGrid from '../../components/evidence/FrameGrid';
import HeatmapViewer from '../../components/evidence/HeatmapViewer';
import SpectrogramPlayer from '../../components/evidence/SpectrogramPlayer';
import FaceGrid from '../../components/evidence/FaceGrid';
import { getJobEvidence } from '../../api/jobs';

const Evidence = () => {
  const { jobId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('type') || 'frames';

  const [evidence, setEvidence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvidence();
  }, [jobId, activeTab]);

  const loadEvidence = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Backend Integration: Fetch evidence data
      const data = await getJobEvidence(jobId, activeTab);
      setEvidence(data);
    } catch (err) {
      console.error('Failed to load evidence:', err);
      setError(err.message || 'Failed to load evidence');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'frames', label: 'Anomalous Frames', icon: '🎞️' },
    { id: 'heatmap', label: 'Heatmaps', icon: '🔥' },
    { id: 'audio', label: 'Audio Analysis', icon: '🎵' },
    { id: 'faces', label: 'Face Detections', icon: '👤' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
            <span
              onClick={() => navigate('/app/jobs')}
              style={{ color: '#35E2FF', cursor: 'pointer', transition: 'opacity 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Jobs
            </span>
            <span style={{ color: '#D8DDE3' }}>/</span>
            <span
              onClick={() => navigate(`/app/jobs/${jobId}`)}
              style={{ color: '#35E2FF', cursor: 'pointer', transition: 'opacity 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {jobId}
            </span>
            <span style={{ color: '#D8DDE3' }}>/</span>
            <span style={{ color: '#D8DDE3' }}>Evidence</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}>
              Detection Evidence
            </h1>
            <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
              Detailed analysis artifacts and supporting evidence
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
            borderBottom: '1px solid rgba(53, 226, 255, 0.3)',
            overflowX: 'auto',
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ type: tab.id })}
                style={{
                  padding: '16px 24px',
                  background: activeTab === tab.id ? 'rgba(53, 226, 255, 0.1)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #35E2FF' : '2px solid transparent',
                  color: activeTab === tab.id ? '#35E2FF' : '#D8DDE3',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'rgba(53, 226, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <Card>
              <div style={{ padding: '64px', textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  border: '6px solid rgba(42, 107, 255, 0.2)',
                  borderTopColor: '#35E2FF',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 24px',
                }} />
                <p style={{ color: '#D8DDE3' }}>Loading evidence...</p>
                <style>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            </Card>
          ) : error ? (
            <Card>
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                  Failed to Load Evidence
                </h2>
                <p style={{ fontSize: '16px', color: '#D8DDE3', marginBottom: '24px' }}>{error}</p>
                <Button onClick={loadEvidence}>Retry</Button>
              </div>
            </Card>
          ) : (
            <>
              {activeTab === 'frames' && <FrameGrid frames={evidence?.frames || []} />}
              {activeTab === 'heatmap' && <HeatmapViewer heatmaps={evidence?.heatmaps || []} />}
              {activeTab === 'audio' && (
                <SpectrogramPlayer
                  audioUrl={evidence?.audioUrl}
                  spectrogramUrl={evidence?.spectrogramUrl}
                />
              )}
              {activeTab === 'faces' && <FaceGrid faces={evidence?.faces || []} />}
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Evidence;
