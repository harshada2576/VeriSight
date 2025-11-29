import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { getJobById } from '../../api/jobs';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadJobDetails();
  }, [jobId]);

  const loadJobDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Backend Integration: Fetch job details by ID
      const jobData = await getJobById(jobId);
      setJob(jobData);
    } catch (err) {
      console.error('Failed to load job details:', err);
      setError(err.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#FFA500',
      'preprocessing': '#FFA500',
      'analyzing': '#2A6BFF',
      'completed': '#3BFFB3',
      'failed': '#FF4444',
    };
    return colors[status] || '#D8DDE3';
  };

  const getVerdict = (score) => {
    if (score >= 80) return { label: 'LIKELY FAKE', color: '#FF4444', icon: '⚠️' };
    if (score >= 50) return { label: 'SUSPICIOUS', color: '#FFA500', icon: '⚡' };
    return { label: 'LIKELY REAL', color: '#3BFFB3', icon: '✓' };
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
            }}/>
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
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                  Job Not Found
                </h2>
                <p style={{ fontSize: '16px', color: '#D8DDE3', marginBottom: '24px' }}>
                  {error || 'The requested job could not be found'}
                </p>
                <Button onClick={() => navigate('/app/jobs')}>
                  Back to Jobs
                </Button>
              </div>
            </Card>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  const verdict = getVerdict(job.fakeScore || 0);
  const statusColor = getStatusColor(job.status);

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
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Jobs
            </span>
            <span style={{ color: '#D8DDE3' }}>/</span>
            <span style={{ color: '#D8DDE3' }}>{jobId}</span>
          </div>

          {/* Header Section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '8px',
              }}>
                {job.filename || 'Untitled Video'}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 12px',
                  background: `${statusColor}20`,
                  border: `1px solid ${statusColor}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: statusColor,
                }}>
                  {job.status.toUpperCase()}
                </div>
                <span style={{ fontSize: '14px', color: '#D8DDE3' }}>
                  Created: {new Date(job.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" onClick={() => navigate(`/app/jobs/${jobId}/evidence`)}>
                📁 View Evidence
              </Button>
              <Button onClick={() => navigate(`/app/jobs/${jobId}/verification`)}>
                📜 Verification Pack
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px',
          }}>
            {/* Video Preview */}
            <Card style={{ gridColumn: job.status === 'completed' ? '1' : '1 / -1' }}>
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                  Video Preview
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
                  {/* Backend Integration: Replace with actual video URL */}
                  <video
                    ref={videoRef}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                    src={job.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    controls
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <Button onClick={togglePlayPause} style={{ flex: 1 }}>
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                  </Button>
                  <Button variant="secondary" onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime = 0;
                  }}>
                    🔄 Restart
                  </Button>
                </div>
              </div>
            </Card>

            {/* Analysis Results (Only show if completed) */}
            {job.status === 'completed' && (
              <Card>
                <div style={{ padding: '24px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '24px' }}>
                    Analysis Results
                  </h2>

                  {/* Overall Verdict */}
                  <div style={{
                    padding: '24px',
                    background: `${verdict.color}10`,
                    border: `2px solid ${verdict.color}`,
                    borderRadius: '12px',
                    marginBottom: '24px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>{verdict.icon}</div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: verdict.color,
                      marginBottom: '8px',
                    }}>
                      {verdict.label}
                    </div>
                    <div style={{ fontSize: '14px', color: '#D8DDE3' }}>
                      Confidence: {job.confidence || 92}%
                    </div>
                  </div>

                  {/* Fake Score Bar */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                        Fake Score
                      </span>
                      <span style={{ fontSize: '24px', fontWeight: '700', color: verdict.color }}>
                        {job.fakeScore || 0}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '12px',
                      background: 'rgba(42, 107, 255, 0.2)',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <div style={{
                        width: `${job.fakeScore || 0}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, #3BFFB3 0%, #FFA500 50%, #FF4444 100%)`,
                        transition: 'width 1s ease-out',
                      }}/>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '4px',
                      fontSize: '12px',
                      color: '#D8DDE3',
                    }}>
                      <span>Real</span>
                      <span>Suspicious</span>
                      <span>Fake</span>
                    </div>
                  </div>

                  {/* Detection Scores */}
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}>
                        <span style={{ fontSize: '14px', color: '#D8DDE3' }}>Visual Artifacts</span>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>
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
                          transition: 'width 0.8s ease-out',
                        }}/>
                      </div>
                    </div>

                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}>
                        <span style={{ fontSize: '14px', color: '#D8DDE3' }}>Audio Inconsistency</span>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>
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
                          transition: 'width 0.8s ease-out 0.2s',
                        }}/>
                      </div>
                    </div>

                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}>
                        <span style={{ fontSize: '14px', color: '#D8DDE3' }}>Temporal Anomalies</span>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>
                          {job.temporalScore || 68}%
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
                          width: `${job.temporalScore || 68}%`,
                          height: '100%',
                          background: '#3BFFB3',
                          transition: 'width 0.8s ease-out 0.4s',
                        }}/>
                      </div>
                    </div>

                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                      }}>
                        <span style={{ fontSize: '14px', color: '#D8DDE3' }}>Face Manipulation</span>
                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>
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
                          transition: 'width 0.8s ease-out 0.6s',
                        }}/>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Evidence Sections */}
          {job.status === 'completed' && (
            <div style={{ marginTop: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Detection Evidence
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
              }}>
                <Card
                  onClick={() => navigate(`/app/jobs/${jobId}/evidence?type=frames`)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(53, 226, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎞️</div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                      Anomalous Frames
                    </h3>
                    <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '12px' }}>
                      {job.anomalousFrameCount || 24} frames detected
                    </p>
                    <div style={{ fontSize: '14px', color: '#35E2FF', fontWeight: '600' }}>
                      View Details →
                    </div>
                  </div>
                </Card>

                <Card
                  onClick={() => navigate(`/app/jobs/${jobId}/evidence?type=heatmap`)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(53, 226, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔥</div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                      Attention Heatmaps
                    </h3>
                    <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '12px' }}>
                      Neural network focus areas
                    </p>
                    <div style={{ fontSize: '14px', color: '#35E2FF', fontWeight: '600' }}>
                      View Details →
                    </div>
                  </div>
                </Card>

                <Card
                  onClick={() => navigate(`/app/jobs/${jobId}/evidence?type=audio`)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(53, 226, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎵</div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                      Audio Analysis
                    </h3>
                    <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '12px' }}>
                      Spectrogram & frequency data
                    </p>
                    <div style={{ fontSize: '14px', color: '#35E2FF', fontWeight: '600' }}>
                      View Details →
                    </div>
                  </div>
                </Card>

                <Card
                  onClick={() => navigate(`/app/jobs/${jobId}/evidence?type=faces`)}
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(53, 226, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>👤</div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                      Face Detections
                    </h3>
                    <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '12px' }}>
                      {job.faceCount || 3} unique faces found
                    </p>
                    <div style={{ fontSize: '14px', color: '#35E2FF', fontWeight: '600' }}>
                      View Details →
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Processing Status */}
          {job.status !== 'completed' && job.status !== 'failed' && (
            <Card style={{ marginTop: '24px' }}>
              <div style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  border: '6px solid rgba(42, 107, 255, 0.2)',
                  borderTopColor: '#35E2FF',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 24px',
                }}/>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                  {job.status === 'preprocessing' && 'Preprocessing Video...'}
                  {job.status === 'analyzing' && 'Running AI Analysis...'}
                  {job.status === 'pending' && 'Job Queued'}
                </h3>
                <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '24px' }}>
                  {job.status === 'preprocessing' && 'Extracting frames and audio from video'}
                  {job.status === 'analyzing' && 'Multimodal deepfake detection in progress'}
                  {job.status === 'pending' && 'Waiting for available processing slot'}
                </p>
                <div style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: '8px',
                  background: 'rgba(42, 107, 255, 0.2)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  margin: '0 auto',
                }}>
                  <div style={{
                    width: `${job.progress || 45}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #2A6BFF 0%, #35E2FF 100%)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}/>
                </div>
                <div style={{ fontSize: '14px', color: '#D8DDE3', marginTop: '12px' }}>
                  {job.progress || 45}% Complete
                </div>
                <style>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                  @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                  }
                `}</style>
              </div>
            </Card>
          )}

          {/* Job Metadata */}
          <Card style={{ marginTop: '24px' }}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Job Metadata
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Job ID</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', fontFamily: 'monospace' }}>
                    {jobId}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Duration</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                    {job.duration || '3:24'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Resolution</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                    {job.resolution || '1920x1080'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>File Size</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                    {job.fileSize || '45.2 MB'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Processing Time</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                    {job.processingTime || '2m 34s'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Model Version</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                    {job.modelVersion || 'v2.5.1'}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
