import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import '../../styles/AuthPages.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:6969/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      // Navigate to verification code page with email
      navigate('/verification-code', { state: { email } });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/login" className="auth-back-link">
        <ArrowLeft size={18} />
        Back to Login
      </Link>

      <h1 className="auth-title">Forgot Password? 🔒</h1>
      <p className="auth-subtitle">
        Don't worry! It happens. Please enter your email address to reset your password.
      </p>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="auth-input-group">
          <Mail className="auth-input-icon" size={18} />
          <input
            type="email"
            placeholder="Enter your email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Send OTP Button */}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
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
