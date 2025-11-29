import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';

const Terms = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #35E2FF 0%, #2A6BFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '48px' }}>
            Last Updated: November 29, 2025
          </p>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                1. Acceptance of Terms
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '16px' }}>
                By accessing and using VeriSight's services, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                2. Service Description
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                VeriSight provides AI-powered deepfake detection and video authentication services. Our service includes:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li>Video analysis for manipulation detection</li>
                <li>Audio authenticity verification</li>
                <li>Cryptographic verification packages</li>
                <li>Forensic evidence reports</li>
                <li>API access for automated processing</li>
              </ul>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                3. User Obligations
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                You agree to:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li>Provide accurate registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not upload content that violates copyright or privacy laws</li>
                <li>Not attempt to reverse engineer or circumvent our security measures</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not abuse, harass, or harm others through our platform</li>
              </ul>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                4. Data and Privacy
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                Your uploaded videos are:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '16px' }}>
                <li>Encrypted during transmission and storage</li>
                <li>Processed on secure servers</li>
                <li>Retained according to your plan's retention period</li>
                <li>Deleted permanently upon request or account termination</li>
                <li>Never shared with third parties without your consent</li>
              </ul>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                See our Privacy Policy for complete details on data handling.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                5. Payment Terms
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                Subscription billing:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li>Charged monthly or annually based on your selected plan</li>
                <li>Auto-renewal unless cancelled before the next billing cycle</li>
                <li>Refunds available within 30 days of initial purchase</li>
                <li>Overage charges for exceeding plan limits</li>
                <li>Enterprise plans billed via invoice with NET-30 terms</li>
              </ul>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                6. Service Availability
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be 
                announced in advance. We are not liable for service disruptions beyond our reasonable control.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                7. Limitation of Liability
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                VeriSight's analysis provides probabilities and detection scores, not absolute certainty. While our 
                AI models are highly accurate, no detection system is 100% perfect. Users are responsible for:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li>Independently verifying critical findings</li>
                <li>Consulting legal professionals for court-related matters</li>
                <li>Understanding the limitations of AI detection technology</li>
              </ul>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                8. Intellectual Property
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                You retain all rights to your uploaded content. VeriSight retains all rights to our software, algorithms, 
                and AI models. Analysis results and reports are licensed to you for your use but remain our intellectual property.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                9. Termination
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                Either party may terminate service at any time. We may suspend or terminate accounts that violate 
                these terms, engage in abuse, or pose security risks. Upon termination, all data will be deleted 
                according to our retention policies.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                10. Changes to Terms
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                We may update these terms periodically. Significant changes will be notified via email. Continued 
                use of the service after changes constitutes acceptance of the updated terms.
              </p>
            </div>
          </Card>

          <Card>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Contact
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                For questions about these terms, contact us at:<br />
                Email: legal@verisight.ai<br />
                Address: 123 Tech Plaza, San Francisco, CA 94105
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
