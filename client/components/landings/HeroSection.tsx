import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * HeroSection component represents the landing page's main hero section.
 * It includes a headline, subheadline, call-to-action buttons, and a new mark.
 * 
 * Key Features:
 * - Animated motion effects using Framer Motion
 * - Responsive design with Tailwind CSS
 * - Live Demo and Watch Demo buttons
 * - "New" mark to highlight recent updates
 */
const HeroSection: React.FC = () => {
  // State variables for business idea, selected location, and animated text
  const [businessConcept, setBusinessConcept] = useState('');
  const [targetMarketLocation, setTargetMarketLocation] = useState('');
  const [animatedTypingText, setAnimatedTypingText] = useState('');

  // Memoized array of placeholder texts for animated typing effect
  const placeholderTexts = useMemo(() => [
    'AI-powered coffee shop in San Francisco',
    'Sustainable fashion brand in London',
    'Tech startup targeting remote workers',
    'Eco-friendly food delivery service',
    'Online learning platform for professionals'
  ], []);

  // Animation variants for staggered entrance effects
  const containerAnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  // Variants for individual elements to create smooth entrance animation
  const itemAnimationVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Effect hook to handle animated typing effect
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseTime = 2000;
    let isMounted = true;

    const type = () => {
      if (!isMounted) return;

      const fullText = placeholderTexts[currentIndex];
      const currentText = isDeleting 
        ? fullText.slice(0, animatedTypingText.length - 1) 
        : fullText.slice(0, animatedTypingText.length + 1);

      setAnimatedTypingText(currentText);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => { isDeleting = true; }, pauseTime);
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % placeholderTexts.length;
      }

      setTimeout(type, isDeleting ? 50 : typingSpeed);
    };

    type();

    return () => {
      isMounted = false;
    };
  }, [animatedTypingText.length, placeholderTexts]);

  // Function to handle market analysis
  const handleMarketAnalysis = () => {
    // Implement market analysis logic
    console.log('Analyzing market for:', { businessConcept, targetMarketLocation });
  };

  return (
    // Full-width container with centered content and responsive padding
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerAnimationVariants}
      className="hero-section__container flex-grow mx-auto w-full max-w-7xl px-4 pt-32 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white"
    >
      <motion.article 
        variants={itemAnimationVariants}
        className="hero-section__market-analysis-panel text-left mb-8 order-1 lg:order-2"
      >
        <div className="hero-section__market-analysis-card bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="hero-section__business-concept-wrapper relative">
            <textarea 
              className="hero-section__business-concept-input w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-custom focus:border-custom resize-none shadow-sm transition-all duration-300 mb-4"
              placeholder={`Enter your business concept (e.g., ${animatedTypingText})`}
              value={businessConcept}
              onChange={(e) => setBusinessConcept(e.target.value)}
            ></textarea>
          </div>

          <div className="hero-section__location-selector-wrapper relative">
            <div className="hero-section__location-selector-container relative">
              <div className="hero-section__location-icon-wrapper absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <i className="hero-section__location-icon fas fa-globe-americas text-custom opacity-70"></i>
              </div>
              <select 
                className="hero-section__location-select 
                  w-full 
                  pl-10 
                  pr-12 
                  py-3 
                  bg-white 
                  border 
                  border-gray-300 
                  rounded-xl 
                  appearance-none 
                  focus:ring-2 
                  focus:ring-custom 
                  focus:border-custom 
                  shadow-sm 
                  transition-all 
                  duration-300 
                  text-gray-700 
                  hover:border-custom 
                  cursor-pointer"
                value={targetMarketLocation}
                onChange={(e) => setTargetMarketLocation(e.target.value)}
                aria-label="Select target market location"
              >
                <option value="" disabled>Select Location</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="eu">European Union</option>
                <option value="apac">Asia Pacific</option>
              </select>
              <div className="hero-section__location-dropdown-icon-wrapper absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div
                  className="hero-section__location-dropdown-icon-container 
                    w-10 
                    h-10 
                    flex 
                    items-center 
                    justify-center 
                    rounded-full 
                    transition-all 
                    duration-300 
                    group"
                  initial={{ scale: 1, backgroundColor: 'transparent' }}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: 'rgba(var(--custom-rgb), 0.1)' 
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 10 
                  }}
                >
                  <motion.i 
                    className="hero-section__location-dropdown-icon"
                    initial={{ rotate: 0, opacity: 0.6 }}
                    whileHover={{ 
                      rotate: 180, 
                      opacity: 1 
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 15 
                    }}
                  ></motion.i>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-section__market-analysis-button w-full rounded-xl bg-custom py-4 text-black font-semibold hover:bg-custom/90 flex items-center justify-center gap-3 transform transition-all duration-300 shadow-lg mt-6"
            onClick={handleMarketAnalysis}
          >
            <i className="hero-section__market-analysis-button-icon fas fa-chart-line text-green-500"></i>
            Analyze Market
          </motion.button>

          <div className="hero-section__how-it-works-panel bg-gray-50 p-6 rounded-xl border border-gray-200 mt-8">
            <div className="hero-section__how-it-works-content flex items-start gap-4">
              <i className="hero-section__how-it-works-icon fas fa-lightbulb text-yellow-500 mt-1"></i>
              <div className="hero-section__how-it-works-text-container">
                <h3 className="hero-section__how-it-works-title font-medium text-gray-900 mb-2">How it works</h3>
                <ol className="hero-section__how-it-works-steps text-gray-600 space-y-2">
                  <li className="hero-section__how-it-works-step">1. Enter your business concept or idea in detail</li>
                  <li className="hero-section__how-it-works-step">2. Select your target market location</li>
                  <li className="hero-section__how-it-works-step">3. Click analyze to get comprehensive market insights</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      <motion.article 
        variants={itemAnimationVariants}
        className="hero-section__content-panel text-left mb-8 order-2 lg:order-1"
      >
        <motion.mark 
          whileHover={{ scale: 1.05 }}
          className="hero-section__new-feature-mark inline-flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full mb-6"
        >
          <span className="hero-section__new-feature-label text-custom font-semibold">New</span>
          <span className="hero-section__new-feature-description text-gray-600 text-sm">Analyze 10x to Grow 100x with us</span>
        </motion.mark>
        
        <h1 className="hero-section__main-headline text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
          Transform Your Market Research with AI Intelligence
        </h1>
        
        <p className="hero-section__subheadline text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
          Get instant, data-driven market insights powered by advanced AI technology. 
          Make smarter business decisions faster.
        </p>
        
        <nav className="hero-section__cta-navigation flex flex-col gap-4 mb-8">
          <div className="hero-section__cta-button-group flex gap-4 mb-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero-section__primary-cta-button relative overflow-hidden bg-custom hover:bg-custom/90 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
            >
              <span className="hero-section__primary-cta-text">Start for free</span>
              <i className="hero-section__primary-cta-icon fas fa-arrow-right text-black transition-transform duration-300 group-hover:translate-x-1"></i>
              <span className="hero-section__primary-cta-overlay absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-5"></span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hero-section__secondary-cta-button relative overflow-hidden bg-transparent border-2 border-custom text-custom hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group rounded-full px-6 py-3"
            >
              <div className="hero-section__secondary-cta-icon-wrapper flex items-center justify-center relative">
                <motion.div
                  className="hero-section__secondary-cta-icon-background absolute inset-0 bg-custom opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                ></motion.div>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  className="hero-section__secondary-cta-icon relative z-10 w-6 h-6 text-custom transition-transform duration-300 group-hover:scale-110"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                >
                  <path 
                    fill="currentColor" 
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14V8l6 4-6 4z"
                  />
                </motion.svg>
              </div>
              <span className="hero-section__secondary-cta-text ml-2 font-medium transition-colors duration-300 group-hover:text-opacity-80">
                Live Demo
              </span>
              <motion.div 
                className="hero-section__secondary-cta-hover-effect absolute bottom-0 left-0 w-full h-1 bg-custom origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              ></motion.div>
            </motion.button>
          </div>
        </nav>

        <div className="hero-section__performance-stats grid grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="hero-section__performance-stat text-center">
            <div className="hero-section__performance-stat-value text-3xl font-bold text-custom">10x</div>
            <div className="hero-section__performance-stat-label text-sm text-gray-600">Market Speed</div>
          </div>
          <div className="hero-section__performance-stat text-center">
            <div className="hero-section__performance-stat-value text-3xl font-bold text-custom">95%</div>
            <div className="hero-section__performance-stat-label text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="hero-section__performance-stat text-center">
            <div className="hero-section__performance-stat-value text-3xl font-bold text-custom">24/7</div>
            <div className="hero-section__performance-stat-label text-sm text-gray-600">AI Support</div>
          </div>
        </div>
      </motion.article>
    </motion.section>
  );
};

export default HeroSection;
