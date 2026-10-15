import { useState } from 'react';
import { Upload, Check } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const [siteName, setSiteName] = useState('DashStack');
  const [copyRight, setCopyRight] = useState('© 2024 DashStack. All rights reserved.');
  const [seoTitle, setSeoTitle] = useState('DashStack');
  const [seoDescription, setSeoDescription] = useState('Modern, responsive admin dashboard built for enterprise web applications.');
  const [seoKeywords, setSeoKeywords] = useState('dashboard, admin, react, analytics, dark theme');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="page-body">
      <h1 className="page-header-title">General Settings</h1>

      <div className="dash-card settings-card">
        {isSaved && (
          <div className="settings-alert-success">
            <Check size={18} /> Settings successfully updated and saved!
          </div>
        )}

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-form-row">
            <label className="settings-label">Site Title</label>
            <input
              type="text"
              className="input-field settings-input"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              required
            />
          </div>

          <div className="settings-form-row">
            <label className="settings-label">Copyright Text</label>
            <input
              type="text"
              className="input-field settings-input"
              value={copyRight}
              onChange={(e) => setCopyRight(e.target.value)}
            />
          </div>

          <div className="settings-form-row">
            <label className="settings-label">SEO Title</label>
            <input
              type="text"
              className="input-field settings-input"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
            />
          </div>

          <div className="settings-form-row">
            <label className="settings-label">SEO Meta Description</label>
            <textarea
              className="input-field settings-input settings-textarea"
              rows={3}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
            />
          </div>

          <div className="settings-form-row">
            <label className="settings-label">SEO Keywords</label>
            <input
              type="text"
              className="input-field settings-input"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
            />
          </div>

          <div className="settings-form-row">
            <label className="settings-label">Site Logo</label>
            <div className="settings-upload-box">
              <Upload size={20} className="settings-upload-icon" />
              <span>Choose a file or drag & drop here (PNG, JPG up to 2MB)</span>
            </div>
          </div>

          <div className="settings-actions">
            <button type="submit" className="btn-primary settings-save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
