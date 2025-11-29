import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import VerificationJSONViewer from '../../components/verification/VerificationJSONViewer';
import SignatureBlock from '../../components/verification/SignatureBlock';
import PDFExportButton from '../../components/verification/PDFExportButton';
import { verificationAPI } from '../../api/verification';

const VerificationPack = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadVerificationPack();
  }, [jobId]);

  const loadVerificationPack = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Backend Integration: Fetch verification pack
      const data = await verificationAPI.getVerificationPack(jobId);
      setPack(data);
    } catch (err) {
      console.error('Failed to load verification pack:', err);
      setError(err.message || 'Failed to load verification pack');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError(null);
      
      // Backend Integration: Generate verification pack
      const data = await verificationAPI.generateVerificationPack(jobId);
      setPack(data);
    } catch (err) {
      console.error('Failed to generate verification pack:', err);
      setError(err.message || 'Failed to generate verification pack');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadJSON = async () => {
    try {
      const blob = await verificationAPI.downloadJSON(jobId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `verification-pack-${jobId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download JSON:', err);
    }
  };

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
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Jobs
            </span>
            <span style={{ color: '#D8DDE3' }}>/</span>
            <span
              onClick={() => navigate(`/app/jobs/${jobId}`)}
              style={{ color: '#35E2FF', cursor: 'pointer', transition: 'opacity 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {jobId}
            </span>
            <span style={{ color: '#D8DDE3' }}>/</span>
            <span style={{ color: '#D8DDE3' }}>Verification Pack</span>
          </div>

          {/* Header */}
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
                Cryptographic Verification Pack
              </h1>
              <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
                Tamper-proof evidence package with digital signatures
              </p>
            </div>
            {pack && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="secondary" onClick={handleDownloadJSON}>
                  📥 Download JSON
                </Button>
                <PDFExportButton jobId={jobId} />
              </div>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <Card>
              <div style={{ padding: '64px', textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  border: '6px solid rgba(42, 107, 255, 0.2)',
                  borderTopColor: '#35E2FF',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 24px',
                }} />
                <p style={{ color: '#D8DDE3' }}>Loading verification pack...</p>
                <style>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            </Card>
          ) : error || !pack ? (
            <Card>
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📜</div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '8px' }}>
                  {error ? 'Failed to Load' : 'No Verification Pack'}
                </h2>
                <p style={{ fontSize: '16px', color: '#D8DDE3', marginBottom: '24px' }}>
                  {error || 'This job does not have a verification pack yet.'}
                </p>
                <Button onClick={handleGenerate} loading={generating}>
                  Generate Verification Pack
                </Button>
              </div>
            </Card>
          ) : (
            <div style={{ display: 'grid', gap: '24px' }}>
              {/* Signature Block */}
              <SignatureBlock
                signature={pack.signature}
                verified={pack.verified}
                fingerprint={pack.fingerprint}
                hash={pack.hash}
              />

              {/* Pack Metadata */}
              <Card>
                <div style={{ padding: '24px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                    Pack Information
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Pack ID</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', fontFamily: 'monospace' }}>
                        {pack.packId || jobId}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Generated</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                        {new Date(pack.generatedAt || Date.now()).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Algorithm</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>
                        {pack.algorithm || 'RSA-2048'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#D8DDE3', marginBottom: '4px' }}>Status</div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: pack.verified ? '#3BFFB3' : '#FFA500',
                      }}>
                        {pack.verified ? 'Verified' : 'Pending'}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* JSON Viewer */}
              <VerificationJSONViewer data={pack.data || pack} />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default VerificationPack;
