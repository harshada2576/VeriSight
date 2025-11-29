import Card from '../ui/Card';

const SignatureBlock = ({ signature }) => {
  if (!signature) {
    return (
      <Card>
        <div style={{ padding: '48px 24px', textAlign: 'center' }}>
          <p style={{ color: '#D8DDE3', fontSize: '14px' }}>
            No signature data available
          </p>
        </div>
      </Card>
    );
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  return (
    <Card>
      <div style={{ padding: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(42, 107, 255, 0.5)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 style={{
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: '600',
              margin: 0,
            }}>
              Cryptographic Signature
            </h3>
            <p style={{
              color: '#D8DDE3',
              fontSize: '13px',
              margin: 0,
            }}>
              RSA-2048 Digital Signature
            </p>
          </div>
        </div>

        {/* Signature Status */}
        <div style={{
          padding: '16px',
          background: signature.verified ? 'rgba(59, 255, 179, 0.1)' : 'rgba(255, 68, 68, 0.1)',
          border: `1px solid ${signature.verified ? '#3BFFB3' : '#FF4444'}`,
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px',
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: signature.verified ? '#3BFFB3' : '#FF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A1E3F',
            }}>
              {signature.verified ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <span style={{
              color: signature.verified ? '#3BFFB3' : '#FF4444',
              fontSize: '14px',
              fontWeight: '600',
            }}>
              {signature.verified ? 'Signature Verified' : 'Signature Invalid'}
            </span>
          </div>
          <p style={{
            color: '#D8DDE3',
            fontSize: '12px',
            marginLeft: '36px',
            margin: 0,
          }}>
            {signature.verified 
              ? 'This analysis result has been cryptographically signed and verified.'
              : 'Warning: Signature verification failed. Data may have been tampered with.'}
          </p>
        </div>

        {/* Signature Details */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            color: '#D8DDE3',
            fontSize: '12px',
            fontWeight: '500',
            display: 'block',
            marginBottom: '8px',
          }}>
            Algorithm
          </label>
          <div style={{
            padding: '12px',
            background: 'rgba(42, 107, 255, 0.05)',
            border: '1px solid rgba(42, 107, 255, 0.2)',
            borderRadius: '6px',
            color: '#FFFFFF',
            fontSize: '13px',
            fontFamily: 'monospace',
          }}>
            {signature.algorithm || 'RSA-SHA256'}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}>
            <label style={{
              color: '#D8DDE3',
              fontSize: '12px',
              fontWeight: '500',
            }}>
              Public Key Fingerprint
            </label>
            <button
              onClick={() => copyToClipboard(signature.fingerprint)}
              style={{
                padding: '4px 8px',
                background: 'transparent',
                border: '1px solid rgba(42, 107, 255, 0.3)',
                borderRadius: '4px',
                color: '#35E2FF',
                fontSize: '11px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2"/>
              </svg>
              Copy
            </button>
          </div>
          <div style={{
            padding: '12px',
            background: 'rgba(42, 107, 255, 0.05)',
            border: '1px solid rgba(42, 107, 255, 0.2)',
            borderRadius: '6px',
            color: '#35E2FF',
            fontSize: '11px',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
          }}>
            {signature.fingerprint || 'SHA256:abc123...xyz789'}
          </div>
        </div>

        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}>
            <label style={{
              color: '#D8DDE3',
              fontSize: '12px',
              fontWeight: '500',
            }}>
              Signature Hash
            </label>
            <button
              onClick={() => copyToClipboard(signature.hash)}
              style={{
                padding: '4px 8px',
                background: 'transparent',
                border: '1px solid rgba(42, 107, 255, 0.3)',
                borderRadius: '4px',
                color: '#35E2FF',
                fontSize: '11px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2"/>
              </svg>
              Copy
            </button>
          </div>
          <div style={{
            padding: '12px',
            background: 'rgba(42, 107, 255, 0.05)',
            border: '1px solid rgba(42, 107, 255, 0.2)',
            borderRadius: '6px',
            color: '#35E2FF',
            fontSize: '11px',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            maxHeight: '120px',
            overflowY: 'auto',
          }}>
            {signature.hash || 'a1b2c3d4e5f6...'}
          </div>
        </div>

        {signature.timestamp && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            background: 'rgba(42, 107, 255, 0.05)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#D8DDE3',
            fontSize: '12px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
            </svg>
            Signed on {new Date(signature.timestamp).toLocaleString()}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SignatureBlock;
