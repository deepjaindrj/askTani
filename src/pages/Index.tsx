import React, { useState } from 'react';
import { Landing } from '@/pages/Landing';
import { DashboardPage } from '@/pages/DashboardPage';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  const handleOnboardingComplete = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'dashboard') {
    return <DashboardPage />;
  }

  return <Landing onComplete={handleOnboardingComplete} />;
};

export default Index;
