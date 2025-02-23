import React from 'react';
import { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Edit3 } from "lucide-react"
import axios from "axios"
import { UserDataContext } from "../context/UserContext"

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData)
      if (response.status === 200) {
        const data = response.data
        localStorage.setItem("token", data.token)
        setUser(data.user)
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/editor")
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <div className="container mx-auto px-6 py-4"></div>

      <div className="flex-grow container mx-auto px-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Edit3 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">LingoSavvy</span>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/register" className="text-blue-600 hover:underline text-sm">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

