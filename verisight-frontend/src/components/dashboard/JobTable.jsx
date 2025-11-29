import JobRow from './JobRow';
import Card from '../ui/Card';

const JobTable = ({ jobs = [], onJobClick }) => {
  if (jobs.length === 0) {
    return (
      <Card>
        <div style={{
          padding: '64px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            background: 'rgba(42, 107, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed rgba(42, 107, 255, 0.3)',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2A6BFF">
              <path d="M9 11l3 3L22 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 style={{
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '8px',
          }}>
            No jobs yet
          </h3>
          <p style={{
            color: '#D8DDE3',
            fontSize: '14px',
            marginBottom: '24px',
          }}>
            Upload your first video to start analyzing
          </p>
          <a
            href="/app/upload"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #2A6BFF 0%, #35E2FF 100%)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(42, 107, 255, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(42, 107, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(42, 107, 255, 0.3)';
            }}
          >
            Upload Video
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ overflow: 'hidden' }}>
      <div style={{
        overflowX: 'auto',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}>
          <thead>
            <tr style={{
              background: 'rgba(42, 107, 255, 0.1)',
              borderBottom: '2px solid rgba(42, 107, 255, 0.3)',
            }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: '#35E2FF',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Thumbnail
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: '#35E2FF',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Name
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: '#35E2FF',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Status
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: '#35E2FF',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Confidence
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: '#35E2FF',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Label
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: '#35E2FF',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                onClick={() => onJobClick && onJobClick(job)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default JobTable;
