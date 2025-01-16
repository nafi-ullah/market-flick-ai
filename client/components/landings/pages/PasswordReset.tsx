import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * UserPasswordResetPage component for password recovery.
 * 
 * Key Features:
 * - Email-based password reset
 * - Form validation
 * - Error handling
 * - User feedback
 * - Responsive design
 */
const UserPasswordResetPage: React.FC = () => {
  // Navigation hook
  const navigateToPage = useNavigate();

  // Password reset state management
  const [userResetEmail, setUserResetEmail] = useState('');
  const [passwordResetStatus, setPasswordResetStatus] = useState<{
    type: 'idle' | 'processing' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: ''
  });

  // Animation variants for page entrance
  const pageAnimationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  // Animation variants for form elements
  const formElementAnimationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Handle email input changes
  const handleResetEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserResetEmail(e.target.value);
    // Reset status when user starts typing
    if (passwordResetStatus.type !== 'idle') {
      setPasswordResetStatus({ type: 'idle', message: '' });
    }
  };

  // Validate email input
  const validateResetEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle password reset request
  const handlePasswordResetRequest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    if (!validateResetEmail(userResetEmail)) {
      setPasswordResetStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    // Update status to processing
    setPasswordResetStatus({
      type: 'processing',
      message: 'Sending password reset instructions...'
    });

    try {
      // Simulated password reset logic
      // Replace with actual password reset service
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure
          Math.random() > 0.2 
            ? resolve(true) 
            : reject(new Error('Password reset failed'));
        }, 1500);
      });

      // Success scenario
      setPasswordResetStatus({
        type: 'success',
        message: 'Password reset instructions sent to your email'
      });

      // Optional: Auto-redirect after success
      setTimeout(() => {
        navigateToPage('/signin');
      }, 2500);

    } catch (error) {
      // Error scenario
      setPasswordResetStatus({
        type: 'error',
        message: 'Unable to send password reset instructions. Please try again.'
      });
    }
  };

  return (
    <motion.div
      variants={pageAnimationVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 px-4 py-12"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        {/* Page Header */}
        <motion.div 
          variants={formElementAnimationVariants}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive password reset instructions
          </p>
        </motion.div>

        {/* Password Reset Status Feedback */}
        {passwordResetStatus.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              px-4 py-3 rounded-lg text-center
              ${passwordResetStatus.type === 'success' 
                ? 'bg-green-50 border border-green-300 text-green-800'
                : passwordResetStatus.type === 'error'
                ? 'bg-red-50 border border-red-300 text-red-800'
                : 'bg-blue-50 border border-blue-300 text-blue-800'
              }
            `}
          >
            {passwordResetStatus.message}
          </motion.div>
        )}

        {/* Password Reset Form */}
        <motion.form 
          variants={formElementAnimationVariants}
          onSubmit={handlePasswordResetRequest}
          className="space-y-6"
        >
          {/* Email Input */}
          <div>
            <label htmlFor="userResetEmail" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-400"></i>
              </div>
              <input
                id="userResetEmail"
                name="userResetEmail"
                type="email"
                required
                value={userResetEmail}
                onChange={handleResetEmailChange}
                disabled={passwordResetStatus.type === 'processing' || passwordResetStatus.type === 'success'}
                className={`
                  appearance-none rounded-md relative block w-full px-3 py-3 pl-10 
                  border border-gray-300 placeholder-gray-500 text-gray-900 
                  focus:outline-none focus:ring-custom focus:border-custom focus:z-10 sm:text-sm
                  ${passwordResetStatus.type === 'processing' || passwordResetStatus.type === 'success' 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                  }
                `}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={
              passwordResetStatus.type === 'processing' || 
              passwordResetStatus.type === 'success'
            }
            className={`
              group relative w-full flex justify-center py-3 px-4 border border-transparent 
              text-sm font-medium rounded-md text-white 
              ${passwordResetStatus.type === 'processing' 
                ? 'bg-custom/50 cursor-not-allowed' 
                : passwordResetStatus.type === 'success'
                ? 'bg-green-500 cursor-not-allowed'
                : 'bg-custom hover:bg-custom-dark'
              } 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom
            `}
          >
            {passwordResetStatus.type === 'processing'
              ? 'Sending Instructions...'
              : passwordResetStatus.type === 'success'
              ? 'Instructions Sent'
              : 'Reset Password'
            }
          </button>
        </motion.form>

        {/* Sign In Redirect */}
        <motion.div 
          variants={formElementAnimationVariants}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link 
              to="/signin" 
              className="font-medium text-custom hover:text-custom-dark"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserPasswordResetPage;
