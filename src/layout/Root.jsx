import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import Header from '../component/Header';
import Footer from '../component/Footer';
import ScrollToTop from '../component/ScrolltoTop';
import ScrollTopButton from '../component/ScrollTopButton';
import PageMeta from '../component/PageMeta';
import LoginModal from '../component/LoginModal';

const Root = () => {
  const { showLoginModal, setShowLoginModal, currentUser } = useAuth();
  const navigate = useNavigate();

  // Global login redirect logic
  useEffect(() => {
    if (currentUser && showLoginModal) {
      setShowLoginModal(false);

      const intendedPath = localStorage.getItem('intendedPath');
      if (intendedPath && intendedPath !== '/login') {
        localStorage.removeItem('intendedPath');
        navigate(intendedPath, { replace: true });
      } else {
        navigate('/services', { replace: true });
      }
    }
  }, [currentUser, showLoginModal, setShowLoginModal, navigate]);

  // Modal handlers
  const handleModalClose = () => {
    if (typeof setShowLoginModal === 'function') {
      setShowLoginModal(false);
    }
  };

  const handleModalSignIn = () => {
    if (typeof setShowLoginModal === 'function') {
      setShowLoginModal(false);
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Login Modal - Fixed with props */}
      {showLoginModal && (
        <LoginModal 
          onClose={handleModalClose}
          onSignIn={handleModalSignIn}
        />
      )}
      
      <PageMeta />
      <ScrollTopButton />
      <ScrollToTop />
      
      <header className="pt-25">
        <Header />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Root;
