import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import './Auth.css';
import logo from '../../assets/Untitled_design__16_-removebg-preview.png';

const Signup = ({ isActive, onToggle, setUserEmail }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|co|in)$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$&_!*])[A-Za-z\d@#$&_!*]{8,}$/;
    return passwordRegex.test(password);
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be 8+ chars with 1 uppercase & 1 special char';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      console.log('Signup data:', formData);
      setUserEmail(formData.email);
      navigate('/verify-otp');
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'Signup failed. Please try again.' });
    }
  };

  return (
    <div className="form-container sign-up-container">
      {/* Logo Section */}
      <div className="auth-logo">
        <div className="logo-image">
          <img src={logo} alt="New Rising Star Academy" />
        </div>
        <h1 className="academy-name">NEW RISING STAR</h1>
        <p className="academy-subtitle">BADMINTON ACADEMY</p>
      </div>

      {/* Welcome Text */}
      <h2 className="welcome-text">Create Account</h2>

      {/* Social Login */}
      <div className="social-login">
        <div className="social-icons">
          <div className="social-icon google" onClick={() => console.log('Google signup')}>
            <FaGoogle />
          </div>
          <div className="social-icon facebook" onClick={() => console.log('Facebook signup')}>
            <FaFacebook />
          </div>
          <div className="social-icon twitter" onClick={() => console.log('Twitter signup')}>
            <FaTwitter />
          </div>
        </div>
      </div>

      <div className="divider">
        <span>OR</span>
      </div>

      {/* Signup Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className="error-text">⚠ {errors.name}</span>
          )}
        </div>

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

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error-text">⚠ {errors.confirmPassword}</span>
          )}
        </div>

        {errors.submit && (
          <div className="error-text">{errors.submit}</div>
        )}

        <button type="submit" className="submit-btn">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default Signup;
