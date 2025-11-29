import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ReviewerActions = ({ jobId, onSubmit }) => {
  const [decision, setDecision] = useState(null); // 'fake' | 'real' | null
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!decision) {
      alert('Please select a decision');
      return;
    }

    setIsSubmitting(true);
    try {
      // Backend integration point: Submit review decision
      // await fetch(`/api/review/${jobId}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     decision,
      //     notes,
      //     reviewedAt: new Date().toISOString(),
      //   }),
      // });
      
      if (onSubmit) {
        await onSubmit({ decision, notes });
      }
    } catch (error) {
      console.error('Review submission failed:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <div style={{ padding: '24px' }}>
        <h3 style={{
          color: '#FFFFFF',
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '20px',
        }}>
          Human Reviewer Decision
        </h3>

        {/* Decision Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px',
        }}>
          <button
            onClick={() => setDecision('fake')}
            disabled={isSubmitting}
            style={{
              padding: '24px',
              background: decision === 'fake' ? 'rgba(255, 68, 68, 0.2)' : 'transparent',
              border: decision === 'fake' ? '2px solid #FF4444' : '1px solid rgba(42, 107, 255, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (decision !== 'fake') {
                e.currentTarget.style.borderColor = '#FF4444';
                e.currentTarget.style.background = 'rgba(255, 68, 68, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (decision !== 'fake') {
                e.currentTarget.style.borderColor = 'rgba(42, 107, 255, 0.3)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 16px',
              background: decision === 'fake' ? '#FF4444' : 'rgba(255, 68, 68, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={decision === 'fake' ? '#FFFFFF' : '#FF4444'}>
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2" strokeLinecap="round"/>
                <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div style={{
              color: decision === 'fake' ? '#FF4444' : '#FFFFFF',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '8px',
            }}>
              Approve as FAKE
            </div>
            <p style={{
              color: '#D8DDE3',
              fontSize: '13px',
              margin: 0,
            }}>
              Video contains deepfake manipulation
            </p>
          </button>

          <button
            onClick={() => setDecision('real')}
            disabled={isSubmitting}
            style={{
              padding: '24px',
              background: decision === 'real' ? 'rgba(59, 255, 179, 0.2)' : 'transparent',
              border: decision === 'real' ? '2px solid #3BFFB3' : '1px solid rgba(42, 107, 255, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (decision !== 'real') {
                e.currentTarget.style.borderColor = '#3BFFB3';
                e.currentTarget.style.background = 'rgba(59, 255, 179, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (decision !== 'real') {
                e.currentTarget.style.borderColor = 'rgba(42, 107, 255, 0.3)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 16px',
              background: decision === 'real' ? '#3BFFB3' : 'rgba(59, 255, 179, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={decision === 'real' ? '#0A1E3F' : '#3BFFB3'}>
                <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{
              color: decision === 'real' ? '#3BFFB3' : '#FFFFFF',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '8px',
            }}>
              Approve as REAL
            </div>
            <p style={{
              color: '#D8DDE3',
              fontSize: '13px',
              margin: 0,
            }}>
              Video appears authentic
            </p>
          </button>
        </div>

        {/* Review Notes */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            color: '#D8DDE3',
            fontSize: '14px',
            fontWeight: '500',
            display: 'block',
            marginBottom: '8px',
          }}>
            Review Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any observations, concerns, or additional context..."
            disabled={isSubmitting}
            rows={4}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(42, 107, 255, 0.05)',
              border: '1px solid rgba(42, 107, 255, 0.3)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical',
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#35E2FF';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(53, 226, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(42, 107, 255, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Submit Button */}
        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          disabled={!decision || isSubmitting}
          style={{ width: '100%' }}
        >
          Submit Review Decision
        </Button>

        {/* Info */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: 'rgba(42, 107, 255, 0.05)',
          border: '1px solid rgba(42, 107, 255, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#35E2FF" style={{ flexShrink: 0, marginTop: '2px' }}>
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p style={{
            color: '#D8DDE3',
            fontSize: '12px',
            lineHeight: '1.6',
            margin: 0,
          }}>
            Your review decision will override the AI analysis and be included in the final verification pack. This decision is final and will be cryptographically signed.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ReviewerActions;
