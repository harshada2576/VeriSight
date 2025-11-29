import { useState, useRef } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FileDropzone from './FileDropzone';

const UploadWidget = ({ onUpload, isLoading = false }) => {
  const [uploadMethod, setUploadMethod] = useState('dropzone'); // 'dropzone' | 'url'
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      const validTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid video file (MP4, MOV, AVI, WebM)');
        return;
      }
      
      // Validate file size (max 500MB)
      const maxSize = 500 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size must be less than 500MB');
        return;
      }
      
      // Backend integration point: Upload file
      if (onUpload) {
        const formData = new FormData();
        formData.append('video', file);
        await onUpload({ type: 'file', data: formData });
      }
    }
  };

  const handleUrlSubmit = async () => {
    // Validate URL
    try {
      new URL(url);
    } catch (e) {
      setUrlError('Please enter a valid URL');
      return;
    }
    
    // Backend integration point: Submit URL for processing
    if (onUpload) {
      await onUpload({ type: 'url', data: url });
    }
  };

  return (
    <Card>
      <div style={{ padding: '24px' }}>
        <h2 style={{
          color: '#FFFFFF',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '8px',
        }}>
          Upload Video for Analysis
        </h2>
        <p style={{
          color: '#D8DDE3',
          fontSize: '14px',
          marginBottom: '24px',
        }}>
          Choose how you'd like to submit your video for deepfake detection
        </p>

        {/* Method Toggle */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
        }}>
          <button
            onClick={() => setUploadMethod('dropzone')}
            style={{
              flex: 1,
              padding: '12px 24px',
              background: uploadMethod === 'dropzone' ? 'rgba(42, 107, 255, 0.2)' : 'transparent',
              border: uploadMethod === 'dropzone' ? '1px solid #35E2FF' : '1px solid rgba(42, 107, 255, 0.3)',
              borderRadius: '8px',
              color: uploadMethod === 'dropzone' ? '#35E2FF' : '#D8DDE3',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            disabled={isLoading}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload File
            </div>
          </button>
          <button
            onClick={() => setUploadMethod('url')}
            style={{
              flex: 1,
              padding: '12px 24px',
              background: uploadMethod === 'url' ? 'rgba(42, 107, 255, 0.2)' : 'transparent',
              border: uploadMethod === 'url' ? '1px solid #35E2FF' : '1px solid rgba(42, 107, 255, 0.3)',
              borderRadius: '8px',
              color: uploadMethod === 'url' ? '#35E2FF' : '#D8DDE3',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            disabled={isLoading}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              From URL
            </div>
          </button>
        </div>

        {/* Upload Interface */}
        {uploadMethod === 'dropzone' ? (
          <FileDropzone
            onFilesSelected={handleFileSelect}
            accept="video/*"
            maxSize={500 * 1024 * 1024}
            disabled={isLoading}
          />
        ) : (
          <div>
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setUrlError('');
              }}
              placeholder="https://example.com/video.mp4"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(42, 107, 255, 0.05)',
                border: `1px solid ${urlError ? '#FF4444' : 'rgba(42, 107, 255, 0.3)'}`,
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '14px',
                marginBottom: '12px',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                if (!urlError) {
                  e.currentTarget.style.borderColor = '#35E2FF';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(53, 226, 255, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = urlError ? '#FF4444' : 'rgba(42, 107, 255, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {urlError && (
              <p style={{
                color: '#FF4444',
                fontSize: '12px',
                marginBottom: '12px',
              }}>
                {urlError}
              </p>
            )}
            <Button
              variant="primary"
              onClick={handleUrlSubmit}
              isLoading={isLoading}
              disabled={!url || isLoading}
              style={{ width: '100%' }}
            >
              Analyze Video from URL
            </Button>
          </div>
        )}

        {/* Info */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'rgba(42, 107, 255, 0.05)',
          border: '1px solid rgba(42, 107, 255, 0.2)',
          borderRadius: '8px',
        }}>
          <h4 style={{
            color: '#35E2FF',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
              <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Supported Formats
          </h4>
          <ul style={{
            color: '#D8DDE3',
            fontSize: '12px',
            lineHeight: '1.6',
            paddingLeft: '20px',
            margin: 0,
          }}>
            <li>Video formats: MP4, MOV, AVI, WebM</li>
            <li>Maximum file size: 500MB</li>
            <li>Recommended duration: 5 seconds to 10 minutes</li>
            <li>Minimum resolution: 480p</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default UploadWidget;
