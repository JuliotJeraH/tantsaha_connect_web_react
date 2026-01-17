import React, { useState, useCallback } from 'react';
import './App.css';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import AlertsPage from './pages/AlertsPage';
import JournalPage from './pages/JournalPage';
import AdvicePage from './pages/AdvicePage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'weather':
        return <WeatherPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'journal':
        return <JournalPage />;
      case 'advice':
        return <AdvicePage />;
      case 'home':
      default:
        return <HomePage />;
    }
  }, [currentPage]);

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="app-main">
        {renderPage()}
      </main>
      <footer className="app-footer">
        <p>🌾 Tantsaha Connect © 2026 - Pour les paysans malagasy</p>
      </footer>
    </div>
  );
};

export default App;
