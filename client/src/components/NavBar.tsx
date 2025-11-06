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
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          FoodOrder
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          
          {user ? (
            <>
              <span className="text-gray-600">Welcome, {user.email}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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
