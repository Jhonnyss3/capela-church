import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/d6473724-2886-4b09-a538-b2456a9336ed.png"
              alt="Capela Church Logo"
              className="h-10 w-10 mr-3"
            />
            <span className="text-2xl font-bold text-foreground hidden md:inline">CAPELA CHURCH</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/nossa-historia">
              <Button variant="ghost">
                Nossa História
              </Button>
            </Link>
            
            <Link to="/onde-estamos">
              <Button variant="ghost">
                Onde Estamos
              </Button>
            </Link>
            
            <Link to="/como-cremos">
              <Button variant="ghost">
                Como Cremos?
              </Button>
            </Link>
            
            <Link to="/seja-generoso">
              <Button variant="ghost">
                Seja Generoso
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="py-4 space-y-2 px-4">
              <Link
                to="/nossa-historia"
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Nossa História
              </Link>
              
              <Link
                to="/onde-estamos"
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Onde Estamos
              </Link>
              
              <Link
                to="/como-cremos"
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Como Cremos?
              </Link>
              
              <Link
                to="/seja-generoso"
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Seja Generoso
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;