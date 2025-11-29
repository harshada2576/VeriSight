import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import UploadWidget from '../../components/upload/UploadWidget';
import Card from '../../components/ui/Card';

const Upload = () => {
  const navigate = useNavigate();
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleUploadComplete = (jobId) => {
    setUploadSuccess(jobId);
    // Redirect to job detail after 2 seconds
    setTimeout(() => {
      navigate(`/app/jobs/${jobId}`);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #35E2FF 0%, #2A6BFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Upload Video
            </h1>
            <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
              Submit a video file or URL for AI-powered deepfake analysis
            </p>
          </div>

          {/* Success Message */}
          {uploadSuccess && (
            <div style={{
              padding: '20px',
              marginBottom: '24px',
              background: 'rgba(59, 255, 179, 0.1)',
              border: '1px solid #3BFFB3',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideDown 0.3s ease-out',
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: '#3BFFB3',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}>
                ✓
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#3BFFB3', marginBottom: '4px' }}>
                  Upload Successful!
                </div>
                <div style={{ fontSize: '14px', color: '#D8DDE3' }}>
                  Job ID: {uploadSuccess} • Redirecting to job details...
                </div>
              </div>
              <style>{`
                @keyframes slideDown {
                  from {
                    opacity: 0;
                    transform: translateY(-20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </div>
          )}

          {/* Upload Widget */}
          <div style={{ marginBottom: '32px' }}>
            <UploadWidget onUploadComplete={handleUploadComplete} />
          </div>

          {/* Information Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginTop: '32px',
          }}>
            <Card>
              <div style={{ padding: '24px' }}>
                <div style={{
                  fontSize: '40px',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}>
                  🎯
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  textAlign: 'center',
                }}>
                  Multimodal Detection
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#D8DDE3',
                  lineHeight: '1.6',
                  textAlign: 'center',
                }}>
                  Our AI analyzes visual artifacts, audio inconsistencies, and temporal patterns simultaneously for comprehensive deepfake detection.
                </p>
              </div>
            </Card>

            <Card>
              <div style={{ padding: '24px' }}>
                <div style={{
                  fontSize: '40px',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}>
                  ⚡
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  textAlign: 'center',
                }}>
                  Fast Processing
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#D8DDE3',
                  lineHeight: '1.6',
                  textAlign: 'center',
                }}>
                  Average analysis time of 3-5 minutes per video using our optimized AI pipeline and cloud infrastructure.
                </p>
              </div>
            </Card>

            <Card>
              <div style={{ padding: '24px' }}>
                <div style={{
                  fontSize: '40px',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}>
                  🔒
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  textAlign: 'center',
                }}>
                  Secure & Private
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#D8DDE3',
                  lineHeight: '1.6',
                  textAlign: 'center',
                }}>
                  Your videos are encrypted during transit and storage, with automatic deletion after analysis completion.
                </p>
              </div>
            </Card>
          </div>

          {/* Guidelines */}
          <Card style={{ marginTop: '32px' }}>
            <div style={{ padding: '24px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}>
                Upload Guidelines
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'rgba(42, 107, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>
                      Supported Formats
                    </div>
                    <div style={{ fontSize: '14px', color: '#D8DDE3' }}>
                      MP4, AVI, MOV, MKV, WebM (H.264, H.265, VP9 codecs)
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'rgba(42, 107, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>
                      File Size Limit
                    </div>
                    <div style={{ fontSize: '14px', color: '#D8DDE3' }}>
                      Maximum 500MB per file • Larger files via URL recommended
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'rgba(42, 107, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>
                      Video Requirements
                    </div>
                    <div style={{ fontSize: '14px', color: '#D8DDE3' }}>
                      Minimum 480p resolution • At least 1 second duration • Clear facial visibility preferred
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'rgba(42, 107, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>
                      URL Uploads
                    </div>
                    <div style={{ fontSize: '14px', color: '#D8DDE3' }}>
                      Direct video URLs supported • YouTube, Vimeo, and other platforms automatically detected
                    </div>
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

export default Upload;
