import React, { useState } from 'react';

/**
 * Interface for plan features.
 * 
 * @property {string} text - Feature description.
 * @property {boolean} included - Whether the feature is included in the plan.
 * @property {string} icon - Font Awesome icon class.
 * @property {string} iconColor - Icon color class.
 */
interface PlanFeature {
  text: string;
  included: boolean;
  icon: string;
  iconColor: string;
}

/**
 * Interface for pricing plans.
 * 
 * @property {string} name - Plan name.
 * @property {string} price - Plan price.
 * @property {PlanFeature[]} features - Plan features.
 * @property {string} buttonText - Button text.
 * @property {boolean} [highlight] - Whether the plan is highlighted.
 * @property {string} description - Plan description.
 */
interface PricingPlan {
  name: string;
  price: string;
  features: PlanFeature[];
  buttonText: string;
  highlight?: boolean;
  description: string;
}

/**
 * Pricing component displays subscription plans for Market Flick.
 * 
 * Key Features:
 * - Monthly/Yearly billing toggle
 * - Responsive pricing cards
 * - Highlight for recommended plan
 * - Tailwind CSS for styling and responsiveness
 */
const PricingComponent = () => {
  // State to manage billing cycle (monthly/yearly)
  const [isYearlyBillingCycle, setIsYearlyBillingCycle] = useState(false);

  // Pricing plan details
  const pricingPlans: PricingPlan[] = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for individuals and small projects',
      buttonText: 'Get Started',
      features: [
        { 
          text: '1000-character ideas', 
          included: true,
          icon: 'fa-pencil-alt',
          iconColor: 'text-blue-500'
        },
        { 
          text: 'Language selection', 
          included: true,
          icon: 'fa-globe',
          iconColor: 'text-green-500'
        },
        { 
          text: 'Public/private reports', 
          included: true,
          icon: 'fa-file-alt',
          iconColor: 'text-purple-500'
        }
      ]
    },
    {
      name: 'Lite',
      price: '$10',
      description: 'Ideal for entrepreneurs and startups',
      buttonText: 'Choose Lite',
      features: [
        { 
          text: '3000-character ideas', 
          included: true,
          icon: 'fa-lightbulb',
          iconColor: 'text-yellow-500'
        },
        { 
          text: 'PDF without watermark', 
          included: true,
          icon: 'fa-file-pdf',
          iconColor: 'text-red-500'
        },
        { 
          text: 'AI chat support', 
          included: true,
          icon: 'fa-robot',
          iconColor: 'text-cyan-500'
        },
        { 
          text: 'Dashboard access', 
          included: true,
          icon: 'fa-chart-bar',
          iconColor: 'text-indigo-500'
        },
        { 
          text: '2 advanced reports/month', 
          included: true,
          icon: 'fa-chart-line',
          iconColor: 'text-teal-500'
        }
      ]
    },
    {
      name: 'Pro',
      price: '$16.67',
      description: 'Comprehensive solution for growing businesses',
      buttonText: 'Choose Pro',
      highlight: true,
      features: [
        { 
          text: '4000-character ideas', 
          included: true,
          icon: 'fa-brain',
          iconColor: 'text-emerald-500'
        },
        { 
          text: 'All Lite features', 
          included: true,
          icon: 'fa-check-circle',
          iconColor: 'text-green-600'
        },
        { 
          text: 'Priority support', 
          included: true,
          icon: 'fa-headset',
          iconColor: 'text-orange-500'
        },
        { 
          text: 'Advanced analytics', 
          included: true,
          icon: 'fa-chart-pie',
          iconColor: 'text-pink-500'
        },
        { 
          text: 'Unlimited reports', 
          included: true,
          icon: 'fa-infinity',
          iconColor: 'text-purple-600'
        },
        { 
          text: 'Team collaboration', 
          included: true,
          icon: 'fa-users',
          iconColor: 'text-blue-600'
        }
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large organizations',
      buttonText: 'Contact Sales',
      features: [
        { 
          text: 'Unlimited characters', 
          included: true,
          icon: 'fa-expand-arrows-alt',
          iconColor: 'text-sky-500'
        },
        { 
          text: 'Custom integration', 
          included: true,
          icon: 'fa-puzzle-piece',
          iconColor: 'text-rose-500'
        },
        { 
          text: 'Dedicated support', 
          included: true,
          icon: 'fa-life-ring',
          iconColor: 'text-amber-500'
        },
        { 
          text: 'Custom features', 
          included: true,
          icon: 'fa-magic',
          iconColor: 'text-fuchsia-500'
        }
      ]
    }
  ];

  /**
   * Render plan features as an unordered list.
   * 
   * @param {PlanFeature[]} features - Plan features.
   * @returns {JSX.Element} Unordered list of plan features.
   */
  const renderPlanFeatures = (features: PlanFeature[]) => {
    return (
      <ul className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <li 
            key={index} 
            className={`flex items-center gap-4 ${
              feature.included 
                ? 'text-gray-700' 
                : 'text-gray-400 line-through'
            }`}
          >
            <div 
              className={`
                w-10 h-10 rounded-full 
                flex items-center justify-center 
                bg-opacity-10 ${feature.iconColor} 
                ${feature.included ? '' : 'opacity-50'}
              `}
            >
              <i 
                className={`
                  fas ${feature.icon} 
                  ${feature.iconColor} 
                  ${feature.included ? '' : 'opacity-50'}
                `}
              />
            </div>
            {feature.text}
          </li>
        ))}
      </ul>
    );
  };

  return (
    // Pricing section with gradient background
    <section 
      id="pricing-section"
      aria-labelledby="pricing-title" 
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <header className="text-center mb-16">
          <h2 
            id="pricing-title" 
            className="text-4xl font-bold mb-6 text-gray-900"
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible plans designed to scale with your business. 
            Unlock powerful AI-driven market insights at every stage.
          </p>
        </header>

        {/* Billing cycle toggle */}
        <nav aria-label="Billing Cycle Selection" className="flex justify-center mb-16">
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span 
              className={`text-sm font-medium ${!isYearlyBillingCycle ? 'text-black' : 'text-gray-500'} cursor-pointer`}
              onClick={() => setIsYearlyBillingCycle(false)}
            >
              Monthly
            </span>
            <div 
              className="w-14 h-8 bg-gray-200 rounded-full relative cursor-pointer"
              onClick={() => setIsYearlyBillingCycle(!isYearlyBillingCycle)}
            >
              <div 
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYearlyBillingCycle ? 'translate-x-full' : ''}`}
              ></div>
            </div>
            <span 
              className={`text-sm font-medium ${isYearlyBillingCycle ? 'text-black' : 'text-gray-500'} cursor-pointer`}
              onClick={() => setIsYearlyBillingCycle(true)}
            >
              Yearly
            </span>
          </div>
        </nav>

        {/* Pricing cards grid */}
        <article 
          aria-label="Pricing Plans" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {pricingPlans.map((plan, index) => (
            <section 
              key={index} 
              aria-labelledby={`plan-${plan.name}-title`}
              className={`
                bg-white border rounded-2xl p-6 
                shadow-lg transition-all duration-300
                hover:shadow-2xl hover:border-custom/30
                ${plan.highlight 
                  ? 'border-custom/50 scale-105' 
                  : 'border-gray-200'
                }
              `}
            >
              {/* Plan header */}
              <header className="mb-6">
                <h3 
                  id={`plan-${plan.name}-title`} 
                  className="text-xl font-semibold mb-2 text-gray-900"
                >
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {plan.description}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {plan.price}
                  <span className="text-sm text-gray-500 ml-2">
                    {isYearlyBillingCycle ? '/year' : '/month'}
                  </span>
                </p>
              </header>

              {/* Plan features */}
              {renderPlanFeatures(plan.features)}

              {/* Select plan button */}
              <footer>
                <button 
                  aria-label={`Select ${plan.name} Plan`}
                  className={`
                    w-full py-3 rounded-full text-gray-900 font-medium transition-all duration-300
                    ${plan.highlight 
                      ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {plan.buttonText}
                </button>
              </footer>
            </section>
          ))}
        </article>

        {/* Section footer */}
        <footer className="text-center mt-12">
          <p className="text-sm text-gray-600 italic">
            * All plans include a 14-day free trial. No credit card required.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default PricingComponent;
