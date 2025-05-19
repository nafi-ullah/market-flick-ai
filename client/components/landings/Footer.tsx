import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SiteFooterComponent provides comprehensive site navigation and social links.
 * 
 * Key Features:
 * - Responsive footer layout
 * - Site navigation links
 * - Social media integration
 * - Copyright information
 * - Newsletter signup
 */
const SiteFooterComponent: React.FC = () => {
  // Current year for dynamic copyright notice
  const currentYear = new Date().getFullYear();

  // Site navigation link categories
  const navigationLinkCategories = [
    {
      category: 'Product',
      links: [
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Demo', path: '/demo' },
        { name: 'Integrations', path: '/integrations' }
      ]
    },
    {
      category: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
        { name: 'Blog', path: '/blog' }
      ]
    },
    {
      category: 'Resources',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Documentation', path: '/docs' },
        { name: 'Guides', path: '/guides' },
        { name: 'Community', path: '/community' }
      ]
    }
  ];

  // Social media platform configurations
  const socialMediaPlatforms = [
    {
      name: 'LinkedIn',
      icon: 'fa-linkedin',
      url: 'https://linkedin.com/company/marketflick',
      color: 'text-blue-600 hover:text-blue-700'
    },
    {
      name: 'Twitter',
      icon: 'fa-twitter',
      url: 'https://twitter.com/marketflick',
      color: 'text-blue-400 hover:text-blue-500'
    },
    {
      name: 'GitHub',
      icon: 'fa-github',
      url: 'https://github.com/marketflick',
      color: 'text-gray-800 hover:text-black'
    }
  ];

  // Newsletter signup handler
  const handleNewsletterSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem('newsletterEmail') as HTMLInputElement;
    const userEmail = emailInput.value;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(userEmail)) {
      console.log('Newsletter signup:', userEmail);
      // TODO: Implement actual newsletter signup logic
      emailInput.value = '';
      alert('Thank you for subscribing!');
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <img 
              src="/logo-white.svg" 
              alt="Market Flick Logo" 
              className="h-10"
            />
            <span className="text-2xl font-bold">Market Flick</span>
          </div>
          <p className="text-gray-400 mb-6">
            AI-powered market research platform transforming business insights.
          </p>

          {/* Newsletter Signup */}
          <form 
            onSubmit={handleNewsletterSignup}
            className="flex"
          >
            <input 
              type="email" 
              name="newsletterEmail"
              placeholder="Enter your email" 
              required
              className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-custom"
            />
            <button 
              type="submit"
              className="bg-custom text-white px-4 py-2 rounded-r-lg hover:bg-custom-dark transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Navigation Links */}
        {navigationLinkCategories.map((linkCategory, index) => (
          <div key={index}>
            <h4 className="text-lg font-semibold mb-4">
              {linkCategory.category}
            </h4>
            <ul className="space-y-3">
              {linkCategory.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            Connect With Us
          </h4>
          <div className="flex space-x-4">
            {socialMediaPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${platform.color} transition-colors`}
              >
                <i className={`fab ${platform.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright and Legal Links */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center">
        <p className="text-gray-500">
          &copy; {currentYear} Market Flick. All rights reserved.
        </p>
        <div className="mt-4 space-x-4">
          <Link 
            to="/terms" 
            className="text-gray-400 hover:text-white text-sm"
          >
            Terms of Service
          </Link>
          <Link 
            to="/privacy" 
            className="text-gray-400 hover:text-white text-sm"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooterComponent;
