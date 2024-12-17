// app/components/Landing.tsx
"use client"
import { useState } from 'react';
import Hero from './landing/Hero';
import Features from './landing/Features';
import HowItWorks from './landing/HowItWorks';
import Testimonials from './landing/Testimonials';
import Pricing from './landing/Pricing';
import FAQ from './landing/FAQ';
import Footer from './landing/Footer';
import Main from './Main';  // Import Main component

const Landing = () => {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <Main />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with working CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Empower Your Teaching with AI-Powered Tools
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Create quizzes, generate slides, analyze student data, and identify learning gaps in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowApp(true)}  // Add this onClick handler
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Get Started for Free
                </button>
                {/* ... other buttons ... */}
              </div>
            </div>
            {/* ... rest of hero content ... */}
          </div>
        </div>
      </div>

      {/* Other sections */}
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Landing;