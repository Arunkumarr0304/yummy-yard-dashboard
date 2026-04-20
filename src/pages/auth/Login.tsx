import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import '../../styles/AuthPages.css';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:6969/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to dashboard or home page
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-title">Welcome Back! 👋</h1>
      <p className="auth-subtitle">
        We're glad to see you again. Log in to access your account and explore our latest features.
      </p>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Username/Email Field */}
        <div className="auth-input-group">
          <User className="auth-input-icon" size={18} />
          <input
            type="text"
            name="username"
            placeholder="User Name / Email"
            className="auth-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="auth-input-group">
          <Lock className="auth-input-icon" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
            required
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
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
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
