import { useState, ReactNode } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: string;
}

const AdminLayout = ({ children, activeSection }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'solicitacoes', label: 'Solicitações', icon: FileText, path: '/admin/solicitacoes' },
    { id: 'documentos', label: 'Documentos', icon: FileText, path: '/admin/documentos' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const currentMenuItem = menuItems.find(item => item.id === activeSection);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-black text-white
          transition-all duration-300
          ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'}
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.webp" 
                  alt="Capela Church" 
                  className="w-10 h-10"
                />
                <div>
                  <h2 className="font-bold text-sm">Capela Church</h2>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-white text-black font-semibold' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-900 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {currentMenuItem?.label || 'Dashboard'}
              </h1>
              <p className="text-sm text-muted-foreground">
                Bem-vindo ao painel administrativo
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground">
                {user?.email || 'capelachurch@gmail.com'}
              </p>
            </div>
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
              C
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;