import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import OTPVerification from './components/Auth/otpVerification';
import './components/Auth/Auth.css';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [isSignupActive, setIsSignupActive] = useState(false);

  const AuthPage = () => (
    <div className="auth-container">
      <div className={`auth-card ${isSignupActive ? 'right-panel-active' : ''}`}>
        <Login isActive={!isSignupActive} onToggle={() => setIsSignupActive(false)} />
        <Signup
          isActive={isSignupActive}
          onToggle={() => setIsSignupActive(true)}
          setUserEmail={setUserEmail}
        />

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Already have an account? Sign in to continue your badminton journey with us</p>
              <button className="ghost-btn" onClick={() => setIsSignupActive(false)}>
                SIGN IN
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Not a Member?</h1>
              <p>Join New Rising Star Academy now and start your journey to becoming a badminton champion!</p>
              <button className="ghost-btn" onClick={() => setIsSignupActive(true)}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/verify-otp"
          element={
            <div className="auth-container">
              <OTPVerification userEmail={userEmail} />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
