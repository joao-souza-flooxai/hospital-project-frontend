import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/preferences" element={<div>Preferências</div>} />
        <Route path="/dashboard" element={<div>Dashboard Admin</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
