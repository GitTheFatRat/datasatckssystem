import { useState } from 'react';
import './Auth.css';

export default function Login({ onLogin, onSwitchToRegister, onSwitchToForgot }) {
  const [email, setEmail] = useState('admin.moni@dashstack.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(email);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Login to Account</h2>
          <p className="auth-subtitle">Please enter your email and password to continue</p>
        </div>

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

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-options">
            <label className="auth-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Password</span>
            </label>
            <button
              type="button"
              className="auth-forgot-btn"
              onClick={onSwitchToForgot}
            >
              Forget Password?
            </button>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?
          <button
            type="button"
            className="auth-link"
            onClick={onSwitchToRegister}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
