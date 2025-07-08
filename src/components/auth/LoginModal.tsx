"use client";

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, X, Mail, Phone, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface LoginRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

interface FormData {
  emailOrPhone: string;
  password: string;
  confirmPassword?: string;
}

interface FormErrors {
  emailOrPhone?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

// Placeholder Firebase functions - replace with actual Firebase implementation
const signInWithEmail = async (email: string, password: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { uid: '123', email, displayName: 'User' };
};

const signUpWithEmail = async (email: string, password: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { uid: '123', email, displayName: 'User' };
};

const signInWithGoogle = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { uid: '123', email: 'user@example.com', displayName: 'Google User' };
};

const sendPasswordResetEmail = async (email: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [inputMethod, setInputMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate email or phone
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = `${inputMethod === 'email' ? 'Email' : 'Phone number'} is required`;
    } else if (inputMethod === 'email' && !validateEmail(formData.emailOrPhone)) {
      newErrors.emailOrPhone = 'Please enter a valid email address';
    } else if (inputMethod === 'phone' && !validatePhone(formData.emailOrPhone)) {
      newErrors.emailOrPhone = 'Please enter a valid phone number';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Validate confirm password for registration
    if (activeTab === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (activeTab === 'register' && !acceptTerms) {
      setErrors({ general: 'You must accept the terms and conditions' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let user;
      if (activeTab === 'login') {
        user = await signInWithEmail(formData.emailOrPhone, formData.password);
      } else {
        user = await signUpWithEmail(formData.emailOrPhone, formData.password);
      }
      
      onLoginSuccess(user);
      onClose();
    } catch (error: any) {
      setErrors({ general: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const user = await signInWithGoogle();
      onLoginSuccess(user);
      onClose();
    } catch (error: any) {
      setErrors({ general: error.message || 'Google sign-in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.emailOrPhone || inputMethod !== 'email') {
      setErrors({ emailOrPhone: 'Please enter your email address first' });
      return;
    }

    if (!validateEmail(formData.emailOrPhone)) {
      setErrors({ emailOrPhone: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(formData.emailOrPhone);
      setErrors({ general: 'Password reset email sent! Check your inbox.' });
    } catch (error: any) {
      setErrors({ general: error.message || 'Failed to send reset email.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ emailOrPhone: '', password: '', confirmPassword: '' });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setRememberMe(false);
    setAcceptTerms(false);
  };

  const switchTab = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={handleClose}
      />
      
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative flex items-center justify-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-charcoal">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button
            onClick={handleClose}
            className="absolute right-6 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => switchTab('login')}
            disabled={isLoading}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'login'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => switchTab('register')}
            disabled={isLoading}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'register'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Google Sign-in */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-4 h-11"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <Chrome className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Input Method Toggle */}
          <div className="flex mb-4 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setInputMethod('email')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
                inputMethod === 'email'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setInputMethod('phone')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all ${
                inputMethod === 'phone'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Phone Input */}
            <div>
              <Input
                type={inputMethod === 'email' ? 'email' : 'tel'}
                placeholder={inputMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                disabled={isLoading}
                className={errors.emailOrPhone ? 'border-red-500 focus:border-red-500' : ''}
              />
              {errors.emailOrPhone && (
                <p className="mt-1 text-sm text-red-500">{errors.emailOrPhone}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
                className={errors.password ? 'border-red-500 focus:border-red-500' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password (Register only) */}
            {activeTab === 'register' && (
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  disabled={isLoading}
                  className={errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Remember Me / Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id={activeTab === 'login' ? 'remember-me' : 'accept-terms'}
                checked={activeTab === 'login' ? rememberMe : acceptTerms}
                onCheckedChange={(checked) => {
                  if (activeTab === 'login') {
                    setRememberMe(checked as boolean);
                  } else {
                    setAcceptTerms(checked as boolean);
                  }
                }}
                disabled={isLoading}
              />
              <label
                htmlFor={activeTab === 'login' ? 'remember-me' : 'accept-terms'}
                className="text-sm text-gray-600 leading-5 cursor-pointer"
              >
                {activeTab === 'login' ? (
                  'Remember me'
                ) : (
                  <>
                    I accept the{' '}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </>
                )}
              </label>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : activeTab === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Forgot Password (Login only) */}
            {activeTab === 'login' && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className="text-sm text-primary hover:underline disabled:opacity-50"
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 text-center text-sm text-gray-500">
          {activeTab === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => switchTab('register')}
                disabled={isLoading}
                className="text-primary hover:underline disabled:opacity-50"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => switchTab('login')}
                disabled={isLoading}
                className="text-primary hover:underline disabled:opacity-50"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};