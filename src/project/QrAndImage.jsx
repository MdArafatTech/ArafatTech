import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import LoginModal from "../component/LoginModal";
import QrGenerator from './QrGenarator';

const QrAndImage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // BLOCK ACCESS - Unauthenticated users cannot proceed
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 p-4">
        <LoginModal 
          onClose={() => {
            navigate("/", { replace: true }); // Redirect to home
          }}
          onSignIn={() => {
            navigate("/login", { replace: true }); // Redirect to login
          }}
        />
      </div>
    );
  }

  // AUTHENTICATED USERS SEE THIS CONTENT
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
            QR & Image Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Premium QR code generator and image tools for authenticated users only
          </p>
        </div>

        {/* Your Protected QR Generator */}
        <div className="max-w-4xl mx-auto">
          <QrGenerator />
        </div>
      </div>
    </div>
  );
};

export default QrAndImage;
