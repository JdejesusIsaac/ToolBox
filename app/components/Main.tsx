// app/components/Main.tsx
"use client"
import { useState } from "react"
import QuizGenerator from "./quizGenerator"  // Note the lowercase 'q'
import SlideGenerator from "./SlideGenerator"  // Note the uppercase 'S'
import LearningGapAnalyzer from "./LearningGapAnalyzer"
const Main = () => {
    const [activeComponent, setActiveComponent] = useState<'quiz' | 'slides' | 'gaps'>('quiz');
  
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-4">TeacherToolbox.ai</h1>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveComponent('quiz')}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeComponent === 'quiz'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Quiz Generator
            </button>
            <button
              onClick={() => setActiveComponent('slides')}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeComponent === 'slides'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Slide Generator
            </button>
            <button
              onClick={() => setActiveComponent('gaps')}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeComponent === 'gaps'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Learning Gaps
            </button>
          </div>
  
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              {activeComponent === 'quiz' 
                ? "Generate custom quizzes from your curriculum content. Perfect for assessment and review."
                : activeComponent === 'slides'
                ? "Create professional presentation slides from any topic. Great for lectures and presentations."
                : "Analyze student responses to identify learning gaps and get personalized recommendations."
              }
            </p>
          </div>
        </div>
  
        {/* Content Area */}
        <div className="transition-all duration-300">
          {activeComponent === 'quiz' ? (
            <QuizGenerator />
          ) : activeComponent === 'slides' ? (
            <SlideGenerator />
          ) : (
            <LearningGapAnalyzer />
          )}
        </div>
      </div>
    );
  };
  
  export default Main;