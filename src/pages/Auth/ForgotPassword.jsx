import { useState } from 'react';
import './Auth.css';

export default function ForgotPassword({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Forgot Password</h2>
          <p className="auth-subtitle">
            {submitted
              ? 'Password reset instructions have been sent to your email.'
              : 'Enter your email address and we will send you a password reset link.'}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Email address:</label>
              <input
                type="email"
                required
                className="input-field"
                placeholder="esteban_schiller@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary auth-submit-btn">
              Send Reset Link
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              className="btn-primary auth-submit-btn"
              onClick={onSwitchToLogin}
            >
              Back to Login
            </button>
          </div>
        )}

        <div className="auth-footer">
          Remember your password?
          <button
            type="button"
            className="auth-link"
            onClick={onSwitchToLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
