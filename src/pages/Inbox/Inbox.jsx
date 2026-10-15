import { useState } from 'react';
import { Plus, Search, Star, Send, Paperclip, Smile, MoreVertical, Trash2, X, ArrowLeft } from 'lucide-react';
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
  const [emails, setEmails] = useState(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Inbox');
  const [activeLabel, setActiveLabel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [threadMessages, setThreadMessages] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [newMail, setNewMail] = useState({ to: '', subject: '', content: '', label: 'Primary' });

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    setThreadMessages([
      {
        id: 1,
        sender: email.sender,
        text: email.content,
        time: email.time,
        isMe: false,
      },
      {
        id: 2,
        sender: 'You',
        text: 'Thanks for reaching out! Reviewing the details right now.',
        time: 'Just now',
        isMe: true,
      },
    ]);
  };

  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyText.trim()) return;
    const msg = {
      id: Date.now(),
      sender: 'You',
      text: replyText,
      time: 'Just now',
      isMe: true,
    };
    setThreadMessages((prev) => [...prev, msg]);
    setReplyText('');
  };

  const handleToggleStar = (e, emailId) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((m) => (m.id === emailId ? { ...m, isStarred: !m.isStarred } : m))
    );
  };

  const handleDeleteEmail = (e, emailId) => {
    e.stopPropagation();
    setEmails((prev) => prev.filter((m) => m.id !== emailId));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
  };

  const handleComposeSubmit = (e) => {
    e.preventDefault();
    if (!newMail.to || !newMail.subject) return;
    const created = {
      id: `mail-${Date.now()}`,
      sender: newMail.to.split('@')[0],
      subject: newMail.subject,
      label: newMail.label,
      time: 'Just now',
      isStarred: false,
      content: newMail.content || 'No content provided.',
    };
    setEmails([created, ...emails]);
    setShowCompose(false);
    setNewMail({ to: '', subject: '', content: '', label: 'Primary' });
  };

  const filteredEmails = emails.filter((email) => {
    const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          email.sender.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeCategory === 'Starred' && !email.isStarred) return false;
    if (activeLabel && email.label !== activeLabel) return false;
    return true;
  });

  return (
    <div className="page-body">
      <h1 className="page-header-title">Inbox</h1>

      <div className="inbox-layout">
        {/* Sidebar */}
        <div className="inbox-sidebar">
          <button className="btn-primary inbox-compose-btn" onClick={() => setShowCompose(true)}>
            <Plus size={16} /> Compose
          </button>

          <div className="inbox-sidebar-section">
            <h4 className="inbox-sidebar-label">My Email</h4>
            {categories.map((cat) => (
              <button
                key={cat.label}
                className={`inbox-cat-item ${activeCategory === cat.label && !activeLabel ? 'inbox-cat-item--active' : ''}`}
                onClick={() => { setActiveCategory(cat.label); setActiveLabel(null); }}
              >
                <span>{cat.label}</span>
                {cat.count > 0 && (
                  <span className={`inbox-cat-count ${activeCategory === cat.label && !activeLabel ? 'inbox-cat-count--active' : ''}`}>
                    {cat.label === 'Starred' ? emails.filter(m => m.isStarred).length : cat.count.toLocaleString()}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="inbox-sidebar-section">
            <h4 className="inbox-sidebar-label">Label</h4>
            {labels.map((lbl) => (
              <button
                key={lbl.label}
                className={`inbox-label-item ${activeLabel === lbl.label ? 'inbox-cat-item--active' : ''}`}
                onClick={() => setActiveLabel(activeLabel === lbl.label ? null : lbl.label)}
              >
                <span className="inbox-label-dot" style={{ backgroundColor: lbl.color }}></span>
                <span>{lbl.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Email List or Detail */}
        {selectedEmail ? (
          <div className="inbox-detail">
            <div className="inbox-detail-header">
              <button className="header-icon-btn" onClick={() => setSelectedEmail(null)} title="Back">
                <ArrowLeft size={18} />
              </button>
              <h2 className="inbox-detail-sender">{selectedEmail.sender}</h2>
              <span className="inbox-detail-label-badge" style={{ backgroundColor: labelColorMap[selectedEmail.label] || '#4880FF' }}>
                {selectedEmail.label}
              </span>
              <div className="inbox-detail-actions">
                <button
                  className="header-icon-btn"
                  onClick={(e) => handleToggleStar(e, selectedEmail.id)}
                  title="Star"
                >
                  <Star
                    size={18}
                    fill={selectedEmail.isStarred ? '#FEC53D' : 'none'}
                    color={selectedEmail.isStarred ? '#FEC53D' : 'var(--text-muted)'}
                  />
                </button>
                <button
                  className="header-icon-btn"
                  onClick={(e) => handleDeleteEmail(e, selectedEmail.id)}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
                <button className="header-icon-btn"><MoreVertical size={18} /></button>
              </div>
            </div>

            <div className="inbox-detail-body">
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
                {selectedEmail.subject}
              </h3>
              <div className="inbox-chat-thread">
                {threadMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`inbox-chat-bubble ${msg.isMe ? 'inbox-chat-bubble--me' : 'inbox-chat-bubble--them'}`}
                  >
                    <div className="inbox-chat-text">{msg.text}</div>
                    <div className="inbox-chat-time">{msg.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendReply} className="inbox-reply-box">
              <input
                type="text"
                className="inbox-reply-input"
                placeholder="Write message..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="inbox-reply-actions">
                <button type="button" className="header-icon-btn"><Paperclip size={18} /></button>
                <button type="button" className="header-icon-btn"><Smile size={18} /></button>
                <button type="submit" className="btn-primary inbox-send-btn">
                  <Send size={14} /> Send
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="inbox-list">
            <div className="inbox-list-header">
              <div className="inbox-search-bar">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search mail by subject or sender..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="inbox-search-input"
                />
              </div>
            </div>

            <div className="inbox-email-list">
              {filteredEmails.map((email) => (
                <div
                  key={email.id}
                  className="inbox-email-row"
                  onClick={() => handleSelectEmail(email)}
                >
                  <button
                    className="todo-star"
                    onClick={(e) => handleToggleStar(e, email.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Star
                      size={16}
                      fill={email.isStarred ? '#FEC53D' : 'none'}
                      color={email.isStarred ? '#FEC53D' : 'var(--text-muted)'}
                    />
                  </button>
                  <div className="inbox-email-sender">{email.sender}</div>
                  <span
                    className="inbox-email-label"
                    style={{ backgroundColor: labelColorMap[email.label] || '#4880FF' }}
                  >
                    {email.label}
                  </span>
                  <div className="inbox-email-subject">{email.subject}</div>
                  <div className="inbox-email-time">{email.time}</div>
                  <button
                    className="table-action-btn table-action-btn--delete"
                    onClick={(e) => handleDeleteEmail(e, email.id)}
                    title="Delete"
                    style={{ marginLeft: '8px', opacity: 0.7 }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {filteredEmails.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No emails found in this category.
                </div>
              )}
            </div>

            <div className="orders-pagination">
              <span className="orders-pagination-info">
                Showing {filteredEmails.length} emails
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="orders-modal-overlay" onClick={() => setShowCompose(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h2>New Message</h2>
              <button className="contact-close-btn" onClick={() => setShowCompose(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleComposeSubmit} className="contact-form">
              <div className="contact-form-group" style={{ marginBottom: '14px' }}>
                <label>To:</label>
                <input
                  type="email"
                  required
                  placeholder="recipient@example.com"
                  className="input-field"
                  value={newMail.to}
                  onChange={(e) => setNewMail({ ...newMail, to: e.target.value })}
                />
              </div>

              <div className="contact-form-group" style={{ marginBottom: '14px' }}>
                <label>Subject:</label>
                <input
                  type="text"
                  required
                  placeholder="Subject line"
                  className="input-field"
                  value={newMail.subject}
                  onChange={(e) => setNewMail({ ...newMail, subject: e.target.value })}
                />
              </div>

              <div className="contact-form-group" style={{ marginBottom: '14px' }}>
                <label>Label:</label>
                <select
                  className="input-field"
                  value={newMail.label}
                  onChange={(e) => setNewMail({ ...newMail, label: e.target.value })}
                >
                  <option value="Primary">Primary</option>
                  <option value="Work">Work</option>
                  <option value="Social">Social</option>
                  <option value="Friends">Friends</option>
                </select>
              </div>

              <div className="contact-form-group" style={{ marginBottom: '20px' }}>
                <label>Message:</label>
                <textarea
                  rows={4}
                  required
                  className="input-field"
                  placeholder="Type your message here..."
                  value={newMail.content}
                  onChange={(e) => setNewMail({ ...newMail, content: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <Send size={16} /> Send Email
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
