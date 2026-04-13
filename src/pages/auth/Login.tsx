import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import '../../styles/AuthPages.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="auth-page">
      <h1 className="auth-title">Welcome Back! 👋</h1>
      <p className="auth-subtitle">
        We're glad to see you again. Log in to access your account and explore our latest features.
      </p>

      <form className="auth-form">
        {/* Username Field */}
        <div className="auth-input-group">
          <User className="auth-input-icon" size={18} />
          <input
            type="text"
            placeholder="User Name"
            className="auth-input"
          />
        </div>

        {/* Password Field */}
        <div className="auth-input-group">
          <Lock className="auth-input-icon" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
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

        {/* Remember Me & Forgot Password */}
        <div className="auth-options">
          <label className="auth-checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="auth-checkbox"
            />
            <span>Remember Me</span>
          </label>
          <Link to="/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button type="submit" className="auth-button">
          Log In
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <span>Or continue with</span>
        </div>

        {/* Social Login Buttons */}
        <div className="auth-social-buttons">
          <button type="button" className="auth-social-button">
            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" />
            Continue With Apple
          </button>
          <button type="button" className="auth-social-button">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            Continue With Google
          </button>
          <button type="button" className="auth-social-button">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
            Continue With Facebook
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link-highlight">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
