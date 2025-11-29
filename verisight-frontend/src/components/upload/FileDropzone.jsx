import { useState, useRef } from 'react';

const FileDropzone = ({ onFilesSelected, accept = '*', maxSize, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      if (onFilesSelected) {
        onFilesSelected(files);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        style={{
          padding: '48px 24px',
          border: `2px dashed ${isDragging ? '#35E2FF' : 'rgba(42, 107, 255, 0.3)'}`,
          borderRadius: '12px',
          background: isDragging ? 'rgba(42, 107, 255, 0.1)' : 'rgba(42, 107, 255, 0.05)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated scanning line effect */}
        {isDragging && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #35E2FF, transparent)',
            animation: 'scan 1.5s linear infinite',
          }}/>
        )}

        <div style={{
          color: isDragging ? '#35E2FF' : '#2A6BFF',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: isDragging ? 'scale(1.1)' : 'scale(1)',
        }}>
          {getFileIcon()}
        </div>

        {selectedFile ? (
          <div>
            <p style={{
              color: '#35E2FF',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '8px',
            }}>
              {selectedFile.name}
            </p>
            <p style={{
              color: '#D8DDE3',
              fontSize: '14px',
              marginBottom: '16px',
            }}>
              {formatFileSize(selectedFile.size)}
            </p>
            <p style={{
              color: '#D8DDE3',
              fontSize: '12px',
            }}>
              Click or drag to replace
            </p>
          </div>
        ) : (
          <div>
            <p style={{
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '8px',
            }}>
              {isDragging ? 'Drop your video here' : 'Drag & drop your video here'}
            </p>
            <p style={{
              color: '#D8DDE3',
              fontSize: '14px',
              marginBottom: '16px',
            }}>
              or
            </p>
            <div style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 12px rgba(42, 107, 255, 0.3)',
              transition: 'all 0.3s ease',
            }}>
              Browse Files
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(400px); }
        }
      `}</style>
    </div>
  );
};

export default FileDropzone;
