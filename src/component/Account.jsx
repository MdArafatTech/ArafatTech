import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LogoutButton from "../component/LogoutButton";

// Fetch geolocation from IP
const fetchGeoLocation = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    return res.json();
  } catch {
    return { city: "Unknown", country_name: "Unknown", ip: "Unknown", latitude: "Unknown", longitude: "Unknown" };
  }
};

const Account = () => {
  const { currentUser, logout, updateProfile, sendEmailVerification } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const [activeTab, setActiveTab] = useState("profile");

  const [deviceInfo, setDeviceInfo] = useState({
    deviceName: "Detecting...",
    deviceModel: "Detecting...",
    deviceType: "Detecting...",
    browser: "Detecting...",
    os: "Detecting...",
    screen: `${window.screen.width} x ${window.screen.height}`,
  });

  const [activityLogs, setActivityLogs] = useState(() => {
    const savedLogs = localStorage.getItem("activityLogs");
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  const [profileForm, setProfileForm] = useState({
    displayName: currentUser?.displayName || "",
    phoneNumber: currentUser?.phoneNumber || "",
    photoURL: currentUser?.photoURL || "/default-profile-pic.jpg",
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/");
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
    setIsLoggingOut(false);
  };

  const detectDeviceInfo = () => {
    const ua = navigator.userAgent.toLowerCase();
    let type = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
      ? /mobile|android|iemobile/i.test(ua)
        ? "Mobile"
        : "Tablet"
      : "Desktop";

    let brand = "Unknown";
    let model = "Unknown";

    if (/android/i.test(ua)) {
      if (/samsung/i.test(ua)) {
        brand = "Samsung";
        model = ua.match(/sm-[a-z0-9]+/i)?.[0]?.toUpperCase() || "Galaxy Series";
      } else if (/pixel/i.test(ua)) {
        brand = "Google";
        model = "Pixel";
      } else {
        brand = "Android Device";
      }
    } else if (/iphone/i.test(ua)) {
      brand = "Apple";
      model = "iPhone";
    } else if (/ipad/i.test(ua)) {
      brand = "Apple";
      model = "iPad";
    }

    const browser = ua.includes("edg")
      ? "Microsoft Edge"
      : ua.includes("chrome")
      ? "Google Chrome"
      : ua.includes("firefox")
      ? "Mozilla Firefox"
      : ua.includes("safari")
      ? "Safari"
      : "Unknown Browser";

    const os = /windows/i.test(ua)
      ? "Windows"
      : /macintosh/i.test(ua)
      ? "MacOS"
      : /android/i.test(ua)
      ? "Android"
      : /iphone|ipad/i.test(ua)
      ? "iOS"
      : /linux/i.test(ua)
      ? "Linux"
      : "Unknown OS";

    return { type, brand, model, browser, os };
  };

  const loadActivityLog = async () => {
    const { type, brand, model, browser, os } = detectDeviceInfo();
    setDeviceInfo({
      deviceName: brand,
      deviceModel: model,
      deviceType: type,
      browser,
      os,
      screen: `${window.screen.width} x ${window.screen.height}`,
    });

    const geo = await fetchGeoLocation();
    const log = {
      time: new Date().toLocaleString(),
      device: type,
      os,
      browser,
      location: `${geo.city}, ${geo.country_name}`,
      ip: geo.ip || "Unknown",
      latitude: geo.latitude || "Unknown",
      longitude: geo.longitude || "Unknown",
      lastLogin: currentUser.metadata?.lastSignInTime || "Unknown",
      provider: currentUser.providerData?.[0]?.providerId || "Unknown",
    };

    setActivityLogs((prev) => {
      // Prevent duplicate activity at the top
      if (prev[0] && prev[0].time === log.time) return prev;
      const updated = [log, ...prev].slice(0, 10);
      localStorage.setItem("activityLogs", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (currentUser) loadActivityLog();
  }, [currentUser]);

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({ 
        displayName: profileForm.displayName,
        phoneNumber: profileForm.phoneNumber,
        photoURL: profileForm.photoURL,
        file: profileForm.file
      });
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    }
  };

  const handleSendVerification = async () => {
    try {
      await sendEmailVerification();
      alert("Verification email sent!");
    } catch (err) {
      alert("Failed to send email: " + err.message);
    }
  };

  if (!currentUser) return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700 dark:text-gray-300">
      <h1 className="text-3xl font-bold mb-2">No user logged in</h1>
      <p>Please login to view your account details.</p>
    </div>
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Account Dashboard</h1>
        
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-300 dark:border-gray-700">
          {["profile","security","activity"].map(tab => (
            <button
              key={tab}
              className={`px-3 py-2 font-medium border-b-2 ${activeTab===tab ? "border-blue-500 text-blue-500":"border-transparent"}`}
              onClick={()=>setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase()+tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
          {/* Profile */}
          {activeTab==="profile" && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-300 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="relative">
                    <img
                      src={profileForm.photoURL}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border border-gray-400 dark:border-gray-600"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-semibold text-blue-400">User Information</h2>
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {profileForm.displayName}</p>
                      <p><strong>Phone:</strong> {profileForm.phoneNumber || "N/A"}</p>
                      <p><strong>Email:</strong> {currentUser.email}</p>
                      <p><strong>Provider:</strong> {currentUser.providerData?.[0]?.providerId || "Unknown"}</p>
                      <p><strong>Email Verified:</strong> {currentUser.emailVerified ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-300 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-green-400 mb-3">Device & System Info</h2>
                {Object.entries(deviceInfo).map(([key, val]) => (
                  <p key={key}>
                    <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {val}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab==="security" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-300 dark:border-gray-700 space-y-4">
              <h2 className="text-xl font-semibold text-green-400">Security Settings</h2>
              <p><strong>Email Verified:</strong> {currentUser.emailVerified ? "Yes":"No"}</p>
              {!currentUser.emailVerified && <button onClick={handleSendVerification} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">Send Verification Email</button>}
            </div>
          )}

         
        {/* Activity */}
{activeTab === "activity" && (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-300 dark:border-gray-700">
    <h2 className="text-xl font-semibold text-yellow-400 mb-3">Recent Activity</h2>
    {activityLogs.length === 0 ? (
      <p>No recent activity</p>
    ) : (
      <div className="border-b border-gray-300 dark:border-gray-700 pb-2">
        {Object.entries(activityLogs[0]).map(([k, v]) => (
          <p key={k}>
            <strong>{k.replace(/([A-Z])/g, " $1")}:</strong> {v}
          </p>
        ))}
      </div>
    )}
  </div>
)}


          {/* Logout */}
        <div className="mt-8 flex justify-center">
  <motion.button
    whileTap={{ scale: 0.8 }} // animation effect
    onTap={() => {
      // Trigger animation first, then logout after 200ms
      setTimeout(handleLogout, 700);
    }}
    disabled={isLoggingOut}
  >
    <LogoutButton animate={isLoggingOut} />
  </motion.button>
</div>

        </motion.div>
      </div>
    </div>
  );
};

export default Account;
