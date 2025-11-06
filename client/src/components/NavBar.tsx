import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-primary-dark via-orange to-orange-light shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white drop-shadow-md">
          🍔 FoodOrder
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white font-medium hover:text-gray-900 transition-colors">
            Home
          </Link>
          
          {user ? (
            <>
              <span className="text-white font-medium">Welcome, {user.email}!</span>
              <button
                onClick={handleLogout}
                className="bg-white text-primary-dark px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all font-semibold shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white font-medium hover:text-gray-900 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-primary-dark px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all font-semibold shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
