import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../component/LogoutButton";

const Account = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // DEVICE DETECTION STATES
  const [deviceName, setDeviceName] = useState("Detecting...");
  const [deviceModel, setDeviceModel] = useState("Detecting...");
  const [deviceType, setDeviceType] = useState("Detecting...");
  const [browser, setBrowser] = useState("Detecting...");
  const [os, setOS] = useState("Detecting...");

  // LOGOUT FUNCTION
  const handleLogout = () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    setTimeout(async () => {
      try {
        await logout();
        navigate("/");
      } catch (err) {
        alert("Logout failed: " + err.message);
      }
      setIsLoggingOut(false);
    }, 2200);
  };

  // DETECT BROWSER NAME
  const detectBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Edg")) return "Microsoft Edge";
    if (ua.includes("Chrome") && !ua.includes("Edg")) return "Google Chrome";
    if (ua.includes("Firefox")) return "Mozilla Firefox";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    return "Unknown Browser";
  };

  // DETECT OS
  const detectOS = () => {
    const ua = navigator.userAgent;
    if (/Windows/i.test(ua)) return "Windows";
    if (/Macintosh/i.test(ua)) return "MacOS";
    if (/Android/i.test(ua)) return "Android";
    if (/iPhone|iPad/i.test(ua)) return "iOS";
    if (/Linux/i.test(ua)) return "Linux";
    return "Unknown OS";
  };

  // DEVICE BRAND + MODEL DETECT
  useEffect(() => {
    const ua = navigator.userAgent;
    let brand = "Unknown";
    let model = "Unknown";
    let type = "Unknown";

    // ... (your detection logic)

    setDeviceName(brand);
    setDeviceModel(model);
    setDeviceType(type);
    setBrowser(detectBrowser());
    setOS(detectOS());
  }, []);

  // IF NOT LOGGED IN
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-300">
        <h1 className="text-2xl font-bold mb-2">No user logged in</h1>
        <p>Please login to view your account details.</p>
      </div>
    );
  }

  // MAIN UI
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto px-4 sm:px-6 mt-10 mb-10 text-white">
      <div className="overflow-hidden border border-gray-700 rounded-lg shadow-lg p-6 bg-black/50 backdrop-blur">
        <h1 className="text-3xl font-bold mb-6 text-center">My Account</h1>

        {/* USER INFO */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={currentUser.photoURL || "/default-profile-pic.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-600"
          />
          <div className="flex-1 space-y-2 text-gray-200">
            <h2 className="text-xl font-semibold text-blue-400">User Information</h2>
            <p><strong>Name:</strong> {currentUser.displayName || "Not Provided"}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Email Verified:</strong> {currentUser.emailVerified ? "Yes" : "No"}</p>
            <p><strong>Phone:</strong> {currentUser.phoneNumber || "Not Provided"}</p>
            <p><strong>UID:</strong> {currentUser.uid}</p>
            <p><strong>Provider:</strong> {currentUser.providerData[0]?.providerId}</p>
            <p><strong>Account Created:</strong> {currentUser.metadata.creationTime}</p>
            <p><strong>Last Login:</strong> {currentUser.metadata.lastSignInTime}</p>
          </div>
        </div>

        {/* DEVICE INFO */}
        <div className="mt-8 p-4 bg-gray-800 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-green-400 mb-3">Device Information</h2>
          <p><strong>Device Type:</strong> {deviceType}</p>
          <p><strong>Brand:</strong> {deviceName}</p>
          <p><strong>Model:</strong> {deviceModel}</p>
          <p><strong>Operating System:</strong> {os}</p>
          <p><strong>Browser:</strong> {browser}</p>
          <p><strong>Screen:</strong> {window.screen.width} x {window.screen.height}</p>
        </div>

        {/* LOGOUT */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
         
          >
            <LogoutButton animate={isLoggingOut} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
