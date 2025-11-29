import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';

const About = () => {
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
            About VeriSight
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#D8DDE3',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
          }}>
            Pioneering the future of media authenticity through AI-powered deepfake detection
          </p>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Mission */}
          <Card style={{ marginBottom: '32px' }}>
            <div style={{ padding: '48px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎯</div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}>
                  Our Mission
                </h2>
              </div>
              <p style={{
                fontSize: '18px',
                color: '#D8DDE3',
                lineHeight: '1.8',
                textAlign: 'center',
                maxWidth: '900px',
                margin: '0 auto',
              }}>
                VeriSight was founded with a singular vision: to combat the rising threat of deepfake technology 
                and synthetic media manipulation. We believe in a world where digital content can be trusted, 
                verified, and authenticated. Our advanced AI systems analyze videos through multiple modalities—visual, 
                audio, and temporal patterns—to detect even the most sophisticated forgeries.
              </p>
            </div>
          </Card>

          {/* Values */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}>
            <Card>
              <div style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '12px' }}>
                  Security First
                </h3>
                <p style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.6' }}>
                  Your data is encrypted end-to-end with military-grade security protocols. We never share 
                  or sell your information.
                </p>
              </div>
            </Card>

            <Card>
              <div style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '12px' }}>
                  Innovation
                </h3>
                <p style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.6' }}>
                  Constantly evolving our AI models to stay ahead of emerging deepfake techniques 
                  and synthetic media threats.
                </p>
              </div>
            </Card>

            <Card>
              <div style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '12px' }}>
                  Transparency
                </h3>
                <p style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.6' }}>
                  Every analysis comes with detailed evidence, cryptographic verification, 
                  and explainable AI results.
                </p>
              </div>
            </Card>
          </div>

          {/* Team Section */}
          <Card style={{ marginBottom: '32px' }}>
            <div style={{ padding: '48px' }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: '32px',
              }}>
                Led by Experts
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '32px',
              }}>
                {[
                  {
                    role: 'AI Research',
                    icon: '🧠',
                    description: 'PhDs from MIT, Stanford specializing in computer vision and deep learning',
                  },
                  {
                    role: 'Cybersecurity',
                    icon: '🛡️',
                    description: 'Former NSA and industry veterans with 20+ years of experience',
                  },
                  {
                    role: 'Media Forensics',
                    icon: '🔍',
                    description: 'Certified forensic analysts and expert witnesses',
                  },
                  {
                    role: 'Engineering',
                    icon: '⚙️',
                    description: 'Full-stack developers from top tech companies',
                  },
                ].map((item, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>{item.icon}</div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#35E2FF', marginBottom: '8px' }}>
                      {item.role}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card style={{ marginBottom: '32px' }}>
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}>
                Ready to Verify Your Content?
              </h2>
              <p style={{ fontSize: '16px', color: '#D8DDE3', marginBottom: '32px' }}>
                Join thousands of organizations using VeriSight to ensure media authenticity
              </p>
              <Link
                to="/app/upload"
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
                Upload Video Now
              </Link>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
