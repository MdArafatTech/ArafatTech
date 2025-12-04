import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Go to home after logout
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-300">
        <h1 className="text-2xl font-bold mb-2">No user logged in</h1>
        <p>Please login to view your account details.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto px-4 sm:px-6 mt-10 mb-10 text-white">
      <div className="overflow-hidden border border-gray-700 rounded-lg shadow-lg p-6 bg-black/50 backdrop-blur">
        <h1 className="text-3xl font-bold mb-6 text-center">My Account</h1>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border border-gray-600"
            />
          ) : (
            <img
              src="/default-profile-pic.jpg" // Replace with your actual default image path
              alt="Default Profile"
              className="w-32 h-32 rounded-full object-cover border border-gray-600"
            />
          )}

          <div className="flex-1 space-y-2">
            <p><strong>Name:</strong> {currentUser.displayName || "Not Provided"}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Email Verified:</strong> {currentUser.emailVerified ? "Yes" : "No"}</p>
            <p><strong>Phone:</strong> {currentUser.phoneNumber || "Not Provided"}</p>
            <p><strong>UID:</strong> {currentUser.uid}</p>
            <p>
              <strong>Provider:</strong>{" "}
              {currentUser.providerData[0]?.providerId === "google.com"
                ? "Google"
                : "Email/Password"}
            </p>
            <p><strong>Account Created:</strong> {currentUser.metadata.creationTime}</p>
            <p><strong>Last Login:</strong> {currentUser.metadata.lastSignInTime}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded-xl hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
