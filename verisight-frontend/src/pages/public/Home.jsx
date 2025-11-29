import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Auto-Analysis',
      description: 'Fully autonomous AI pipeline processes videos without human intervention',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Multimodal Detection',
      description: 'Combines visual, audio, and temporal analysis for comprehensive deepfake detection',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/>
        </svg>
      ),
      title: 'Cryptographic Pack',
      description: 'Every analysis is cryptographically signed with RSA-2048 for tamper-proof verification',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth="2"/>
          <circle cx="9" cy="7" r="4" strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeWidth="2"/>
        </svg>
      ),
      title: 'Human Review Panel',
      description: 'Expert reviewers can validate AI decisions for critical use cases',
    },
  ];

  const steps = [
    { number: '01', title: 'Upload Video', description: 'Drag & drop or paste URL' },
    { number: '02', title: 'AI Analysis', description: 'Visual, audio & temporal processing' },
    { number: '03', title: 'Decision Engine', description: 'Multimodal fusion determines authenticity' },
    { number: '04', title: 'Verification Pack', description: 'Cryptographically signed results' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #0C0C0C 0%, #0A1E3F 100%)',
    }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        padding: '80px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}>
          {/* Left: Text Content */}
          <div>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(42, 107, 255, 0.1)',
              border: '1px solid rgba(53, 226, 255, 0.3)',
              borderRadius: '24px',
              marginBottom: '24px',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '14px',
                fontWeight: '600',
              }}>
                ⚡ Powered by Agentic AI
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: '700',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #35E2FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.2',
            }}>
              AI Fake Video Detection System
            </h1>

            <p style={{
              fontSize: '18px',
              color: '#D8DDE3',
              lineHeight: '1.8',
              marginBottom: '32px',
            }}>
              Autonomous agentic pipeline for deepfake detection with visual, audio, and temporal analysis. Get cryptographically verified results in minutes.
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              <Button
                variant="primary"
                onClick={() => navigate('/login')}
                style={{
                  padding: '16px 32px',
                  fontSize: '16px',
                }}
              >
                Login to Analyze
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/demo')}
                style={{
                  padding: '16px 32px',
                  fontSize: '16px',
                }}
              >
                Try Demo
              </Button>
            </div>
          </div>

          {/* Right: Scanning Ring Visual */}
          <div style={{
            position: 'relative',
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Scanning Rings */}
            {[1, 2, 3].map((ring) => (
              <div
                key={ring}
                style={{
                  position: 'absolute',
                  width: `${ring * 33}%`,
                  height: `${ring * 33}%`,
                  border: `2px solid rgba(53, 226, 255, ${0.4 / ring})`,
                  borderRadius: '50%',
                  animation: `pulse-ring ${3 * ring}s ease-in-out infinite`,
                }}
              />
            ))}

            {/* Center Icon */}
            <div style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(53, 226, 255, 0.6)',
              position: 'relative',
              zIndex: 1,
            }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Why VeriSight */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(10, 30, 63, 0.3)',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '16px',
          }}>
            Why VeriSight?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#D8DDE3',
            textAlign: 'center',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px',
          }}>
            The only deepfake detection platform with end-to-end autonomous analysis and cryptographic verification
          </p>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {features.map((feature, index) => (
              <Card
                key={index}
                style={{
                  padding: '32px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(42, 107, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'rgba(42, 107, 255, 0.2)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#35E2FF',
                  marginBottom: '20px',
                  border: '1px solid rgba(53, 226, 255, 0.3)',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#D8DDE3',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        padding: '80px 24px',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            How It Works
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  padding: '32px 24px',
                  background: 'rgba(42, 107, 255, 0.05)',
                  border: '1px solid rgba(42, 107, 255, 0.3)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '16px',
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#D8DDE3',
                  margin: 0,
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '48px',
          }}>
            <Button
              variant="secondary"
              onClick={() => navigate('/how-it-works')}
            >
              Learn More About Our Process
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
