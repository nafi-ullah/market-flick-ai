"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Header component provides site-wide navigation and responsive mobile menu.
 *
 * Key Features:
 * - Fixed top navigation bar
 * - Responsive design with mobile menu
 * - Scroll-based styling changes
 * - Animated menu transitions
 * - Dynamic navigation links
 */
const Header: React.FC = () => {
  const [isMobileNavigationMenuOpen, setIsMobileNavigationMenuOpen] =
    useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigationLinks = [
    {
      name: "Features",
      path: "/",
      sectionId: "features-section",
    },
    {
      name: "Pricing",
      path: "/",
      sectionId: "pricing-section",
    },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Effect to handle scroll-based styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile navigation menu
  const toggleMobileNavigationMenu = () => {
    setIsMobileNavigationMenuOpen(!isMobileNavigationMenuOpen);
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <a className="flex items-center group">
                <img
                  src="/market_flick_logo.jpg"
                  alt="Market Flick AI"
                  className="h-10 w-auto transition-transform duration-300 group-hover:rotate-6"
                />
                <span className="ml-3 text-2xl font-bold text-gray-900 tracking-tight transition-colors duration-300 group-hover:text-custom">
                  MARKET FLICK AI
                </span>
              </a>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center space-x-6"
          >
            {navigationLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.path === "/") {
                    router.push("/").then(() => {
                      if (link.sectionId) {
                        scrollToSection(link.sectionId);
                      }
                    });
                  } else {
                    router.push(link.path);
                  }
                  setIsMobileNavigationMenuOpen(false);
                }}
                className="text-gray-600 hover:text-custom font-medium transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-custom transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-gray-600 hover:text-custom transition-colors duration-300"
            onClick={toggleMobileNavigationMenu}
          >
            <i
              className={`fas ${
                isMobileNavigationMenuOpen ? "fa-times" : "fa-bars"
              } text-2xl`}
            ></i>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileNavigationMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg"
            >
              <div className="px-4 py-6 space-y-4">
                {navigationLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      if (link.path === "/") {
                        router.push("/").then(() => {
                          if (link.sectionId) {
                            scrollToSection(link.sectionId);
                          }
                        });
                      } else {
                        router.push(link.path);
                      }
                      setIsMobileNavigationMenuOpen(false);
                    }}
                    className="block text-gray-700 hover:bg-gray-50 hover:text-custom font-medium px-4 py-3 rounded-lg transition-all duration-300 group"
                  >
                    {link.name}
                    <span className="block w-0 h-0.5 bg-custom transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
