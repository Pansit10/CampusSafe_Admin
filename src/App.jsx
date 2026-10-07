import { useState } from 'react'
import './App.css'
import './components/ControlAlignment.css'
import './components/IncidentModal.css'
import AdminDashboard from './pages/AdminDashboard'
import LoginPage from './pages/LoginPage'

export default function AppEntry() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return isLoggedIn ? <AdminDashboard onLogout={() => setIsLoggedIn(false)} /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />
}
