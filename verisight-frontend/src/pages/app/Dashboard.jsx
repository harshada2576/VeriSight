import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import StatsCard from '../../components/dashboard/StatsCard';
import JobTable from '../../components/dashboard/JobTable';
import QuickUpload from '../../components/dashboard/QuickUpload';
import { getDashboardStats, getAllJobs } from '../../api/jobs';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalJobs: 0,
    completedJobs: 0,
    fakesDetected: 0,
    accuracy: 0,
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Backend Integration: Fetch dashboard stats and recent jobs
      const [statsData, jobsData] = await Promise.all([
        getDashboardStats(),
        getAllJobs({ page: 1, limit: 5, sortBy: 'createdAt', order: 'desc' }),
      ]);

      setStats(statsData);
      setRecentJobs(jobsData.jobs || []);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    // Reload dashboard data after upload
    loadDashboardData();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              border: '6px solid rgba(42, 107, 255, 0.2)',
              borderTopColor: '#35E2FF',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}/>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #35E2FF 0%, #2A6BFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Dashboard
            </h1>
            <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
              Real-time overview of your video analysis operations
            </p>
          </div>

          {error && (
            <div style={{
              padding: '16px',
              marginBottom: '24px',
              background: 'rgba(255, 68, 68, 0.1)',
              border: '1px solid #FF4444',
              borderRadius: '8px',
              color: '#FF4444',
            }}>
              {error}
            </div>
          )}

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}>
            <StatsCard
              title="Total Jobs"
              value={stats.totalJobs}
              change={stats.totalJobsChange || 12.5}
              icon="📊"
            />
            <StatsCard
              title="Completed"
              value={stats.completedJobs}
              change={stats.completedJobsChange || 8.2}
              icon="✅"
            />
            <StatsCard
              title="Fakes Detected"
              value={stats.fakesDetected}
              change={stats.fakesDetectedChange || -3.1}
              icon="🚨"
            />
            <StatsCard
              title="Accuracy"
              value={`${stats.accuracy}%`}
              change={stats.accuracyChange || 2.4}
              icon="🎯"
            />
          </div>

          {/* Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px',
          }}>
            {/* Recent Jobs */}
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF' }}>
                  Recent Jobs
                </h2>
                <button
                  onClick={() => navigate('/app/jobs')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#35E2FF',
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(53, 226, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  View All →
                </button>
              </div>
              <JobTable jobs={recentJobs} />
            </div>

            {/* Quick Upload */}
            <div style={{ gridColumn: '1 / -1' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                Quick Upload
              </h2>
              <QuickUpload onUploadComplete={handleUploadComplete} />
            </div>
          </div>

          {/* System Status */}
          <div style={{
            marginTop: '32px',
            padding: '24px',
            background: '#0A1E3F',
            border: '1px solid rgba(53, 226, 255, 0.3)',
            borderRadius: '12px',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
              System Status
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '4px' }}>AI Engine</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#3BFFB3', borderRadius: '50%', boxShadow: '0 0 8px #3BFFB3' }}/>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#3BFFB3' }}>Operational</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '4px' }}>Processing Queue</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>
                  {stats.queueLength || 0} jobs
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '4px' }}>Avg. Processing Time</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF' }}>
                  {stats.avgProcessingTime || '3.2'} min
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '4px' }}>API Health</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#3BFFB3', borderRadius: '50%', boxShadow: '0 0 8px #3BFFB3' }}/>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: '#3BFFB3' }}>Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
