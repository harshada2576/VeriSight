import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '48px' }}>
            Last Updated: November 29, 2025
          </p>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                1. Information We Collect
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                We collect the following types of information:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li><strong>Account Information:</strong> Name, email, company, password (encrypted)</li>
                <li><strong>Payment Information:</strong> Credit card details (processed by Stripe, not stored by us)</li>
                <li><strong>Video Content:</strong> Uploaded videos for analysis (encrypted and time-limited)</li>
                <li><strong>Usage Data:</strong> API calls, analysis requests, feature usage patterns</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
              </ul>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                2. How We Use Your Information
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                Your information is used to:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li>Process video analysis requests</li>
                <li>Provide customer support</li>
                <li>Improve our AI models and detection algorithms</li>
                <li>Send service updates and security alerts</li>
                <li>Process billing and payments</li>
                <li>Prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                3. Data Security
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                We implement industry-standard security measures:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li><strong>Encryption:</strong> AES-256 encryption for data at rest, TLS 1.3 for transmission</li>
                <li><strong>Access Control:</strong> Role-based access with 2FA for sensitive operations</li>
                <li><strong>Infrastructure:</strong> SOC 2 Type II compliant hosting</li>
                <li><strong>Monitoring:</strong> 24/7 security monitoring and intrusion detection</li>
                <li><strong>Audits:</strong> Regular security audits and penetration testing</li>
              </ul>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                4. Data Retention
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                Retention periods vary by data type:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li><strong>Uploaded Videos:</strong> Deleted after plan-specific retention (7-90 days)</li>
                <li><strong>Analysis Results:</strong> Retained for the duration of your subscription</li>
                <li><strong>Account Data:</strong> Retained until account deletion request</li>
                <li><strong>Billing Records:</strong> Retained for 7 years per legal requirements</li>
                <li><strong>Logs:</strong> 90 days for security and troubleshooting</li>
              </ul>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                5. Data Sharing
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                We do NOT sell your data. Limited sharing occurs with:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li><strong>Service Providers:</strong> AWS (hosting), Stripe (payments), SendGrid (email)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or subpoena</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
                <li><strong>With Your Consent:</strong> Any other sharing requires explicit permission</li>
              </ul>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                6. Your Rights
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                You have the right to:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Export your data in machine-readable format</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails anytime</li>
                <li><strong>Restrict:</strong> Limit how we process your data</li>
              </ul>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginTop: '16px' }}>
                To exercise these rights, email privacy@verisight.ai
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                7. Cookies and Tracking
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                We use cookies for:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li><strong>Essential:</strong> Authentication, security, site functionality</li>
                <li><strong>Analytics:</strong> Google Analytics for usage patterns (anonymized)</li>
                <li><strong>Preferences:</strong> Theme selection, language settings</li>
              </ul>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginTop: '16px' }}>
                You can control cookies through your browser settings. See our Cookie Policy for details.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                8. International Data Transfers
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                Our servers are located in the United States. If you access our service from outside the US, your 
                data will be transferred, stored, and processed in the US. We use Standard Contractual Clauses (SCCs) 
                and other safeguards to protect international data transfers.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                9. Children's Privacy
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                Our service is not intended for users under 18. We do not knowingly collect information from children. 
                If we learn we have collected data from a child, we will delete it immediately.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                10. Changes to This Policy
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                We may update this Privacy Policy to reflect changes in our practices or legal requirements. 
                Significant changes will be notified via email. Continued use after changes indicates acceptance.
              </p>
            </div>
          </Card>

          <Card>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Contact Us
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                For privacy concerns or data requests:<br />
                Email: privacy@verisight.ai<br />
                Address: 123 Tech Plaza, San Francisco, CA 94105<br />
                Data Protection Officer: dpo@verisight.ai
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
