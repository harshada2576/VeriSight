import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';

const HowItWorks = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <main style={{ flex: 1, padding: '32px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px', paddingTop: '32px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #35E2FF 0%, #2A6BFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}>
            How VeriSight Works
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#D8DDE3',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Advanced AI-powered deepfake detection through multimodal analysis
          </p>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Process Steps */}
          <div style={{ display: 'grid', gap: '32px', marginBottom: '64px' }}>
            {[
              {
                step: '1',
                title: 'Upload Your Video',
                icon: '📤',
                description: 'Upload video files up to 500MB or submit a URL from YouTube, Vimeo, or other platforms. Our system supports all major video formats including MP4, AVI, MOV, and WebM.',
                features: ['Drag & drop interface', 'URL submission', 'Batch processing', 'Automatic format detection'],
              },
              {
                step: '2',
                title: 'Preprocessing & Extraction',
                icon: '⚙️',
                description: 'Our pipeline extracts frames at optimal intervals, isolates audio tracks, and detects faces. This creates a comprehensive dataset for multimodal analysis.',
                features: ['Frame extraction (1-30 FPS)', 'Audio separation', 'Face detection & tracking', 'Metadata extraction'],
              },
              {
                step: '3',
                title: 'AI Analysis - Visual',
                icon: '👁️',
                description: 'Deep neural networks scan each frame for visual artifacts, inconsistencies, blending errors, and unnatural textures common in deepfakes.',
                features: ['GAN artifact detection', 'Facial boundary analysis', 'Compression inconsistencies', 'Lighting anomalies'],
              },
              {
                step: '4',
                title: 'AI Analysis - Audio',
                icon: '🎵',
                description: 'Spectral analysis detects voice cloning, audio splicing, and lip-sync mismatches using advanced acoustic models.',
                features: ['Voice clone detection', 'Lip-sync validation', 'Audio splicing detection', 'Frequency analysis'],
              },
              {
                step: '5',
                title: 'Temporal Analysis',
                icon: '⏱️',
                description: 'Frame-to-frame consistency checks identify temporal anomalies, unnatural movements, and discontinuities across the video timeline.',
                features: ['Motion tracking', 'Optical flow analysis', 'Frame consistency', 'Temporal artifacts'],
              },
              {
                step: '6',
                title: 'Results & Verification',
                icon: '📊',
                description: 'Receive a comprehensive report with confidence scores, evidence packages, and cryptographic verification for legal admissibility.',
                features: ['Confidence scoring', 'Evidence packages', 'RSA-2048 signatures', 'PDF reports'],
              },
            ].map((step, idx) => (
              <Card key={idx}>
                <div style={{ padding: '32px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '24px',
                    flexWrap: 'wrap',
                  }}>
                    {/* Step Number */}
                    <div style={{
                      minWidth: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#FFFFFF',
                      boxShadow: '0 8px 24px rgba(53, 226, 255, 0.3)',
                    }}>
                      {step.step}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '32px' }}>{step.icon}</span>
                        <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#FFFFFF' }}>
                          {step.title}
                        </h3>
                      </div>
                      <p style={{
                        fontSize: '16px',
                        color: '#D8DDE3',
                        lineHeight: '1.6',
                        marginBottom: '20px',
                      }}>
                        {step.description}
                      </p>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '12px',
                      }}>
                        {step.features.map((feature, fidx) => (
                          <div
                            key={fidx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '14px',
                              color: '#D8DDE3',
                            }}
                          >
                            <span style={{ color: '#3BFFB3' }}>✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Technology Stack */}
          <Card style={{ marginBottom: '32px' }}>
            <div style={{ padding: '48px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: '32px',
              }}>
                Powered by Advanced Technology
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
              }}>
                {[
                  { title: 'Deep Learning', description: 'Convolutional Neural Networks trained on millions of authentic and synthetic videos' },
                  { title: 'Computer Vision', description: 'State-of-the-art face detection, tracking, and landmark analysis algorithms' },
                  { title: 'Signal Processing', description: 'Advanced spectral analysis for audio authenticity verification' },
                  { title: 'Blockchain', description: 'Immutable evidence storage with cryptographic signatures' },
                ].map((tech, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '24px',
                      background: '#0A1E3F',
                      borderRadius: '12px',
                      border: '1px solid rgba(53, 226, 255, 0.3)',
                    }}
                  >
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#35E2FF',
                      marginBottom: '12px',
                    }}>
                      {tech.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.6' }}>
                      {tech.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card>
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}>
                Ready to Try It Out?
              </h2>
              <p style={{ fontSize: '16px', color: '#D8DDE3', marginBottom: '32px' }}>
                Start analyzing videos in minutes with our free trial
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  to="/register"
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  Get Started Free
                </Link>
                <Link
                  to="/demo"
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    background: 'transparent',
                    color: '#35E2FF',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    border: '1px solid #35E2FF',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(53, 226, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  See Demo
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
