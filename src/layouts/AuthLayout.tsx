import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../assets/LOGO.svg';
import '../styles/AuthLayout.css';

// Import different images for each page
import LoginImage from '../assets/login-Image.png';
import SignupImage from '../assets/signup-Image.png';
import ForgotPasswordImage from '../assets/forgot-password-Image.png';
import VerificationImage from '../assets/verification-Image.png';
import ResetPasswordImage from '../assets/reset-password-Image.png';
import CongratulationsImage from '../assets/congratulations-Image.png';

const imageMap: Record<string, string> = {
  '/login': LoginImage,
  '/signup': SignupImage,
  '/forgot-password': ForgotPasswordImage,
  '/verification-code': VerificationImage,
  '/reset-password': ResetPasswordImage,
  '/congratulations': CongratulationsImage,
};

const AuthLayout = () => {
  const location = useLocation();
  const currentImage = imageMap[location.pathname] || LoginImage;

  return (
    <div className="auth-layout container-fluid g-0 overflow-hidden">
      <div className="row g-0 h-100">
        {/* Left Side - Hero Image */}
        <div className="col-lg-6 d-none d-lg-flex auth-hero-section">
          <div className="auth-hero-image-container">
            <img 
              src={currentImage} 
              alt="Authentication" 
              className="auth-hero-image"
            />
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="col-12 col-lg-6 auth-form-section">
          <div className="auth-form-container">
            {/* Logo */}
            <div className="auth-logo">
              <img src={Logo} alt="Yummy Yard" />
            </div>

            {/* Page Content */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
