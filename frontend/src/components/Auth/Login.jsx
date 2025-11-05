import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import './Auth.css';
import logo from '../../assets/Untitled_design__16_-removebg-preview.png';

const Login = ({ isActive, onToggle }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|co|in)$/i;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      console.log('Login data:', formData);
      // navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Login failed. Please try again.' });
    }
  };

  return (
    <div className="form-container sign-in-container">
      {/* Logo Section */}
      <div className="auth-logo">
        <div className="logo-image">
          <img src={logo} alt="New Rising Star Academy" />
        </div>
        <h1 className="academy-name">NEW RISING STAR</h1>
        <p className="academy-subtitle">BADMINTON ACADEMY</p>
      </div>

      {/* Welcome Text */}
      <h2 className="welcome-text">Welcome Back</h2>

      {/* Social Login */}
      <div className="social-login">
        <div className="social-icons">
          <div className="social-icon google" onClick={() => console.log('Google login')}>
            <FaGoogle />
          </div>
          <div className="social-icon facebook" onClick={() => console.log('Facebook login')}>
            <FaFacebook />
          </div>
          <div className="social-icon twitter" onClick={() => console.log('Twitter login')}>
            <FaTwitter />
          </div>
        </div>
      </div>

      <div className="divider">
        <span>OR</span>
      </div>

      {/* Login Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-text">⚠ {errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`form-input ${errors.password ? 'error' : ''}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="error-text">⚠ {errors.password}</span>
          )}
        </div>

        {errors.submit && (
          <div className="error-text">{errors.submit}</div>
        )}

        <button type="submit" className="submit-btn">
          SIGN IN
        </button>
      </form>

      {/* Forgot Password */}
      <div className="forgot-password">
        <a href="/forgot-password">Forgot password?</a>
      </div>
    </div>
  );
};

export default Login;
