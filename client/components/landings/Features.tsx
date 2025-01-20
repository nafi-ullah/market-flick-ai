import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiBarChart2, 
  FiGlobe, 
  FiPieChart, 
  FiTrendingUp,
  FiFileText,
  FiCheckCircle,
  FiTarget,
  FiGrid,
  FiAward
} from 'react-icons/fi';

/**
 * DetailedFeaturesSection showcases key product capabilities and unique selling points.
 * 
 * Key Features:
 * - Grid layout of feature cards
 * - Responsive design using Tailwind CSS
 * - Icons representing different market research capabilities
 */
const DetailedFeaturesSection: React.FC = () => {
  // Detailed feature list with comprehensive descriptions
  const marketResearchCapabilities = [
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: 'Comprehensive Market Analysis',
      description: 'Assess your idea\'s viability with SWOT, PESTEL, and Porter\'s Five Forces evaluations.',
      color: 'from-blue-600/20 to-purple-600/20'
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: 'Strategic Business Recommendations',
      description: 'Receive AI-powered strategic recommendations and actionable insights.',
      color: 'from-yellow-600/20 to-orange-600/20'
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: 'Customized Business Strategies',
      description: 'Get tailored strategies and frameworks for planning and execution.',
      color: 'from-purple-600/20 to-pink-600/20'
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: 'Website Analysis',
      description: 'Evaluate online presence and optimize digital strategy.',
      color: 'from-cyan-600/20 to-blue-600/20'
    },
    {
      icon: <FiGrid className="w-6 h-6" />,
      title: 'AI-Powered Consulting',
      description: 'Get AI-powered business advice and strategic guidance.',
      color: 'from-emerald-600/20 to-teal-600/20'
    },
    {
      icon: <FiFileText className="w-6 h-6" />,
      title: 'Pitch Deck Creation',
      description: 'Create compelling investor presentations with AI assistance.',
      color: 'from-rose-600/20 to-pink-600/20'
    },
    {
      icon: <FiPieChart className="w-6 h-6" />,
      title: 'Report Generation',
      description: 'Customize and export professional market analysis reports.',
      color: 'from-lime-600/20 to-green-600/20'
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: 'Idea Validation',
      description: 'Get instant feedback on your business idea\'s potential.',
      color: 'from-green-600/20 to-emerald-600/20'
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: 'Competitive Analysis',
      description: 'Analyze competitors and identify market advantages.',
      color: 'from-amber-600/20 to-yellow-600/20'
    }
  ];

  return (
    <section 
      id="features-section"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Your Business Potential
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your business idea into reality with our comprehensive suite of AI-powered tools
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {marketResearchCapabilities.map((capability, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100
                  }
                }
              }}
              whileHover={{ y: -5 }}
              className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500/30 hover:shadow-2xl transition-all duration-300 group"
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1
                  }
                }}
                className={`w-12 h-12 bg-gradient-to-r ${capability.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {capability.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {capability.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DetailedFeaturesSection;
