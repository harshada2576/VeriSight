import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import HowItWorks from './pages/public/HowItWorks';
import Pricing from './pages/public/Pricing';
import Demo from './pages/public/Demo';
import Terms from './pages/public/Terms';
import Privacy from './pages/public/Privacy';
import Cookie from './pages/public/Cookie';

// Auth Pages  
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// App Pages
import Dashboard from './pages/app/Dashboard';
import Upload from './pages/app/Upload';
import JobDetail from './pages/app/JobDetail';
import Evidence from './pages/app/Evidence';
import VerificationPack from './pages/app/VerificationPack';
import ReviewQueue from './pages/app/ReviewQueue';
import ReviewJob from './pages/app/ReviewJob';
import Settings from './pages/app/Settings';
import Billing from './pages/app/Billing';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0C0C0C',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(42, 107, 255, 0.2)',
          borderTopColor: '#35E2FF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}/>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirects if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#0C0C0C',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid rgba(42, 107, 255, 0.2)',
          borderTopColor: '#35E2FF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}/>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/app/dashboard" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/how-it-works',
    element: <HowItWorks />,
  },
  {
    path: '/pricing',
    element: <Pricing />,
  },
  {
    path: '/demo',
    element: <Demo />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/cookie-policy',
    element: <Cookie />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Navigate to="/app/dashboard" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/upload',
    element: (
      <ProtectedRoute>
        <Upload />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/jobs',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/jobs/:jobId',
    element: (
      <ProtectedRoute>
        <JobDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/jobs/:jobId/evidence',
    element: (
      <ProtectedRoute>
        <Evidence />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/jobs/:jobId/verification',
    element: (
      <ProtectedRoute>
        <VerificationPack />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/review-queue',
    element: (
      <ProtectedRoute>
        <ReviewQueue />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/review/:jobId',
    element: (
      <ProtectedRoute>
        <ReviewJob />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: '/app/billing',
    element: (
      <ProtectedRoute>
        <Billing />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
