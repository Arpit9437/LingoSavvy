import React, { useState, useRef } from "react";
import { Edit3, ChevronRight, Menu, X, Sparkles, Check, AlertCircle } from "lucide-react";

const TextEditor = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userText, setUserText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const textAreaRef = useRef(null);

  const handleAnalyzeClick = async () => {
    try {
      // Get selected text if any
      const selection = window.getSelection().toString();
      const textToAnalyze = selection || userText;
      
      if (!textToAnalyze.trim()) {
        setError("Please enter some text to analyze");
        return;
      }

      setIsLoading(true);
      setError(null);

      // Call your backend API
      const response = await fetch('http://localhost:4000/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }

      const data = await response.json();
      
      // Parse the JSON string from the backend response
      let parsedResult;
      try {
        parsedResult = JSON.parse(data.textres);
      } catch (e) {
        // If parsing fails, use the raw response text
        console.error("Failed to parse JSON response:", e);
        setError("Received invalid response format from server");
        setIsLoading(false);
        return;
      }

      setAnalysisResult(parsedResult);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.message || "Failed to analyze text");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Edit3 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">
              LingoSavvy
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-blue-600 font-medium hover:underline">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Sign Up Free
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col space-y-3">
              <div className="pt-3">
                <button className="w-full mb-2 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded">
                  Login
                </button>
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Sign Up Free
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Text Editor Section */}
      <section className="container mx-auto px-6 py-10 flex-grow">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
            <span className="text-blue-600">LingoSavvy</span> Text Editor
          </h1>
          
          {/* Text Entry Area */}
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mb-6">
            <textarea
              ref={textAreaRef}
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter or paste your text here..."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
            ></textarea>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
            
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Tip: Select specific text to analyze just that portion
              </p>
              <button
                onClick={handleAnalyzeClick}
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-300"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Analyzing...</span>
                    <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    Analyze Text
                    <Sparkles className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Analysis Results
              </h2>
              
              {/* Ratings Section */}
              <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analysisResult.ratings).map(([category, rating]) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium capitalize">{category}</h3>
                      <span className="text-lg font-bold">{rating}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${rating >= 8 ? 'bg-green-500' : rating >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${rating * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Corrected Text */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-800 mb-2">Improved Version:</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap">{analysisResult.corrected_text}</p>
                </div>
              </div>
              
              {/* Detailed Changes */}
              {analysisResult.changes && analysisResult.changes.length > 0 && (
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-2">Suggested Changes:</h3>
                  <div className="bg-white border border-gray-200 rounded-lg">
                    {analysisResult.changes.map((change, index) => (
                      <div 
                        key={index} 
                        className={`p-4 ${index !== analysisResult.changes.length - 1 ? 'border-b border-gray-200' : ''}`}
                      >
                        <div className="flex items-center mb-2">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-2
                            ${change.type === 'grammar' ? 'bg-red-100 text-red-800' : 
                              change.type === 'clarity' ? 'bg-blue-100 text-blue-800' :
                              change.type === 'vocabulary' ? 'bg-purple-100 text-purple-800' :
                              'bg-yellow-100 text-yellow-800'}`}>
                            {change.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded border-l-4 border-red-400">
                            <p className="text-sm text-gray-800">{change.original}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded border-l-4 border-green-400">
                            <p className="text-sm text-gray-800">{change.corrected}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setUserText(analysisResult.corrected_text);
                    setAnalysisResult(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Apply All Corrections
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Edit3 className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">
                LingoSavvy
              </span>
            </div>
            <p className="text-sm">© 2025 LingoSavvy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TextEditor;