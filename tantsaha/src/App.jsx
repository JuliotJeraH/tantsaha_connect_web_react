import React, { useState, useCallback, useEffect } from 'react';
import { FaLeaf } from 'react-icons/fa';
import './App.css';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import AlertsPage from './pages/AlertsPage';
import JournalPage from './pages/JournalPage';
import AdvicePage from './pages/AdvicePage';
import OnboardingPage from './pages/OnboardingPage';
import { useGlobalAlerts } from './hooks/useGlobalAlerts';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true);
  const { alerts, alertsCount, loadAlerts, deleteAlert } = useGlobalAlerts();

  // Check if user has seen onboarding on mount
  useEffect(() => {
    const hasOnboarded = localStorage.getItem('tantsaha_onboarded');
    if (!hasOnboarded) {
      setHasSeenOnboarding(false);
    }
  }, []);

  // Recharger les alertes toutes les 5 minutes
  useEffect(() => {
    const interval = setInterval(loadAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadAlerts]);

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    // Recharger les alertes quand on change de page
    if (page === 'alerts') {
      loadAlerts();
    }
  }, [loadAlerts]);

  const handleOnboardingComplete = useCallback(() => {
    setHasSeenOnboarding(true);
    setCurrentPage('home');
    window.scrollTo(0, 0);
  }, []);

  const renderPage = useCallback(() => {
    // If user hasn't seen onboarding, show it first
    if (!hasSeenOnboarding) {
      return <OnboardingPage onComplete={handleOnboardingComplete} />;
    }

    switch (currentPage) {
      case 'weather':
        return <WeatherPage />;
      case 'alerts':
        return <AlertsPage alerts={alerts} onDeleteAlert={deleteAlert} />;
      case 'journal':
        return <JournalPage />;
      case 'advice':
        return <AdvicePage />;
      case 'home':
      default:
        return <HomePage alerts={alerts} onDeleteAlert={deleteAlert} onNavigate={handleNavigate} />;
    }
  }, [currentPage, hasSeenOnboarding, handleOnboardingComplete, alerts, deleteAlert]);

  return (
    <div className="app">
      {hasSeenOnboarding && <Header currentPage={currentPage} onNavigate={handleNavigate} alertsCount={alertsCount} />}
      <main className="app-main">
        {renderPage()}
      </main>
      {hasSeenOnboarding && (
        <footer className="app-footer">
          <p><FaLeaf /> Tantsaha Connect © 2026 - Pour les paysans malagasy</p>
        </footer>
      )}
    </div>
  );
};

export default App;
