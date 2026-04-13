import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import '../../styles/AuthPages.css';

const Congratulations = () => {
  return (
    <div className="auth-page auth-congratulations">
      <div className="auth-success-icon">
        <CheckCircle2 size={64} />
      </div>

      <h1 className="auth-title">Congratulations! 🎉</h1>
      <p className="auth-subtitle">
        Your password has been reset successfully. You can now log in with your new password.
      </p>

      <div className="auth-form">
        <Link to="/login" className="auth-button auth-button-link">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Congratulations;
