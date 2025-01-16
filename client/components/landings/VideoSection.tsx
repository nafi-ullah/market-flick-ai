import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProductVideoSection showcases product capabilities through an embedded video
 * and key product highlights.
 * 
 * Key Features:
 * - Responsive video embed
 * - Animated product highlights
 * - Framer Motion animations
 * - Engaging product demonstration
 */
const ProductVideoSection: React.FC = () => {
  // Animation variants for section container
  const sectionContainerAnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Animation variants for individual section elements
  const sectionElementAnimationVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Product capability highlights
  const productCapabilityHighlights = [
    {
      icon: 'fa-chart-line',
      title: 'Advanced Market Analysis',
      description: 'Discover deep insights with our AI-powered market research tools.'
    },
    {
      icon: 'fa-globe',
      title: 'Global Market Intelligence',
      description: 'Access comprehensive market data across multiple industries and regions.'
    },
    {
      icon: 'fa-robot',
      title: 'AI-Driven Recommendations',
      description: 'Receive actionable strategic insights tailored to your business needs.'
    }
  ];

  return (
    // Video section with gradient background
    <motion.section 
      id="product-video-section"
      initial="hidden"
      animate="visible"
      variants={sectionContainerAnimationVariants}
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          variants={sectionElementAnimationVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See Our AI Market Research in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our AI-powered platform transforms complex market data into actionable insights. 
            Watch a quick demo to understand how we can help you make smarter business decisions.
          </p>
        </motion.div>

        {/* Video and Highlights Container */}
        <motion.div
          variants={sectionContainerAnimationVariants}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Video Embed Column */}
          <motion.div 
            variants={sectionElementAnimationVariants}
            className="relative rounded-xl overflow-hidden shadow-xl"
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.youtube.com/embed/3TXTRg4gN6A?autoplay=0&controls=1" 
                title="Market Flick AI Market Research Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </motion.div>

          {/* Product Highlights Column */}
          <motion.div 
            variants={sectionElementAnimationVariants}
            className="space-y-8"
          >
            {productCapabilityHighlights.map((highlight, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-6 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl text-custom">
                  <i className={`fas ${highlight.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductVideoSection;
