import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts';
import {
  Login,
  Signup,
  ForgotPassword,
  VerificationCode,
  ResetPassword,
  Congratulations,
} from './pages/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/',
    element: <AuthLayout />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
