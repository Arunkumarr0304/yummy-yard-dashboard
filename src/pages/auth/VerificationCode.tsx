import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../../styles/AuthPages.css';

const VerificationCode = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to reset password page
    navigate('/reset-password');
  };

  return (
    <div className="auth-page">
      <Link to="/forgot-password" className="auth-back-link">
        <ArrowLeft size={18} />
        Back
      </Link>

      <h1 className="auth-title">Verification Code 🔐</h1>
      <p className="auth-subtitle">
        We sent a verification code to your email. Please enter the 4-digit code below.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Verification Code Inputs */}
        <div className="auth-code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="auth-code-input"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button type="submit" className="auth-button">
          Verify
        </button>

        {/* Resend Code */}
        <p className="auth-resend">
          Didn't receive the code? <button type="button" className="auth-resend-button">Resend</button>
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
