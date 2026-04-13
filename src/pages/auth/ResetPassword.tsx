import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import '../../styles/AuthPages.css';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to congratulations page
    navigate('/congratulations');
  };

  return (
    <div className="auth-page">
      <Link to="/verification-code" className="auth-back-link">
        <ArrowLeft size={18} />
        Back
      </Link>

      <h1 className="auth-title">Reset Password 🔑</h1>
      <p className="auth-subtitle">
        Please enter your new password below. Make sure it's strong and secure.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* New Password Field */}
        <div className="auth-input-group">
          <Lock className="auth-input-icon" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            className="auth-input"
          />
          <button
            type="button"
            className="auth-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="auth-input-group">
          <Lock className="auth-input-icon" size={18} />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            className="auth-input"
          />
          <button
            type="button"
            className="auth-password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Password Requirements */}
        <ul className="auth-password-requirements">
          <li>At least 8 characters</li>
          <li>One uppercase letter</li>
          <li>One number</li>
          <li>One special character</li>
        </ul>

        {/* Reset Button */}
        <button type="submit" className="auth-button">
          Reset Password
        </button>

        {/* Login Link */}
        <p className="auth-footer">
          Remember your password? <Link to="/login" className="auth-link-highlight">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
