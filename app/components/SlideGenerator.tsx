// app/components/SlideGenerator.tsx
"use client";
import { useState } from "react";

const SlideGenerator = () => {
  const [topic, setTopic] = useState("");
  const [numSlides, setNumSlides] = useState(5);
  const [slides, setSlides] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSlides = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-slide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          numSlides,
        }),
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text(); // Get the raw response text
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Failed to parse server response');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setSlides(data.slides);
    } catch (error) {
      console.error("Error generating slides:", error);
      setError(error instanceof Error ? error.message : "Error generating slides. Please try again later.");
      setSlides(""); // Clear any partial results
    } finally {
      setLoading(false);
    }
  };


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(slides);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const clearAll = () => {
    setTopic("");
    setSlides("");
    setCopySuccess(false);
    setNumSlides(5);
    setError(null);
  };


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Slide Generator</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Number of Slides:
          <input
            type="number"
            min="1"
            max="20"
            value={numSlides}
            onChange={(e) => setNumSlides(Number(e.target.value))}
            className="ml-2 p-1 border rounded"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Enter your presentation topic:
        </label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full h-24 p-2 border rounded"
          placeholder="Enter the topic for your presentation..."
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={generateSlides}
          disabled={loading || !topic}
          className={`px-4 py-2 rounded ${
            loading || !topic
              ? "bg-gray-300"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Generating Slides..." : "Generate Slides"}
        </button>

        <button
          onClick={clearAll}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Clear All
        </button>
      </div>

      {slides && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Generated Slides:</h2>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
            >
              {copySuccess ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                  Copy to Clipboard
                </>
              )}
            </button>
          </div>
          <div className="p-4 border rounded bg-white shadow">
            <pre className="whitespace-pre-wrap font-sans text-base">{slides}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideGenerator;
