import { Instagram, MapPin, Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="bg-black text-white pt-32 pb-12 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10 border-b border-gray-700">
          <div className="lg:col-span-1">
            <img 
              src="/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.webp" 
              alt="Capela Church Logo" 
              className="h-12 w-auto mb-6"
            />
            <p className="text-gray-300 mb-6">
              A Igreja para quem não gosta de Igreja. Uma comunidade baseada em Atos 2:42, 
              onde você pode vir como você é e descobrir o amor genuíno de Deus.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Localização & Horários</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Rua Tupi, 115</p>
                  <p className="text-gray-300">Jardim Cidade do Aço</p>
                  <p className="text-gray-300">Volta Redonda - RJ</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-300" />
                <p className="text-gray-300">Domingos às 10h</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-300" />
                <a href="mailto:capelachurch@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  capelachurch@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-300" />
                <a href="tel:+5524999999999" className="text-gray-300 hover:text-white transition-colors">
                  (24) 99999-9999
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-gray-300" />
                <a 
                  href="https://www.instagram.com/capelachurch/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  @capelachurch
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Capela Church. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;