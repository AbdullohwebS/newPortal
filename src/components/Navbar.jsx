import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  const linkClass = ({ isActive }) =>
    isActive ? 'font-semibold text-blue-600' : 'text-gray-700 hover:text-blue-600';

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-lg font-bold text-blue-600">
          News Portal
        </Link>
        <div className="space-x-4">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          {user && (
            <NavLink to="/stats" className={linkClass}>
              Stats
            </NavLink>
          )}
          {user ? (
            <button onClick={handleLogout} className="text-gray-700 hover:text-red-600">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
