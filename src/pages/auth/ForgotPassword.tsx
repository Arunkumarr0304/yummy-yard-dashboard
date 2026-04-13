import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import '../../styles/AuthPages.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to verification code page
    navigate('/verification-code');
  };

  return (
    <div className="auth-page">
      <Link to="/login" className="auth-back-link">
        <ArrowLeft size={18} />
        Back to Login
      </Link>

      <h1 className="auth-title">Forgot Password? 🔒</h1>
      <p className="auth-subtitle">
        Don't worry! It happens. Please enter your email address or phone number to reset your password.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Email/Phone Field */}
        <div className="auth-input-group">
          <Mail className="auth-input-icon" size={18} />
          <input
            type="email"
            placeholder="Enter your email"
            className="auth-input"
          />
        </div>

        {/* Reset Password Button */}
        <button type="submit" className="auth-button">
          Send OTP
        </button>

        {/* Login Link */}
        <p className="auth-footer">
          Remember your password? <Link to="/login" className="auth-link-highlight">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
