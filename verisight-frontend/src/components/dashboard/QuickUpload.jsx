import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const QuickUpload = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleQuickUpload = async (file) => {
    setIsUploading(true);
    try {
      if (onUpload) {
        await onUpload(file);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card style={{
      background: 'linear-gradient(135deg, rgba(42, 107, 255, 0.15) 0%, rgba(53, 226, 255, 0.05) 100%)',
      border: '1px solid rgba(42, 107, 255, 0.3)',
    }}>
      <div style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3 style={{
            color: '#FFFFFF',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(42, 107, 255, 0.5)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            Quick Upload
          </h3>
          <p style={{
            color: '#D8DDE3',
            fontSize: '14px',
            lineHeight: '1.6',
          }}>
            Analyze a video instantly with our AI-powered detection system
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
        }}>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/app/upload'}
            isLoading={isUploading}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload Video
            </div>
          </Button>
        </div>
      </div>

      {/* Animated gradient border effect */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #35E2FF, transparent)',
        animation: 'scan 3s linear infinite',
      }}/>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </Card>
  );
};

export default QuickUpload;
