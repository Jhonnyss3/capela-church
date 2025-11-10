import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  FileText, 
  Clock,
  Check
} from 'lucide-react';

interface Solicitacao {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const fetchSolicitacoes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('solicitacoes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSolicitacoes(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar solicitações:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalSolicitacoes = solicitacoes.length;
  const solicitacoesPendentes = solicitacoes.filter(s => s.status === 'pendente').length;
  const solicitacoesEnviadas = solicitacoes.filter(s => s.status === 'enviado').length;

  if (loading) {
    return (
      <AdminLayout activeSection="dashboard">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activeSection="dashboard">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Erro ao carregar dados</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection="dashboard">
      <div className="space-y-6">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Total */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Total de Solicitações</h3>
              <FileText className="text-muted-foreground" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">{totalSolicitacoes}</p>
            <p className="text-sm text-muted-foreground mt-2">Todas</p>
          </div>

          {/* Card 2 - Pendentes */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Pendentes</h3>
              <Clock className="text-orange-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-orange-500">
              {solicitacoesPendentes}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Aguardando envio</p>
          </div>

          {/* Card 3 - Enviadas */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Enviadas</h3>
              <Check className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-600">
              {solicitacoesEnviadas}
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
          {solicitacoesPendentes > 0 ? (
            <p className="text-sm text-orange-600 font-medium">
              ⚠️ Você tem {solicitacoesPendentes} solicitação{solicitacoesPendentes > 1 ? 'ões' : ''} pendente{solicitacoesPendentes > 1 ? 's' : ''} para revisar.
            </p>
          ) : (
            <p className="text-sm text-green-600 font-medium">
              ✅ Todas as solicitações foram processadas!
            </p>
          )}
        </div>

        {/* Solicitações Recentes */}
        {solicitacoes.length > 0 && (
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Solicitações Recentes
            </h2>
            <div className="space-y-3">
              {solicitacoes.slice(0, 5).map((solicitacao) => (
                <div
                  key={solicitacao.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{solicitacao.nome}</p>
                    <p className="text-sm text-muted-foreground">{solicitacao.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      solicitacao.status === 'pendente'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {solicitacao.status === 'pendente' ? 'Pendente' : 'Enviado'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;