import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import ReviewerActions from '../../components/review/ReviewerActions';
import { getJobById } from '../../api/jobs';
import { reviewAPI } from '../../api/review';

const ReviewJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadJob();
  }, [jobId]);

  const loadJob = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Backend Integration: Fetch job details
      const data = await getJobById(jobId);
      setJob(data);
    } catch (err) {
      console.error('Failed to load job:', err);
      setError(err.message || 'Failed to load job');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      setSubmitting(true);
      
      // Backend Integration: Submit review
      await reviewAPI.submitReview(jobId, reviewData);
      
      // Navigate back to queue
      navigate('/app/review-queue');
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              border: '6px solid rgba(42, 107, 255, 0.2)',
              borderTopColor: '#35E2FF',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '32px' }}>
            <Card>
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                  Job Not Found
                </h2>
                <p style={{ fontSize: '16px', color: '#D8DDE3', marginBottom: '24px' }}>
                  {error || 'The requested job could not be found'}
                </p>
              </div>
            </Card>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
            <span
              onClick={() => navigate('/app/review-queue')}
              style={{ color: '#35E2FF', cursor: 'pointer', transition: 'opacity 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Review Queue
            </span>
            <span style={{ color: '#D8DDE3' }}>/</span>
            <span style={{ color: '#D8DDE3' }}>{jobId}</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}>
              Review Job
            </h1>
            <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
              Validate AI analysis with human expertise
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px',
          }}>
            {/* Video Preview */}
            <Card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                  Video
                </h2>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  background: '#000',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid rgba(53, 226, 255, 0.3)',
                }}>
                  <video
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                    src={job.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                    controls
                  />
                </div>
              </div>
            </Card>

            {/* AI Analysis */}
            <Card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                  AI Analysis
                </h2>
                <div style={{
                  padding: '20px',
                  background: `rgba(${job.fakeScore > 70 ? '255, 68, 68' : '59, 255, 179'}, 0.1)`,
                  border: `1px solid ${job.fakeScore > 70 ? '#FF4444' : '#3BFFB3'}`,
                  borderRadius: '8px',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '8px' }}>Fake Score</div>
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '700',
                    color: job.fakeScore > 70 ? '#FF4444' : '#3BFFB3',
                  }}>
                    {job.fakeScore || 0}%
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#D8DDE3' }}>Visual Artifacts</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                        {job.visualScore || 85}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(42, 107, 255, 0.2)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${job.visualScore || 85}%`,
                        height: '100%',
                        background: '#2A6BFF',
                      }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#D8DDE3' }}>Audio Inconsistency</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                        {job.audioScore || 72}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(42, 107, 255, 0.2)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${job.audioScore || 72}%`,
                        height: '100%',
                        background: '#35E2FF',
                      }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#D8DDE3' }}>Face Manipulation</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                        {job.faceScore || 91}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(42, 107, 255, 0.2)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${job.faceScore || 91}%`,
                        height: '100%',
                        background: '#FFA500',
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Review Actions */}
          <div style={{ marginTop: '24px' }}>
            <ReviewerActions
              jobId={jobId}
              aiScore={job.fakeScore || 0}
              onSubmit={handleSubmitReview}
              submitting={submitting}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewJob;
