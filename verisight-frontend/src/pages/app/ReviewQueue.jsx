import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import ReviewerQueueItem from '../../components/review/ReviewerQueueItem';
import { reviewAPI } from '../../api/review';

const ReviewQueue = () => {
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, high-priority, flagged

  useEffect(() => {
    loadQueue();
  }, [filter]);

  const loadQueue = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Backend Integration: Fetch review queue
      const data = await reviewAPI.getReviewQueue({ filter });
      setQueue(data.jobs || []);
    } catch (err) {
      console.error('Failed to load review queue:', err);
      setError(err.message || 'Failed to load review queue');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = (jobId) => {
    navigate(`/app/review/${jobId}`);
  };

  const filters = [
    { value: 'all', label: 'All Jobs' },
    { value: 'high-priority', label: 'High Priority' },
    { value: 'flagged', label: 'Flagged' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}>
              Review Queue
            </h1>
            <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
              Human validation requests for AI-flagged content
            </p>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}>
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                style={{
                  padding: '10px 20px',
                  background: filter === f.value ? 'rgba(53, 226, 255, 0.2)' : 'transparent',
                  border: `1px solid ${filter === f.value ? '#35E2FF' : 'rgba(53, 226, 255, 0.3)'}`,
                  borderRadius: '8px',
                  color: filter === f.value ? '#35E2FF' : '#D8DDE3',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (filter !== f.value) {
                    e.currentTarget.style.background = 'rgba(53, 226, 255, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== f.value) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Queue List */}
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
                <p style={{ color: '#D8DDE3' }}>Loading queue...</p>
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
                  Failed to Load Queue
                </h2>
                <p style={{ fontSize: '16px', color: '#D8DDE3', marginBottom: '24px' }}>{error}</p>
              </div>
            </Card>
          ) : queue.length === 0 ? (
            <Card>
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                  All Caught Up!
                </h2>
                <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
                  No jobs pending review at the moment.
                </p>
              </div>
            </Card>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {queue.map((job) => (
                <ReviewerQueueItem
                  key={job.id}
                  job={job}
                  onReview={handleReview}
                />
              ))}
            </div>
          )}

          {/* Stats */}
          {!loading && !error && queue.length > 0 && (
            <Card style={{ marginTop: '24px' }}>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                  Queue Statistics
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '16px',
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Total Pending</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#FFFFFF' }}>{queue.length}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>High Priority</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#FFA500' }}>
                      {queue.filter((j) => j.priority === 'high').length}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Flagged</div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#FF4444' }}>
                      {queue.filter((j) => j.flagged).length}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewQueue;
