import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CatalystDeploymentModal } from './components/CatalystDeploymentModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ChooseRolePage } from './pages/ChooseRolePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DonorRegistrationPage } from './pages/DonorRegistrationPage';
import { OrganRequestPage } from './pages/OrganRequestPage';
import { DonorDashboard } from './pages/DonorDashboard';
import { RecipientDashboard } from './pages/RecipientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { TrackRequestPage } from './pages/TrackRequestPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function MainLayout() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCatalystModalOpen, setIsCatalystModalOpen] = useState<boolean>(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutPage setActiveTab={setActiveTab} />;
      case 'choose-role':
        return <ChooseRolePage setActiveTab={setActiveTab} />;
      case 'login':
        return <LoginPage setActiveTab={setActiveTab} />;
      case 'register':
        return <RegisterPage setActiveTab={setActiveTab} />;
      case 'donor-register':
        return <DonorRegistrationPage setActiveTab={setActiveTab} />;
      case 'organ-request':
        return <OrganRequestPage setActiveTab={setActiveTab} />;
      case 'donor-dashboard':
        return <DonorDashboard setActiveTab={setActiveTab} />;
      case 'recipient-dashboard':
        return <RecipientDashboard setActiveTab={setActiveTab} />;
      case 'admin-dashboard':
        return <AdminDashboard setActiveTab={setActiveTab} />;
      case 'track':
        return <TrackRequestPage setActiveTab={setActiveTab} />;
      case 'profile':
        return <ProfilePage setActiveTab={setActiveTab} />;
      default:
        return <NotFoundPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      {/* Background Editorial Ambient Glow Blurs */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-emerald-100/70 rounded-full blur-3xl pointer-events-none opacity-60 z-0"></div>
      <div className="fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-100/70 rounded-full blur-3xl pointer-events-none opacity-60 z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <div>
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenCatalystModal={() => setIsCatalystModalOpen(true)}
          />

          <main className="animate-in fade-in duration-300">
            {renderContent()}
          </main>
        </div>

        <Footer
          setActiveTab={setActiveTab}
          onOpenCatalystModal={() => setIsCatalystModalOpen(true)}
        />
      </div>

      <CatalystDeploymentModal
        isOpen={isCatalystModalOpen}
        onClose={() => setIsCatalystModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
