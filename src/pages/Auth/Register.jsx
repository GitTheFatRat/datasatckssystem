import { useState } from 'react';
import './Auth.css';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (onRegisterSuccess) onRegisterSuccess({ name, email });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create an Account</h2>
          <p className="auth-subtitle">Create an account to continue and explore with us</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Your Name</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email address:</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="auth-options">
            <label className="auth-remember">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <span>I accept Terms & Conditions</span>
            </label>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn">
            Sign Up
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <button
            type="button"
            className="auth-link"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
