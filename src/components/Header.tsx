
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full hero-gradient flex items-center justify-center">
              <span className="text-white font-bold text-xs">H&F</span>
            </div>
            <span className="font-bold text-xl text-brand-dark">HumanFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brand-purple font-medium">
              Home
            </Link>
            <Link to="/missing" className="text-gray-700 hover:text-brand-purple font-medium">
              Missing Persons
            </Link>
            <Link to="/found" className="text-gray-700 hover:text-brand-purple font-medium">
              Found Persons
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-purple font-medium">
              How It Works
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-brand-purple rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Button variant="outline" onClick={logout}>
                  Log Out
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-md p-2 text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-brand-purple font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/missing"
                className="text-gray-700 hover:text-brand-purple font-medium"
                onClick={toggleMenu}
              >
                Missing Persons
              </Link>
              <Link
                to="/found"
                className="text-gray-700 hover:text-brand-purple font-medium"
                onClick={toggleMenu}
              >
                Found Persons
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-brand-purple font-medium"
                onClick={toggleMenu}
              >
                How It Works
              </Link>
              {!user ? (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">Log In</Button>
                  </Link>
                  <Link to="/register" onClick={toggleMenu}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-brand-purple rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button variant="outline" onClick={() => { logout(); toggleMenu(); }}>
                    Log Out
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
