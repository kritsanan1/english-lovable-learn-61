
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Instructors", path: "/instructors" },
    { name: "Courses", path: "/pricing" },
    { name: "Learning", path: "/learning" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="text-2xl font-bold text-blue-600">Kru English</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
            {user ? (
              <Button 
                onClick={() => navigate("/dashboard")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate("/pricing")}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Start Learning
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              {user ? (
                <Button 
                  onClick={() => {
                    navigate("/dashboard");
                    setIsOpen(false);
                  }}
                  className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="w-full mt-2"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate("/pricing");
                      setIsOpen(false);
                    }}
                    className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Start Learning
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
