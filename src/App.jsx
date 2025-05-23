import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import Home from './pages/Home'
import Login from './pages/Login'
import Preferences from './pages/Preferences'
import Dashboard from './pages/DashboardAdmin'
import  Register  from './pages/Register'

import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/preferences"
            element={
              <RequireAuth>
                <Preferences />
              </RequireAuth>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireAuth role="admin">
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
