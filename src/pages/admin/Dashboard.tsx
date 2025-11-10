import AdminLayout from '@/components/admin/AdminLayout';
import { 
  FileText, 
  Clock,
  Check
} from 'lucide-react';

const Dashboard = () => {
  // Dados de exemplo - depois você substituirá por dados reais do Supabase
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

  const totalSolicitacoes = solicitacoes.length;
  const solicitacoesPendentes = solicitacoes.filter(s => s.status === 'pendente').length;
  const solicitacoesConcluidas = solicitacoes.filter(s => s.status === 'concluido').length;

  return (
    <AdminLayout activeSection="dashboard">
      <div className="space-y-6">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Total */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Total de Solicitações</h3>
              <FileText className="text-muted-foreground" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">{totalSolicitacoes}</p>
            <p className="text-sm text-muted-foreground mt-2">Todas</p>
          </div>

          {/* Card 2 - Pendentes */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Pendentes</h3>
              <Clock className="text-orange-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-orange-500">
              {solicitacoesPendentes}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Aguardando resposta</p>
          </div>

          {/* Card 3 - Concluídas */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Concluídas</h3>
              <Check className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-600">
              {solicitacoesConcluidas}
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
            Você tem {solicitacoesPendentes} solicitações pendentes para revisar.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;