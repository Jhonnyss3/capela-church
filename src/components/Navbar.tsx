import { useState, useEffect } from 'react';
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

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Altura do navbar para offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Fecha o menu mobile
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center cursor-pointer"
          >
            <img 
              src="/lovable-uploads/d6473724-2886-4b09-a538-b2456a9336ed.webp"
              alt="Capela Church Logo"
              className="h-10 w-10 mr-3"
              fetchPriority="high"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold text-foreground hidden md:inline">CAPELA CHURCH</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('sobre')}
              className="cursor-pointer"
            >
              Nossa História
            </Button>
            
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('onde-estamos')}
              className="cursor-pointer"
            >
              Onde Estamos
            </Button>
            
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('como-cremos')}
              className="cursor-pointer"
            >
              Como Cremos?
            </Button>
            
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('seja-generoso')}
              className="cursor-pointer"
            >
              Seja Generoso
            </Button>
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
              <button
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => scrollToSection('sobre')}
              >
                Nossa História
              </button>
              
              <button
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => scrollToSection('onde-estamos')}
              >
                Onde Estamos
              </button>
              
              <button
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => scrollToSection('como-cremos')}
              >
                Como Cremos?
              </button>
              
              <button
                className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => scrollToSection('seja-generoso')}
              >
                Seja Generoso
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;