// app/components/LearningGapAnalyzer.tsx
"use client"
import { useState } from "react"

interface GapAnalysis {
  contentGaps: string[];
  skillGaps: string[];
  comprehensionGaps: string[];
  recommendations: {
    resources: string[];
    strategies: string[];
  };
}

const LearningGapAnalyzer = () => {
  const [studentResponses, setStudentResponses] = useState("");
  const [gradeLevel, setGradeLevel] = useState("6");
  const [subject, setSubject] = useState("");
  const [analysis, setAnalysis] = useState<GapAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeGaps = async () => {
    setLoading(true);
    setError(null);
    
    if (!studentResponses.trim()) {
      setError("Please enter student responses");
      setLoading(false);
      return;
    }

    if (!subject.trim()) {
      setError("Please enter a subject");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/analyze-gaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentResponses: studentResponses.trim(),
          gradeLevel: gradeLevel,
          subject: subject.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error analyzing gaps:", error);
      setError(error instanceof Error ? error.message : "Error analyzing learning gaps");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Learning Gap Analyzer</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Grade Level:
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="ml-2 p-1 border rounded"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Grade {i + 1}
                </option>
              ))}
            </select>
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Subject: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full p-2 border rounded ${
              !subject.trim() && error ? 'border-red-500' : ''
            }`}
            placeholder="e.g., Math, Science"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Student Questions and Responses: <span className="text-red-500">*</span>
        </label>
        <textarea
          value={studentResponses}
          onChange={(e) => setStudentResponses(e.target.value)}
          className={`w-full h-48 p-2 border rounded ${
            !studentResponses.trim() && error ? 'border-red-500' : ''
          }`}
          placeholder="Paste student questions and responses here..."
          required
        />
      </div>

      <button
        onClick={analyzeGaps}
        disabled={loading || !studentResponses}
        className={`px-4 py-2 rounded ${
          loading || !studentResponses
            ? "bg-gray-300"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {loading ? "Analyzing..." : "Analyze Gaps"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {analysis && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="font-bold text-red-700 mb-2">Content Gaps</h3>
              <ul className="list-disc pl-4">
                {analysis.contentGaps.map((gap, i) => (
                  <li key={i} className="text-red-600">{gap}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h3 className="font-bold text-yellow-700 mb-2">Skill Gaps</h3>
              <ul className="list-disc pl-4">
                {analysis.skillGaps.map((gap, i) => (
                  <li key={i} className="text-yellow-600">{gap}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded">
              <h3 className="font-bold text-orange-700 mb-2">Comprehension Gaps</h3>
              <ul className="list-disc pl-4">
                {analysis.comprehensionGaps.map((gap, i) => (
                  <li key={i} className="text-orange-600">{gap}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-green-50 p-4 border border-green-200 rounded">
            <h3 className="font-bold text-green-700 mb-2">Recommendations</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-green-600 mb-2">Learning Resources:</h4>
              <ul className="list-disc pl-4">
                {analysis.recommendations.resources.map((resource, i) => (
                  <li key={i} className="text-green-600">{resource}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-600 mb-2">Teaching Strategies:</h4>
              <ul className="list-disc pl-4">
                {analysis.recommendations.strategies.map((strategy, i) => (
                  <li key={i} className="text-green-600">{strategy}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );


  // ... rest of the component remains the same ...
};

export default LearningGapAnalyzer;