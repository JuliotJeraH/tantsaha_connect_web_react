import React from 'react';
import './Header.css';
import { FaLeaf, FaClock, FaCloud, FaBook, FaBell, FaHome } from 'react-icons/fa';

const Header = React.memo(({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Accueil', icon: FaHome },
    { id: 'weather', label: 'Météo', icon: FaCloud },
    { id: 'alerts', label: 'Alertes', icon: FaBell },
    { id: 'journal', label: 'Journal', icon: FaClock },
    { id: 'advice', label: 'Conseils', icon: FaBook },
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
              <Icon className="nav-icon" />
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
