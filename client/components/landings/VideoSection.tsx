import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RiAtLine, RiRobot2Line } from "react-icons/ri";
import { FiGlobe } from "react-icons/fi";

const ProductVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (video) {
          if (entry.isIntersecting) {
            video.play(); // Play the video when in view
          } else {
            video.pause(); // Pause the video when out of view
          }
        }
      },
      { threshold: 0.5 } // Video must be at least 50% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sectionContainerAnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionElementAnimationVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const productCapabilityHighlights = [
    {
      icon: <RiAtLine className="w-6 h-6" />,
      title: "Advanced Market Analysis",
      description:
        "Discover deep insights with our AI-powered market research tools.",
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Global Market Intelligence",
      description:
        "Access comprehensive market data across multiple industries and regions.",
    },
    {
      icon: <RiRobot2Line className="w-6 h-6" />,
      title: "AI-Driven Recommendations",
      description:
        "Receive actionable strategic insights tailored to your business needs.",
    },
  ];

  return (
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
            Discover how our AI-powered platform transforms complex market data
            into actionable insights. Watch a quick demo to understand how we
            can help you make smarter business decisions.
          </p>
        </motion.div>

        {/* Video and Highlights Container */}
        <motion.div
          variants={sectionContainerAnimationVariants}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Video Embed Column */}
          <motion.div
            variants={sectionElementAnimationVariants}
            className="sticky top-24 h-fit"
          >
            <div className="relative rounded-xl overflow-hidden  min-h-[60vh]">
              <div className="relative w-full ">
                {/* <video
                  ref={videoRef}
                  src="/demo-video.mp4"
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                /> */}
                <img src="assetdumm.png" alt="Demo Video" className="absolute inset-0 min-w-[40wh] min-h-[30vh]  rounded-xl" />
              </div>
            </div>
          </motion.div>

          {/* Product Highlights Column */}
          <motion.div
            variants={sectionElementAnimationVariants}
            className="space-y-8"
          >
            {productCapabilityHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex items-center space-x-6 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full flex items-center justify-center text-blue-600">
                  {highlight.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductVideoSection;
