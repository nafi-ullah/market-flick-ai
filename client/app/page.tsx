"use client";
import React, { useState } from "react";


import HeroSection from "@/components/landings/HeroSection";
import ProductVideoSection from "@/components/landings/VideoSection";
import DetailedFeaturesSection from "@/components/landings/Features";
import PricingComponent from "@/components/landings/Pricing";
import ProductFrequentlyAskedQuestionsSection from "@/components/landings/FAQSection";



export default function Home() {

  return (
    <div className="font-[family-name:var(--font-geist-sans)] pt-24">
      {/* <Navbar /> */}
      {/* <Header/> */}
      <HeroSection />
              <ProductVideoSection />
              <DetailedFeaturesSection />
              <PricingComponent />
              <ProductFrequentlyAskedQuestionsSection />
    </div>
  );
}