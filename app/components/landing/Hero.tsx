// app/components/landing/Hero.tsx
const Hero = () => {
    return (
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
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Get Started for Free
                </button>
                <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              {/* Add your hero image/animation here */}
              <div className="bg-white/10 rounded-lg p-4">
                {/* Placeholder for animation/illustration */}
                <div className="aspect-video bg-white/5 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;