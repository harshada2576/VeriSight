import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';

const Demo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const demoVideos = [
    { id: 1, title: 'Authentic Interview', url: 'https://example.com/authentic.mp4', isReal: true },
    { id: 2, title: 'Deepfake Example', url: 'https://example.com/fake.mp4', isReal: false },
    { id: 3, title: 'Voice Clone Test', url: 'https://example.com/voice.mp4', isReal: false },
  ];

  const handleAnalyze = async (url) => {
    setAnalyzing(true);
    setVideoUrl(url);
    
    // Simulate API call - Backend connection point
    // TODO: Replace with actual API call to POST /api/demo/analyze
    setTimeout(() => {
      const mockResult = {
        confidence: Math.random() * 100,
        verdict: Math.random() > 0.5 ? 'AUTHENTIC' : 'MANIPULATED',
        visualScore: Math.random() * 100,
        audioScore: Math.random() * 100,
        temporalScore: Math.random() * 100,
        flags: [
          'Facial boundary inconsistencies detected',
          'Audio-visual sync within normal range',
          'Temporal artifacts in frames 45-67',
        ],
      };
      setResult(mockResult);
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px', paddingTop: '32px' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #35E2FF 0%, #2A6BFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
            }}>
              Try VeriSight Demo
            </h1>
            <p style={{ fontSize: '18px', color: '#D8DDE3', maxWidth: '700px', margin: '0 auto' }}>
              Experience our AI-powered deepfake detection. Select a sample video or paste your own URL.
            </p>
          </div>

          {/* Sample Videos */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '24px', textAlign: 'center' }}>
              Sample Videos
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {demoVideos.map((video) => (
                <Card key={video.id}>
                  <div style={{ padding: '24px' }}>
                    <div style={{
                      width: '100%',
                      height: '180px',
                      background: '#0A1E3F',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(53, 226, 255, 0.3)',
                    }}>
                      <span style={{ fontSize: '64px' }}>🎥</span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '12px' }}>
                      {video.title}
                    </h3>
                    <Button
                      onClick={() => handleAnalyze(video.url)}
                      disabled={analyzing}
                      style={{ width: '100%' }}
                    >
                      Analyze Video
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Custom URL Input */}
          <Card style={{ marginBottom: '32px' }}>
            <div style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Or Paste Your Own URL
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  disabled={analyzing}
                  style={{
                    flex: 1,
                    minWidth: '300px',
                    padding: '12px 16px',
                    background: '#0A1E3F',
                    border: '1px solid rgba(53, 226, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '15px',
                  }}
                />
                <Button
                  onClick={() => handleAnalyze(videoUrl)}
                  disabled={!videoUrl || analyzing}
                >
                  Analyze
                </Button>
              </div>
              <p style={{ fontSize: '13px', color: '#666', marginTop: '12px' }}>
                Supports YouTube, Vimeo, and direct video URLs
              </p>
            </div>
          </Card>

          {/* Analysis in Progress */}
          {analyzing && (
            <Card>
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <Spinner size="large" />
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginTop: '24px', marginBottom: '12px' }}>
                  Analyzing Video...
                </h3>
                <p style={{ fontSize: '15px', color: '#D8DDE3' }}>
                  Running AI models to detect manipulation artifacts
                </p>
              </div>
            </Card>
          )}

          {/* Results */}
          {result && !analyzing && (
            <Card>
              <div style={{ padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div style={{
                    fontSize: '64px',
                    marginBottom: '16px',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}>
                    {result.verdict === 'AUTHENTIC' ? '✅' : '⚠️'}
                  </div>
                  <h2 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: result.verdict === 'AUTHENTIC' ? '#3BFFB3' : '#FF6B6B',
                    marginBottom: '8px',
                  }}>
                    {result.verdict}
                  </h2>
                  <p style={{ fontSize: '18px', color: '#D8DDE3' }}>
                    Confidence: {result.confidence.toFixed(1)}%
                  </p>
                </div>

                {/* Score Breakdown */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '20px' }}>
                    Analysis Breakdown
                  </h3>
                  {[
                    { label: 'Visual Analysis', score: result.visualScore },
                    { label: 'Audio Analysis', score: result.audioScore },
                    { label: 'Temporal Analysis', score: result.temporalScore },
                  ].map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '14px', color: '#D8DDE3' }}>{item.label}</span>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#35E2FF' }}>
                          {item.score.toFixed(1)}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#0A1E3F',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${item.score}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #2A6BFF 0%, #35E2FF 100%)',
                          transition: 'width 1s ease',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Flags */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                    Detection Flags
                  </h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {result.flags.map((flag, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '12px 16px',
                          background: '#0A1E3F',
                          border: '1px solid rgba(53, 226, 255, 0.3)',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#D8DDE3',
                        }}
                      >
                        • {flag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid rgba(53, 226, 255, 0.2)' }}>
                  <p style={{ fontSize: '15px', color: '#D8DDE3', marginBottom: '16px' }}>
                    Want detailed forensic reports and verification packs?
                  </p>
                  <Link
                    to="/register"
                    style={{
                      display: 'inline-block',
                      padding: '12px 32px',
                      background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                    }}
                  >
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {/* Limitations Notice */}
          <Card style={{ marginTop: '32px' }}>
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                <strong>Demo Limitations:</strong> This demo uses simplified analysis. Full accounts get access to 
                advanced AI models, cryptographic verification, detailed forensic reports, and legal-grade evidence packages.
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
