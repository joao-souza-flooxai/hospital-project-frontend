import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-700 text-white">
      <h1 className="text-2xl font-bold">Hospital</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}
