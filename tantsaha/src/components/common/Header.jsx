import React from 'react';
import './Header.css';
import { FaLeaf, FaCalendar, FaCloud, FaBook, FaBell, FaHome } from 'react-icons/fa';

const Header = React.memo(({ currentPage, onNavigate, alertsCount = 0 }) => {
  const navItems = [
    { id: 'home', label: 'Lamina', icon: FaHome },
    { id: 'weather', label: 'Toetr\'andro', icon: FaCloud },
    { id: 'alerts', label: 'Fampahafantarana', icon: FaBell, badge: alertsCount },
    { id: 'journal', label: 'Bokin-tsoratra', icon: FaCalendar },
    { id: 'advice', label: 'Torolalana', icon: FaBook },
  ];

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-title">
          <FaLeaf className="header-icon" />
          <h1>Tantsaha Connect</h1>
        </div>
      </div>
      <nav className="header-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              title={item.label}
            >
              <div className="nav-icon-wrapper">
                <Icon className="nav-icon" />
                {item.badge && item.badge > 0 && (
                  <span className="badge">{item.badge > 9 ? '9+' : item.badge}</span>
                )}
              </div>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
