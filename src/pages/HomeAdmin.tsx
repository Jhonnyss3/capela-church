import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Mail,
  Phone,
  Calendar,
  Check,
  Clock
} from 'lucide-react';

const HomeAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'solicitacoes', label: 'Solicitações', icon: FileText },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  // Dados de exemplo - depois você substituirá por dados reais do backend
  const solicitacoes = [
    {
      id: 1,
      nome: 'João Pedro Silva',
      email: 'joao@email.com',
      telefone: '(24) 99999-9999',
      data: '2025-01-09',
      status: 'pendente'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(24) 98888-8888',
      data: '2025-01-08',
      status: 'concluido'
    },
  ];

  const handleLogout = () => {
    console.log('Logout');
    window.location.href = '/admin';
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    console.log(`Alterando status da solicitação ${id} para ${newStatus}`);
    // Aqui você adicionará a lógica para atualizar o status no backend
  };

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
                onClick={() => setActiveSection(item.id)}
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
                {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h1>
              <p className="text-sm text-muted-foreground">
                Bem-vindo ao painel administrativo
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground">capelachurch@gmail.com</p>
            </div>
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Content */}
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Total de Solicitações</h3>
                      <FileText className="text-muted-foreground" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-foreground">{solicitacoes.length}</p>
                    <p className="text-sm text-muted-foreground mt-2">Todas</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Pendentes</h3>
                      <Clock className="text-orange-500" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-orange-500">
                      {solicitacoes.filter(s => s.status === 'pendente').length}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Aguardando resposta</p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Concluídas</h3>
                      <Check className="text-green-600" size={24} />
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                      {solicitacoes.filter(s => s.status === 'concluido').length}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Este mês</p>
                  </div>
                </div>

                {/* Welcome Message */}
                <div className="bg-white rounded-xl p-8 border border-border shadow-sm">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Bem-vindo ao Painel Administrativo da Capela Church
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Este é o seu painel de controle. Use o menu lateral para navegar entre as diferentes seções.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Você tem {solicitacoes.filter(s => s.status === 'pendente').length} solicitações pendentes para revisar.
                  </p>
                </div>
              </div>
            )}

            {/* Solicitações Content */}
            {activeSection === 'solicitacoes' && (
              <div className="space-y-6">
                {/* Header com filtros */}
                <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">
                      Solicitações de Prestação de Contas
                    </h2>
                    <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="all">Todas</option>
                      <option value="pendente">Pendentes</option>
                      <option value="concluido">Concluídas</option>
                    </select>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total: {solicitacoes.length} solicitações
                  </p>
                </div>

                {/* Lista de Solicitações */}
                <div className="space-y-4">
                  {solicitacoes.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 border border-border shadow-sm text-center">
                      <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Nenhuma solicitação ainda
                      </h3>
                      <p className="text-muted-foreground">
                        As solicitações do formulário aparecerão aqui.
                      </p>
                    </div>
                  ) : (
                    solicitacoes.map((solicitacao) => (
                      <div
                        key={solicitacao.id}
                        className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                              {solicitacao.nome}
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail size={16} />
                                <span>{solicitacao.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone size={16} />
                                <span>{solicitacao.telefone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={16} />
                                <span>{new Date(solicitacao.data).toLocaleDateString('pt-BR')}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                solicitacao.status === 'pendente'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {solicitacao.status === 'pendente' ? 'Pendente' : 'Concluído'}
                            </span>
                            {solicitacao.status === 'pendente' && (
                              <button
                                onClick={() => handleStatusChange(solicitacao.id, 'concluido')}
                                className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                              >
                                Marcar como Concluído
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Outras seções - Placeholder */}
            {activeSection !== 'dashboard' && activeSection !== 'solicitacoes' && (
              <div className="bg-white rounded-xl p-8 border border-border shadow-sm text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h2>
                <p className="text-muted-foreground">
                  Esta seção será implementada em breve.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeAdmin;