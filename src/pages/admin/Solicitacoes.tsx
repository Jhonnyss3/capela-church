import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Mail,
  Phone,
  Calendar,
  FileText
} from 'lucide-react';

const Solicitacoes = () => {
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

  const handleStatusChange = (id: number, newStatus: string) => {
    console.log(`Alterando status da solicitação ${id} para ${newStatus}`);
    // Aqui você adicionará a lógica para atualizar o status no Supabase
  };

  return (
    <AdminLayout activeSection="solicitacoes">
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
    </AdminLayout>
  );
};

export default Solicitacoes;