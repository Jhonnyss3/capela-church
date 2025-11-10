import { 
  LayoutDashboard, 
  FileText, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  activeSection: string;
  onMenuClick: (path: string) => void;
  onLogout: () => void;
}

const AdminSidebar = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  activeSection, 
  onMenuClick,
  onLogout 
}: AdminSidebarProps) => {
  
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/gestor' },
    { id: 'solicitacoes', label: 'Solicitações', icon: FileText, path: '/gestor/solicitacoes' },
    { id: 'documentos', label: 'Documentos', icon: FileText, path: '/gestor/documentos' },
  ];

  return (
    <>
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
                onClick={() => onMenuClick(item.path)}
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
            onClick={onLogout}
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
    </>
  );
};

export default AdminSidebar;