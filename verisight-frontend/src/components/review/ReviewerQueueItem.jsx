import Card from '../ui/Card';

const ReviewerQueueItem = ({ job, onSelect }) => {
  const getLabelColor = (label) => {
    if (label === 'FAKE') return '#FF4444';
    if (label === 'REAL') return '#3BFFB3';
    return '#D8DDE3';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card
      onClick={onSelect}
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '16px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateX(4px)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(42, 107, 255, 0.3)';
        e.currentTarget.style.borderColor = '#35E2FF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(42, 107, 255, 0.3)';
      }}
    >
      <div style={{
        padding: '20px',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start',
      }}>
        {/* Video Thumbnail */}
        <div style={{
          width: '160px',
          height: '90px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(42, 107, 255, 0.3)',
          flexShrink: 0,
          background: `url(${job.thumbnail || 'https://via.placeholder.com/160x90?text=Video'}) center/cover`,
        }}>
          {job.needsReview && (
            <div style={{
              display: 'inline-block',
              margin: '8px',
              padding: '4px 8px',
              background: 'rgba(255, 165, 0, 0.9)',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '600',
              color: '#0A1E3F',
            }}>
              NEEDS REVIEW
            </div>
          )}
        </div>

        {/* Job Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
          }}>
            <div>
              <h3 style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '4px',
              }}>
                {job.filename || `Job #${job.id}`}
              </h3>
              <p style={{
                color: '#D8DDE3',
                fontSize: '12px',
                margin: 0,
              }}>
                Submitted: {formatDate(job.created_at)}
              </p>
            </div>
            
            {job.aiLabel && (
              <span style={{
                padding: '6px 12px',
                background: `${getLabelColor(job.aiLabel)}20`,
                border: `1px solid ${getLabelColor(job.aiLabel)}`,
                borderRadius: '6px',
                color: getLabelColor(job.aiLabel),
                fontSize: '12px',
                fontWeight: '600',
              }}>
                AI: {job.aiLabel}
              </span>
            )}
          </div>

          {/* AI Scores */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '12px',
          }}>
            <div>
              <label style={{
                color: '#D8DDE3',
                fontSize: '11px',
                display: 'block',
                marginBottom: '4px',
              }}>
                Overall Confidence
              </label>
              <div style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '600',
              }}>
                {job.confidence}%
              </div>
            </div>
            <div>
              <label style={{
                color: '#D8DDE3',
                fontSize: '11px',
                display: 'block',
                marginBottom: '4px',
              }}>
                Visual Score
              </label>
              <div style={{
                color: '#35E2FF',
                fontSize: '16px',
                fontWeight: '600',
              }}>
                {job.visualScore}%
              </div>
            </div>
            <div>
              <label style={{
                color: '#D8DDE3',
                fontSize: '11px',
                display: 'block',
                marginBottom: '4px',
              }}>
                Audio Score
              </label>
              <div style={{
                color: '#35E2FF',
                fontSize: '16px',
                fontWeight: '600',
              }}>
                {job.audioScore}%
              </div>
            </div>
          </div>

          {/* Reasoning */}
          {job.reasoning && (
            <p style={{
              color: '#D8DDE3',
              fontSize: '13px',
              lineHeight: '1.6',
              margin: 0,
              padding: '12px',
              background: 'rgba(42, 107, 255, 0.05)',
              borderRadius: '6px',
              borderLeft: '3px solid #2A6BFF',
            }}>
              {job.reasoning}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReviewerQueueItem;
