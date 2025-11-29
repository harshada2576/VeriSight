import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';

const Cookie = () => {
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
            Cookie Policy
          </h1>
          <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '48px' }}>
            Last Updated: November 29, 2025
          </p>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                What Are Cookies?
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                Cookies are small text files stored on your device when you visit websites. They help websites 
                remember your preferences, analyze usage, and provide personalized experiences. VeriSight uses 
                cookies to enhance your experience and improve our services.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Types of Cookies We Use
              </h2>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#35E2FF', marginBottom: '12px' }}>
                  1. Essential Cookies (Required)
                </h3>
                <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '8px' }}>
                  These cookies are necessary for the website to function properly. They cannot be disabled.
                </p>
                <ul style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                  <li><code>auth_token</code> - Authentication and session management</li>
                  <li><code>csrf_token</code> - Security protection against cross-site attacks</li>
                  <li><code>session_id</code> - Maintains your logged-in state</li>
                </ul>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#35E2FF', marginBottom: '12px' }}>
                  2. Functional Cookies (Optional)
                </h3>
                <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '8px' }}>
                  These cookies remember your preferences and choices.
                </p>
                <ul style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                  <li><code>theme_preference</code> - Dark/light mode selection</li>
                  <li><code>language</code> - Language preference</li>
                  <li><code>sidebar_collapsed</code> - UI layout preferences</li>
                </ul>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#35E2FF', marginBottom: '12px' }}>
                  3. Analytics Cookies (Optional)
                </h3>
                <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '8px' }}>
                  Help us understand how visitors use our website (anonymized data).
                </p>
                <ul style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                  <li><code>_ga</code> - Google Analytics user identification (anonymized)</li>
                  <li><code>_gat</code> - Google Analytics throttling</li>
                  <li><code>_gid</code> - Google Analytics session tracking</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#35E2FF', marginBottom: '12px' }}>
                  4. Performance Cookies (Optional)
                </h3>
                <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '8px' }}>
                  Measure website performance and identify areas for improvement.
                </p>
                <ul style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                  <li><code>performance_metrics</code> - Page load times and errors</li>
                  <li><code>api_response_time</code> - Backend performance monitoring</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Third-Party Cookies
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '12px' }}>
                We use trusted third-party services that may set cookies:
              </p>
              <ul style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                <li><strong>Google Analytics:</strong> Website usage analytics (anonymized)</li>
                <li><strong>Stripe:</strong> Payment processing (only on checkout pages)</li>
                <li><strong>Cloudflare:</strong> CDN and DDoS protection</li>
              </ul>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginTop: '16px' }}>
                These services have their own privacy policies governing cookie usage.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Cookie Duration
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(53, 226, 255, 0.3)' }}>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#FFFFFF' }}>Cookie Type</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: '#FFFFFF' }}>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(53, 226, 255, 0.1)' }}>
                      <td style={{ padding: '12px', color: '#D8DDE3' }}>Session Cookies</td>
                      <td style={{ padding: '12px', color: '#D8DDE3' }}>Deleted when browser closes</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(53, 226, 255, 0.1)' }}>
                      <td style={{ padding: '12px', color: '#D8DDE3' }}>Authentication</td>
                      <td style={{ padding: '12px', color: '#D8DDE3' }}>30 days (or until logout)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(53, 226, 255, 0.1)' }}>
                      <td style={{ padding: '12px', color: '#D8DDE3' }}>Preferences</td>
                      <td style={{ padding: '12px', color: '#D8DDE3' }}>1 year</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px', color: '#D8DDE3' }}>Analytics</td>
                      <td style={{ padding: '12px', color: '#D8DDE3' }}>2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Managing Cookies
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8', marginBottom: '16px' }}>
                You can control cookies through:
              </p>
              
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#35E2FF', marginBottom: '12px' }}>
                  Browser Settings
                </h3>
                <ul style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.8', paddingLeft: '24px' }}>
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                  <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
                </ul>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#35E2FF', marginBottom: '12px' }}>
                  VeriSight Settings
                </h3>
                <p style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.8' }}>
                  Logged-in users can manage cookie preferences in Settings → Privacy → Cookie Preferences.
                </p>
              </div>

              <div style={{
                padding: '16px',
                background: '#0A1E3F',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                borderRadius: '8px',
              }}>
                <p style={{ fontSize: '14px', color: '#D8DDE3', lineHeight: '1.8', margin: 0 }}>
                  <strong>⚠️ Note:</strong> Blocking essential cookies will prevent the website from functioning properly. 
                  You may not be able to log in or use key features.
                </p>
              </div>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Do Not Track (DNT)
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                We respect browser "Do Not Track" signals. When DNT is enabled, we disable all optional analytics 
                and tracking cookies, retaining only essential cookies required for site functionality.
              </p>
            </div>
          </Card>

          <Card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Updates to This Policy
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                We may update this Cookie Policy to reflect changes in technology or legal requirements. The "Last Updated" 
                date at the top indicates the most recent revision. Continued use of our website after changes indicates 
                acceptance of the updated policy.
              </p>
            </div>
          </Card>

          <Card>
            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Contact Us
              </h2>
              <p style={{ fontSize: '15px', color: '#D8DDE3', lineHeight: '1.8' }}>
                Questions about our cookie usage?<br />
                Email: privacy@verisight.ai<br />
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

export default Cookie;
