import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../../styles/AuthPages.css';

const VerificationCode = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otp = code.join('');
    if (otp.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:6969/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      // Navigate to reset password page with email
      navigate('/reset-password', { state: { email } });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      // Clear OTP inputs on error
      setCode(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setResendLoading(true);

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
        throw new Error(data.message || 'Failed to resend OTP');
      }

      setCode(['', '', '', '']);
      inputRefs.current[0]?.focus();
      alert('OTP resent successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/forgot-password" className="auth-back-link">
        <ArrowLeft size={18} />
        Back
      </Link>

      <h1 className="auth-title">Verification Code 🔐</h1>
      <p className="auth-subtitle">
        We sent a verification code to {email}. Please enter the 4-digit code below.
      </p>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Verification Code Inputs */}
        <div className="auth-code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="auth-code-input"
              disabled={loading}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>

        {/* Resend Code */}
        <p className="auth-resend">
          Didn't receive the code?{' '}
          <button
            type="button"
            className="auth-resend-button"
            onClick={handleResend}
            disabled={resendLoading}
          >
            {resendLoading ? 'Sending...' : 'Resend'}
          </button>
        </p>

        {/* Login Link */}
        <p className="auth-footer">
          <Link to="/login" className="auth-link">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default VerificationCode;
