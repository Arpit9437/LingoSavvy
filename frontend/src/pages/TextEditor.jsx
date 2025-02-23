import React, { useState, useRef, useContext } from "react";
import { Edit3, ChevronRight, Menu, X, Sparkles, Check, AlertCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const TextEditor = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userText, setUserText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const textAreaRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

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

      const response = await axios.post('http://localhost:4000/api/ai/analyze', {
        text: textToAnalyze
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Parse the JSON string from the backend response
      let parsedResult;
      try {
        parsedResult = JSON.parse(response.data.textres);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        setError("Received invalid response format from server");
        setIsLoading(false);
        return;
      }

      setAnalysisResult(parsedResult);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.response?.data?.message || "Failed to analyze text");
    } finally {
      setIsLoading(false);
    }
  };

  // Limited analysis results for non-authenticated users
  const renderLimitedResults = () => {
    if (!analysisResult) return null;

    return (
      <div className="w-full max-w-4xl">
        <div className="bg-blue-50 rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Lock className="h-12 w-12 text-blue-600" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Limited Preview
              </h3>
              <p className="text-blue-600 mb-4">
                Sign in to access detailed analysis, suggestions, and corrections
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Sign Up Free
              </button>
            </div>
          </div>
          
          {/* Show basic ratings only */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analysisResult.ratings).slice(0, 2).map(([category, rating]) => (
              <div key={category} className="bg-white/50 p-4 rounded-lg backdrop-blur-sm">
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
            <div className="col-span-2 bg-white/30 p-4 rounded-lg backdrop-blur-sm flex items-center justify-center">
              <p className="text-blue-800 text-sm font-medium">
                Sign in to view all metrics and suggestions
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Full analysis results for authenticated users
  const renderFullResults = () => {
    if (!analysisResult) return null;

    return (
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Check className="h-5 w-5 text-green-500 mr-2" />
          Analysis Results
        </h2>
        
        {/* Full Ratings Section */}
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
    );
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
            {user ? (
              <>
                <span className="text-gray-600">Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-blue-600 font-medium hover:underline"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up Free
                </button>
              </>
            )}
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
              {user ? (
                <>
                  <span className="text-gray-600">Welcome, {user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-blue-600 font-medium hover:underline"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up Free
                  </button>
                </>
              )}
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

          {/* Render results based on authentication status */}
          {user ? renderFullResults() : renderLimitedResults()}
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