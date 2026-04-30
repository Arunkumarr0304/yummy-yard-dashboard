 import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthLayout, DashboardLayout } from './layouts';
import {
  Login,
  Signup,
  ForgotPassword,
  VerificationCode,
  ResetPassword,
  Congratulations,
} from './pages/auth';
import { Dashboard } from './pages/dashboard';
import { Orders } from './pages/orders';
import { Bills } from './pages/bills';
import { History } from './pages/history';
import { Products } from './pages/products';
import { Menu } from './pages/menu';
import { AccountSetting } from './pages/account-setting';
import { Reports } from './pages/reports';
import './App.css';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
);

// Auth check wrapper with loading state
const AuthCheck = ({ children, requireAuth = true }: { children: React.ReactNode; requireAuth?: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Layout wrappers with auth checks
const ProtectedLayout = () => (
  <AuthCheck requireAuth={true}>
    <DashboardLayout />
  </AuthCheck>
);

const PublicLayout = () => (
  <AuthCheck requireAuth={false}>
    <AuthLayout />
  </AuthCheck>
);

const ErrorBoundary = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2>Oops! Something went wrong</h2>
      <p>Please try refreshing the page or go back to the dashboard.</p>
      <a href="/dashboard" style={{ 
        padding: '10px 20px', 
        background: '#22c55e', 
        color: 'white', 
        textDecoration: 'none',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        Go to Dashboard
      </a>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  // Auth Routes (Public only - redirects to dashboard if logged in)
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'verification-code',
        element: <VerificationCode />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: 'congratulations',
        element: <Congratulations />,
      },
    ],
  },
  // Dashboard Routes (Protected - requires login)
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'menu',
        element: <Menu />,
      },
      {
        path: 'bills',
        element: <Bills />,
      },
      {
        path: 'history',
        element: <History />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'account-setting',
        element: <AccountSetting />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
