import { useState, useRef, useEffect } from 'react';
import {
  Menu, Search, Bell, ChevronDown,
  UserCircle, KeyRound, Activity, LogOut
} from 'lucide-react';
import './Header.css';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
];

const notifications = [
  { id: 1, icon: '⚙️', title: 'Settings', message: 'Event Update', time: '2m ago', color: '#4880FF' },
  { id: 2, icon: '👤', title: 'Media', message: 'Update your profile', time: '10m ago', color: '#FEC53D' },
  { id: 3, icon: '📋', title: 'Application Error', message: 'Check console logs', time: '1h ago', color: '#EF3826' },
];

export default function Header({ profile, onToggleSidebar, onLogout, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const langRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setShowLangDropdown(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileDropdown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onToggleSidebar}>
          <Menu size={22} />
        </button>
        <div className="header-search">
          <Search size={18} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header-search-input"
          />
        </div>
      </div>

      <div className="header-right">
        {/* Language Selector */}
        <div className="header-dropdown-wrapper" ref={langRef}>
          <button
            className="header-lang-btn"
            onClick={() => setShowLangDropdown(!showLangDropdown)}
          >
            <span className="header-flag">{selectedLang.flag}</span>
            <span className="header-lang-label">{selectedLang.label}</span>
            <ChevronDown size={14} />
          </button>
          {showLangDropdown && (
            <div className="header-dropdown header-dropdown--lang">
              <div className="header-dropdown-title">Select Language</div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`header-dropdown-item ${selectedLang.code === lang.code ? 'header-dropdown-item--active' : ''}`}
                  onClick={() => { setSelectedLang(lang); setShowLangDropdown(false); }}
                >
                  <span className="header-flag">{lang.flag}</span>
                  <span>{lang.label}</span>
                  {selectedLang.code === lang.code && <span className="header-check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="header-dropdown-wrapper" ref={notifRef}>
          <button
            className="header-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="header-badge">3</span>
          </button>
          {showNotifications && (
            <div className="header-dropdown header-dropdown--notif">
              <div className="header-dropdown-title">Notifications</div>
              {notifications.map((notif) => (
                <div key={notif.id} className="header-notif-item">
                  <div className="header-notif-icon" style={{ background: notif.color }}>
                    {notif.icon}
                  </div>
                  <div className="header-notif-body">
                    <span className="header-notif-title">{notif.title}</span>
                    <span className="header-notif-message">{notif.message}</span>
                  </div>
                  <span className="header-notif-time">{notif.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="header-dropdown-wrapper" ref={profileRef}>
          <button
            className="header-profile-btn"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <img src={profile.avatar} alt={profile.name} className="header-avatar" />
            <div className="header-profile-info">
              <span className="header-profile-name">{profile.name}</span>
              <span className="header-profile-role">{profile.role}</span>
            </div>
            <ChevronDown size={14} />
          </button>
          {showProfileDropdown && (
            <div className="header-dropdown header-dropdown--profile">
              <button
                className="header-dropdown-item"
                onClick={() => { if (onNavigate) onNavigate('settings'); setShowProfileDropdown(false); }}
              >
                <UserCircle size={16} /> Manage Account
              </button>
              <button
                className="header-dropdown-item"
                onClick={() => { if (onNavigate) onNavigate('settings'); setShowProfileDropdown(false); }}
              >
                <KeyRound size={16} /> Change Password
              </button>
              <button
                className="header-dropdown-item"
                onClick={() => { if (onNavigate) onNavigate('table'); setShowProfileDropdown(false); }}
              >
                <Activity size={16} /> Activity Log
              </button>
              <div className="header-dropdown-divider" />
              <button
                className="header-dropdown-item header-dropdown-item--danger"
                onClick={() => { if (onLogout) onLogout(); setShowProfileDropdown(false); }}
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
