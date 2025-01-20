"use client";
import React, { useState } from "react";

import HeroSection from "@/components/landings/HeroSection";
import ProductVideoSection from "@/components/landings/VideoSection";
import DetailedFeaturesSection from "@/components/landings/Features";
import PricingComponent from "@/components/landings/Pricing";
import ProductFrequentlyAskedQuestionsSection from "@/components/landings/FAQSection";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";



export default function Home() {

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="product-video-section">
          <ProductVideoSection />
        </section>
        <section id="features">
          <DetailedFeaturesSection />
        </section>
        <section id="pricing">
          <PricingComponent />
        </section>
        <section id="faq">
          <ProductFrequentlyAskedQuestionsSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}