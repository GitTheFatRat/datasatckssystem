import {
  LayoutDashboard, ShoppingBag, Star, Mail, ClipboardList,
  Package, DollarSign, Calendar, ListTodo, Users, FileText,
  BarChart3, UserCircle, Table2, Settings, LogOut
} from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'inbox', label: 'Inbox', icon: Mail },
  { id: 'order-lists', label: 'Order Lists', icon: ClipboardList },
  { id: 'product-stock', label: 'Product Stock', icon: Package },
];

const pageItems = [
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'to-do', label: 'To-Do', icon: ListTodo },
  { id: 'contact', label: 'Contact', icon: Users },
  { id: 'invoice', label: 'Invoice', icon: FileText },
  { id: 'ui-elements', label: 'UI Elements', icon: BarChart3 },
  { id: 'team', label: 'Team', icon: UserCircle },
  { id: 'table', label: 'Table', icon: Table2 },
];

export default function Sidebar({ activePage, onNavigate, isCollapsed, onLogout }) {
  const renderItem = (item) => {
    const Icon = item.icon;
    const isActive = activePage === item.id;

    return (
      <li key={item.id}>
        <button
          className={`sidebar-item ${isActive ? 'sidebar-item--active' : ''}`}
          onClick={() => onNavigate(item.id)}
          title={isCollapsed ? item.label : undefined}
        >
          <Icon size={20} strokeWidth={1.8} />
          {!isCollapsed && <span>{item.label}</span>}
        </button>
      </li>
    );
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar-logo">
        <span className="sidebar-logo-dash">Dash</span>
        {!isCollapsed && <span className="sidebar-logo-stack">Stack</span>}
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map(renderItem)}
        </ul>

        <div className="sidebar-section-label">
          {!isCollapsed && 'PAGES'}
        </div>
        <ul className="sidebar-menu">
          {pageItems.map(renderItem)}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button
          className="sidebar-item"
          onClick={() => onNavigate('settings')}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings size={20} strokeWidth={1.8} />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button
          className="sidebar-item"
          title={isCollapsed ? 'Logout' : undefined}
          onClick={() => { if (onLogout) onLogout(); }}
        >
          <LogOut size={20} strokeWidth={1.8} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
