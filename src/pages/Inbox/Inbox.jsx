import { useState } from 'react';
import { Plus, Search, Star, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import { initialEmails } from '../../services/mockData';
import './Inbox.css';

const categories = [
  { label: 'Inbox', count: 1253, color: '#4880FF' },
  { label: 'Starred', count: 245, color: '' },
  { label: 'Sent', count: 24531, color: '' },
  { label: 'Draft', count: 9, color: '' },
  { label: 'Spam', count: 14, color: '' },
  { label: 'Important', count: 18, color: '' },
  { label: 'Bin', count: 3, color: '' },
];

const labels = [
  { label: 'Primary', color: '#4880FF' },
  { label: 'Social', color: '#00B69B' },
  { label: 'Work', color: '#FF9F43' },
  { label: 'Friends', color: '#884DFF' },
];

const labelColorMap = {
  Primary: '#4880FF',
  Work: '#FF9F43',
  Friends: '#884DFF',
  Social: '#00B69B',
};

export default function Inbox() {
  const [emails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');

  return (
    <div className="page-body">
      <h1 className="page-header-title">Inbox</h1>

      <div className="inbox-layout">
        {/* Sidebar */}
        <div className="inbox-sidebar">
          <button className="btn-primary inbox-compose-btn">
            <Plus size={16} /> Compose
          </button>

          <div className="inbox-sidebar-section">
            <h4 className="inbox-sidebar-label">My Email</h4>
            {categories.map((cat) => (
              <button
                key={cat.label}
                className={`inbox-cat-item ${activeCategory === cat.label ? 'inbox-cat-item--active' : ''}`}
                onClick={() => setActiveCategory(cat.label)}
              >
                <span>{cat.label}</span>
                {cat.count > 0 && (
                  <span className={`inbox-cat-count ${activeCategory === cat.label ? 'inbox-cat-count--active' : ''}`}>
                    {cat.count.toLocaleString()}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="inbox-sidebar-section">
            <h4 className="inbox-sidebar-label">Label</h4>
            {labels.map((lbl) => (
              <button key={lbl.label} className="inbox-label-item">
                <span className="inbox-label-dot" style={{ backgroundColor: lbl.color }}></span>
                <span>{lbl.label}</span>
              </button>
            ))}
            <button className="inbox-label-item inbox-label-create">
              + Create New Label
            </button>
          </div>
        </div>

        {/* Email List or Detail */}
        {selectedEmail ? (
          <div className="inbox-detail">
            <div className="inbox-detail-header">
              <h2 className="inbox-detail-sender">{selectedEmail.sender}</h2>
              <span className="inbox-detail-label-badge" style={{ backgroundColor: labelColorMap[selectedEmail.label] }}>
                {selectedEmail.label}
              </span>
              <div className="inbox-detail-actions">
                <button className="header-icon-btn"><Star size={18} /></button>
                <button className="header-icon-btn"><MoreVertical size={18} /></button>
              </div>
            </div>

            <div className="inbox-detail-body">
              <p>{selectedEmail.content}</p>
              <div className="inbox-detail-quote">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
              </div>
              <p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            </div>

            <div className="inbox-reply-box">
              <input
                type="text"
                className="inbox-reply-input"
                placeholder="Write message..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="inbox-reply-actions">
                <button className="header-icon-btn"><Paperclip size={18} /></button>
                <button className="header-icon-btn"><Smile size={18} /></button>
                <button className="btn-primary inbox-send-btn"><Send size={14} /></button>
              </div>
            </div>

            <button className="btn-secondary" onClick={() => setSelectedEmail(null)}>
              ← Back to Inbox
            </button>
          </div>
        ) : (
          <div className="inbox-list">
            <div className="inbox-list-header">
              <div className="inbox-search-bar">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search mail"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="inbox-search-input"
                />
              </div>
            </div>

            <div className="inbox-email-list">
              {emails
                .filter((e) => e.subject.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((email) => (
                  <div
                    key={email.id}
                    className="inbox-email-row"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="inbox-email-sender">{email.sender}</div>
                    <span
                      className="inbox-email-label"
                      style={{ backgroundColor: labelColorMap[email.label] || '#4880FF' }}
                    >
                      {email.label}
                    </span>
                    <div className="inbox-email-subject">{email.subject}</div>
                    <div className="inbox-email-time">{email.time}</div>
                  </div>
                ))}
            </div>

            <div className="orders-pagination">
              <span className="orders-pagination-info">Showing 1-10 of 1,253</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
