import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProductFrequentlyAskedQuestionsSection provides a comprehensive FAQ experience.
 * 
 * Key Features:
 * - Expandable/collapsible FAQ items
 * - Smooth animations for interactions
 * - Responsive design
 * - Accessibility considerations
 */
const ProductFrequentlyAskedQuestionsSection: React.FC = () => {
  // State to track which FAQ item is currently expanded
  const [expandedFaqItemId, setExpandedFaqItemId] = useState<number | null>(null);

  // FAQ content configuration
  const faqItems = [
    {
      id: 1,
      question: 'What is Market Flick?',
      answer: 'Market Flick is an AI-powered market research platform that helps businesses gain actionable insights quickly and efficiently.'
    },
    {
      id: 2,
      question: 'How does the AI work?',
      answer: 'Our advanced AI analyzes vast amounts of market data, identifying trends, patterns, and insights that would take humans weeks to uncover.'
    },
    {
      id: 3,
      question: 'Do you offer a free trial?',
      answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required.'
    },
    {
      id: 4,
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, MasterCard, American Express) and PayPal.'
    },
    {
      id: 5,
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption and follow strict data protection regulations to ensure your information remains confidential.'
    },
    {
      id: 6,
      question: 'What kind of support do you provide?',
      answer: 'We offer 24/7 email support, live chat during business hours, and comprehensive documentation for self-service.'
    }
  ];

  // Toggle FAQ item expansion
  const toggleFaqItemExpansion = (itemId: number) => {
    setExpandedFaqItemId(prevExpandedId => 
      prevExpandedId === itemId ? null : itemId
    );
  };

  // Animation variants for FAQ items
  const faqItemAnimationVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3
      }
    }
  };

  // Animation variants for section entrance
  const sectionEntranceAnimationVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionEntranceAnimationVariants}
        className="max-w-4xl mx-auto"
      >
        {/* Section Title */}
        <motion.h2 
          variants={sectionEntranceAnimationVariants}
          className="text-4xl font-bold text-center mb-12 text-gray-900"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Items */}
        {faqItems.map((faqItem) => (
          <div 
            key={faqItem.id}
            className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden"
          >
            {/* FAQ Question */}
            <button
              onClick={() => toggleFaqItemExpansion(faqItem.id)}
              className="w-full text-left px-6 py-4 flex justify-between items-center 
                hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
              aria-expanded={expandedFaqItemId === faqItem.id}
              aria-controls={`faq-answer-${faqItem.id}`}
            >
              <span className="text-lg font-medium text-gray-900">
                {faqItem.question}
              </span>
              <i 
                className={`fas ${
                  expandedFaqItemId === faqItem.id 
                  ? 'fa-chevron-up' 
                  : 'fa-chevron-down'
                } text-gray-600 transition-transform duration-300`}
              ></i>
            </button>

            {/* FAQ Answer */}
            <AnimatePresence>
              {expandedFaqItemId === faqItem.id && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={faqItemAnimationVariants}
                  id={`faq-answer-${faqItem.id}`}
                  className="px-6 pb-4 text-gray-700"
                >
                  {faqItem.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductFrequentlyAskedQuestionsSection;
