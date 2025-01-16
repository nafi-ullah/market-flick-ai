import React from 'react';

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
  const marketResearchCapabilities: {
    icon: string;
    title: string;
    description: string;
    color: string;
  }[] = [
    {
      icon: 'fa-chart-line', 
      title: 'Comprehensive Market Analysis',
      description: 'Assess your idea\'s viability with SWOT, PESTEL, and Porter\'s Five Forces evaluations, helping you prepare for challenges and seize opportunities.',
      color: 'text-blue-500'
    },
    {
      icon: 'fa-lightbulb', 
      title: 'Strategic Business Recommendations',
      description: 'Receive AI-powered strategic recommendations and actionable insights to guide your business decisions and growth strategy.',
      color: 'text-yellow-500'
    },
    {
      icon: 'fa-briefcase', 
      title: 'Customized Business Strategies',
      description: 'Get tailored strategies and frameworks for planning and execution, equipping you to bring your vision to life.',
      color: 'text-purple-500'
    },
    {
      icon: 'fa-globe', 
      title: 'Website Analysis and Optimization',
      description: 'Evaluate online presence and optimize digital strategy.',
      color: 'text-cyan-500'
    },
    {
      icon: 'fa-robot', 
      title: 'AI-Powered Business Consulting',
      description: 'Get AI-powered business advice and strategic guidance.',
      color: 'text-emerald-500'
    },
    {
      icon: 'fa-file-powerpoint', 
      title: 'Pitch Deck Creation and Editing',
      description: 'Create compelling investor presentations with AI assistance.',
      color: 'text-rose-500'
    },
    {
      icon: 'fa-file-export', 
      title: 'Report Editing and Exporting',
      description: 'Customize and export professional market analysis reports.',
      color: 'text-lime-600'
    },
    {
      icon: 'fa-check-circle', 
      title: 'Idea Viability Assessment',
      description: 'Get instant feedback on your business idea\'s potential.',
      color: 'text-green-600'
    },
    {
      icon: 'fa-chess', 
      title: 'Competitive Market Analysis',
      description: 'Analyze competitors and identify market advantages.',
      color: 'text-amber-500'
    }
  ];

  /**
   * FeatureCard component represents a single feature card.
   * 
   * Props:
   * - icon: Font Awesome icon class
   * - iconColor: Tailwind color class for icon
   * - title: Feature title
   * - description: Feature description
   */
  interface FeatureCardProps {
    icon: string;
    iconColor: string;
    title: string;
    description: string;
  }

  /**
   * FeatureCard component implementation.
   */
  const FeatureCard: React.FC<FeatureCardProps> = ({ 
    icon, 
    iconColor,
    title, 
    description 
  }) => (
    <article 
      className="
        p-6 bg-white rounded-xl 
        border border-gray-200 
        hover:border-custom/30 
        hover:shadow-2xl 
        transition-all duration-300 
        group 
        relative 
        overflow-hidden
      "
    >
      <div 
        className="
          absolute inset-0 
          bg-gradient-to-r from-custom/10 to-custom/20 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity duration-300 
          z-0
        "
      />
      <div className="relative z-10">
        <figure 
          className="
            w-12 h-12 
            bg-custom/10 
            rounded-lg 
            flex items-center 
            justify-center 
            mb-4 
            group-hover:bg-custom/20 
            transition-colors 
            duration-300
          "
        >
          <i 
            className={`
              fas ${icon} 
              text-xl 
              ${iconColor}
              group-hover:text-custom/80 
              transition-colors 
              duration-300
            `}
          ></i>
        </figure>
        <h3 
          className="
            text-xl 
            font-semibold 
            mb-3 
            text-gray-900 
            group-hover:text-custom 
            transition-colors 
            duration-300
          "
        >
          {title}
        </h3>
        <p 
          className="
            text-gray-600 
            group-hover:text-gray-800 
            transition-colors 
            duration-300
          "
        >
          {description}
        </p>
      </div>
    </article>
  );

  return (
    // Features section with gradient background
    <section 
      id="features-section"
      className="py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Unlock Your Business Potential with Market Flick AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Turn your business idea into reality with tools offering in-depth analysis, 
            strategic guidance, and actionable insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {marketResearchCapabilities.map((capability, index) => (
            <FeatureCard 
              key={index} 
              icon={capability.icon} 
              iconColor={capability.color}
              title={capability.title} 
              description={capability.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedFeaturesSection;
