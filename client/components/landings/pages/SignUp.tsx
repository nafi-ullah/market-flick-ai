import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * SignUp page allows new users to create an account.
 * 
 * Key Features:
 * - Full name, email, and password input
 * - Form validation
 * - Error handling
 * - Social signup options
 * - Animated transitions
 * - Responsive design
 */
const SignUp: React.FC = () => {
  // State management for form inputs and validation
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userAgreementConsent, setUserAgreementConsent] = useState(false);

  /**
   * Validate full name input
   * @param {string} inputName - Name to validate
   * @returns {boolean} - Whether name is valid
   */
  const validateFullName = (inputName: string) => {
    return inputName.trim().length >= 2;
  };

  /**
   * Validate email input
   * @param {string} inputEmail - Email to validate
   * @returns {boolean} - Whether email is valid
   */
  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  /**
   * Validate password input
   * @param {string} inputPassword - Password to validate
   * @returns {boolean} - Whether password meets requirements
   */
  const validatePassword = (inputPassword: string) => {
    return inputPassword.length >= 8;
  };

  /**
   * Validate password confirmation
   * @param {string} inputPassword - Original password
   * @param {string} inputConfirmPassword - Confirmation password
   * @returns {boolean} - Whether passwords match
   */
  const validateConfirmPassword = (inputPassword: string, inputConfirmPassword: string) => {
    return inputPassword === inputConfirmPassword;
  };

  /**
   * Handle full name input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setUserFullName(inputName);
  };

  /**
   * Handle email input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setUserEmail(inputEmail);
  };

  /**
   * Handle password input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setUserPassword(inputPassword);
  };

  /**
   * Handle password confirmation input changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputConfirmPassword = e.target.value;
    setUserConfirmPassword(inputConfirmPassword);
  };

  /**
   * Submit sign-up request
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (userPassword !== userConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!userAgreementConsent) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    // Implement sign-up logic here
    console.log('Sign Up', { userFullName, userEmail, userPassword });
  };

  /**
   * Handle social signup (Google)
   */
  const handleGoogleSignUp = () => {
    // Implement Google Sign-Up logic
    console.log('Google Sign-Up');
  };

  return (
    // Full-page container with centered content
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-['Inter'] flex flex-col justify-center items-center px-4">
      {/* Sign Up Card */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Empowering Smarter Business Decisions
          </h2>
        </div>

        {/* Sign Up Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Social Login Options */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 px-4 text-gray-700 font-medium mb-6 hover:bg-gray-50 transition-colors"
          >
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E" 
              alt="Google" 
              className="w-6 h-6"
            />
            Sign up with Google
          </motion.button>

          {/* Form Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-500 bg-white">or continue with</span>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label 
                htmlFor="userFullName" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input 
                  type="text" 
                  id="userFullName" 
                  value={userFullName}
                  onChange={handleFullNameChange}
                  required
                  className="block w-full pl-10 rounded-lg border-gray-300 focus:border-custom focus:ring focus:ring-custom focus:ring-opacity-50" 
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label 
                htmlFor="userEmail" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input 
                  type="email" 
                  id="userEmail" 
                  value={userEmail}
                  onChange={handleEmailChange}
                  required
                  className="block w-full pl-10 rounded-lg border-gray-300 focus:border-custom focus:ring focus:ring-custom focus:ring-opacity-50" 
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="userPassword" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="userPassword" 
                  value={userPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  className="block w-full pl-10 pr-10 rounded-lg border-gray-300 focus:border-custom focus:ring focus:ring-custom focus:ring-opacity-50" 
                  placeholder="Create a password"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600`}></i>
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label 
                htmlFor="userConfirmPassword" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input 
                  type="password" 
                  id="userConfirmPassword" 
                  value={userConfirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  className="block w-full pl-10 rounded-lg border-gray-300 focus:border-custom focus:ring focus:ring-custom focus:ring-opacity-50" 
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="userAgreementConsent" 
                checked={userAgreementConsent}
                onChange={() => setUserAgreementConsent(!userAgreementConsent)}
                className="h-4 w-4 text-custom border-gray-300 rounded focus:ring-custom"
              />
              <label 
                htmlFor="userAgreementConsent" 
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{' '}
                <Link 
                  to="/terms" 
                  className="text-custom hover:text-custom-600"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link 
                  to="/privacy" 
                  className="text-custom hover:text-custom-600"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full bg-custom text-white font-medium py-2.5 rounded-lg hover:bg-custom-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom transition-colors"
            >
              Create Account
            </motion.button>
          </form>
        </motion.div>

        {/* Sign In Navigation */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/signin" 
            className="font-medium text-custom hover:text-custom-600"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
