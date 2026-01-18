import React, { useCallback } from 'react';
import { FaLeaf, FaCloudSun, FaBell, FaBook, FaCalendar, FaArrowRight } from 'react-icons/fa';
import './OnboardingPage.css';

const OnboardingPage = ({ onComplete }) => {
  const features = [
    {
      icon: FaCloudSun,
      title: 'Toetr\'andro',
      description: 'Vakoran tonga na misy na tsy misy - mahita ny fitsikiana teny mianao'
    },
    {
      icon: FaBell,
      title: 'Fampahafantarana',
      description: 'Manahy saika fampahafantarana tena manan-danja amin\'ny fambolena'
    },
    {
      icon: FaBook,
      title: 'Torolalana Fambolena',
      description: 'Mahatanteraka torolalana be ho an\'ny zavaboary misy fiainao'
    },
    {
      icon: FaCalendar,
      title: 'Karetan-toerana',
      description: 'Tandrify sy firaketana ny toerana aminarao mandritra ny taona'
    }
  ];

  const handleComplete = useCallback(() => {
    localStorage.setItem('tantsaha_onboarded', 'true');
    onComplete();
  }, [onComplete]);

  return (
    <div className="onboarding">
      {/* Hero Section */}
      <section className="onboarding-hero">
        <div className="hero-content">
          <div className="hero-icon">
            <FaLeaf />
          </div>
          <h1>Tonga soa amin'ny <span className="highlight-app-name">Tantsaha Connect</span></h1>
          <p>Fanampiana ho an'ny vahoaka malagasy</p>
          <button className="cta-button" onClick={handleComplete}>
            Manomboka <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="onboarding-features">
        <h2>Inona ny mavokatra amin'ity fampiharana ity?</h2>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="onboarding-benefits">
        <h2>Ity fampiharana ity dia:</h2>
        <ul className="benefits-list">
          <li>
            <span className="benefit-icon">✓</span>
            <span>Maitotra - Tsy mila internet alinina</span>
          </li>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Tsotra - Mora ampiasaina ho an'ny rehetra</span>
          </li>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Fahalalahan'ny Malagasy - Miteny amin'ny teny tena</span>
          </li>
          <li>
            <span className="benefit-icon">✓</span>
            <span>Maitotra - Fehezin'ny fambolena mampihena</span>
          </li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="onboarding-cta">
        <button className="cta-button" onClick={handleComplete}>
          Manomboka <FaArrowRight />
        </button>
      </section>

    </div>
  );
};

export default OnboardingPage;
