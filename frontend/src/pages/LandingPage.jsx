import React, { useContext, useState} from "react"
import { Edit3, ChevronRight, Menu, X, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { UserDataContext } from "../context/UserContext"

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)
  console.log(user)

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Edit3 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">LingoSavvy</span>
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
              {isMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
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

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 flex-grow">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Elevate Your Writing with <span className="text-blue-600">AI-Powered</span> Precision
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              LingoSavvy helps you write clear, error-free, and impactful content with advanced grammar checking and
              style suggestions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => (window.location.href = "/editor")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Try For Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-10">
            <div className="bg-white rounded-xl shadow-xl p-6 relative">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-800">
                  The team <span className="bg-yellow-100 px-1">wer</span> excited about the new product launch, despite{" "}
                  <span className="bg-red-100 px-1">there</span> concerns about market readiness.
                </p>
                <div className="mt-4 bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">LingoSavvy suggests:</p>
                      <p className="text-sm text-gray-700">
                        "The team <span className="text-green-600">was</span> excited about the new product launch,
                        despite <span className="text-green-600">their</span> concerns about market readiness."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer*/}
      <footer className="py-8 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-800">© 2025 LingoSavvy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

