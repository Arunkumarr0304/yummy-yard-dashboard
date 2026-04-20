import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import '../../styles/AuthPages.css';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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

    if (!agreeTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:6969/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to login or dashboard
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-title">Create Account 🚀</h1>
      <p className="auth-subtitle">
        Join us today! Fill in your details to create your account and start your journey.
      </p>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="auth-input-group">
          <User className="auth-input-icon" size={18} />
          <input
            type="text"
            name="username"
            placeholder="User Name"
            className="auth-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Field */}
        <div className="auth-input-group">
          <Mail className="auth-input-icon" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="auth-input"
            value={formData.email}
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
            minLength={6}
          />
          <button
            type="button"
            className="auth-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Terms & Conditions */}
        <div className="auth-options">
          <label className="auth-checkbox-label">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="auth-checkbox"
            />
            <span>I agree to the <a href="#" className="auth-link">Terms & Conditions</a></span>
          </label>
        </div>

        {/* Sign Up Button */}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
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

        {/* Login Link */}
        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link-highlight">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
