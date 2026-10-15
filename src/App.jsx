import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { initialProfile } from './services/mockData';

import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Favorites from './pages/Favorites/Favorites';
import Inbox from './pages/Inbox/Inbox';
import Orders from './pages/Orders/Orders';
import ProductStock from './pages/ProductStock/ProductStock';
import Pricing from './pages/Pricing/Pricing';
import CalendarPage from './pages/Calendar/CalendarPage';
import ToDo from './pages/ToDo/ToDo';
import Contact from './pages/Contact/Contact';
import Invoice from './pages/Invoice/Invoice';
import UIElements from './pages/UIElements/UIElements';
import Team from './pages/Team/Team';
import Table from './pages/Table/Table';
import Settings from './pages/Settings/Settings';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';

export default function App() {
  const [authMode, setAuthMode] = useState('app');
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [profile, setProfile] = useState(initialProfile);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleLogin = (email) => {
    setProfile((prev) => ({
      ...prev,
      email: email || prev.email,
    }));
    setAuthMode('app');
  };

  const handleRegisterSuccess = (newUser) => {
    setProfile((prev) => ({
      ...prev,
      name: newUser.name || prev.name,
      email: newUser.email || prev.email,
    }));
    setAuthMode('app');
  };

  const handleLogout = () => {
    setAuthMode('login');
  };

  if (authMode === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthMode('register')}
        onSwitchToForgot={() => setAuthMode('forgot')}
      />
    );
  }

  if (authMode === 'register') {
    return (
      <Register
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={() => setAuthMode('login')}
      />
    );
  }

  if (authMode === 'forgot') {
    return (
      <ForgotPassword
        onSwitchToLogin={() => setAuthMode('login')}
      />
    );
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'favorites':
        return <Favorites />;
      case 'inbox':
        return <Inbox />;
      case 'order-lists':
        return <Orders />;
      case 'product-stock':
        return <ProductStock />;
      case 'pricing':
        return <Pricing />;
      case 'calendar':
        return <CalendarPage />;
      case 'to-do':
        return <ToDo />;
      case 'contact':
        return <Contact />;
      case 'invoice':
        return <Invoice />;
      case 'ui-elements':
        return <UIElements />;
      case 'team':
        return <Team />;
      case 'table':
        return <Table />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isCollapsed={isSidebarCollapsed}
        onLogout={handleLogout}
      />

      <div className="main-content">
        <Header
          profile={profile}
          onToggleSidebar={toggleSidebar}
          onLogout={handleLogout}
          onNavigate={setActivePage}
        />
        <main>{renderActivePage()}</main>
      </div>
    </div>
  );
}
