import { useState } from 'react';
import Button from '../ui/Button';

const PDFExportButton = ({ jobId, jobData }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Backend integration point: Call PDF generation API
      // const response = await fetch(`/api/verification/${jobId}/export-pdf`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(jobData),
      // });
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `verisight-report-${jobId}.pdf`;
      // a.click();

      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`PDF report for job #${jobId} would be downloaded`);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleExport}
      isLoading={isExporting}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {isExporting ? 'Generating PDF...' : 'Export PDF Report'}
    </Button>
  );
};

export default PDFExportButton;
