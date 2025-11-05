import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import './Auth.css';
import logo from '../../assets/Untitled_design__16_-removebg-preview.png';

const OTPVerification = ({ userEmail }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    // Timer for resend button
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    try {
      // API call to verify OTP will go here
      console.log('Verifying OTP:', otpString, 'for email:', userEmail);
      
      // On success, navigate to dashboard or home
      // navigate('/dashboard');
      
      alert('OTP Verified Successfully!');
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      // API call to resend OTP will go here
      console.log('Resending OTP to:', userEmail);
      
      setResendTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      
      alert('OTP resent successfully!');
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <>
      {/* Decorative stars */}
      <div className="star"></div>
      <div className="star"></div>
      <div className="star"></div>

      <div className="auth-card">
        {/* Back Button */}
        <div className="back-button" onClick={() => navigate(-1)}>
          <IoArrowBack />
        </div>

        {/* Logo Section */}
        <div className="auth-logo">
          <div className="logo-image">
            <img src={logo} alt="New Rising Star Academy" />
          </div>
        </div>

        {/* OTP Verification Content */}
        <div className="otp-container">
          <h2 className="otp-title">Verification Code</h2>
          <p className="otp-description">
            Please enter the 6-digit code sent to your email.
            <br />
            <strong>{userEmail || 'your registered email'}</strong>
          </p>

          {/* OTP Input Fields */}
          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            {error && (
              <div className="error-text" style={{ justifyContent: 'center' }}>
                ⚠ {error}
              </div>
            )}

            <button type="submit" className="submit-btn">
              VERIFY
            </button>
          </form>

          {/* Resend Code */}
          <div className="resend-code">
            Didn't receive the code?
            <button 
              onClick={handleResend} 
              disabled={!canResend}
            >
              {canResend ? 'Resend code' : `Resend in ${resendTimer}s`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;
