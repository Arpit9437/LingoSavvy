import React from 'react';
import { createContext, useState, useEffect } from "react"

export const UserDataContext = createContext()

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const updateUser = (userData) => {
    setUser(userData)
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData))
    } else {
      localStorage.removeItem("user")
    }
  }

  return <UserDataContext.Provider value={{ user, setUser: updateUser }}>{children}</UserDataContext.Provider>
}

export default UserContext