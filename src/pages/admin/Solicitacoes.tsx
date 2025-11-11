import AdminLayout from '@/components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
  Mail,
  Phone,
  Calendar,
  FileText
} from 'lucide-react';

interface Solicitacao {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: string;
  planilha_enviada: boolean;
  created_at: string;
}

const Solicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [filteredSolicitacoes, setFilteredSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, solicitacoes]);

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

  const applyFilter = () => {
    if (filter === 'all') {
      setFilteredSolicitacoes(solicitacoes);
    } else {
      setFilteredSolicitacoes(solicitacoes.filter(s => s.status === filter));
    }
  };

  const handleEnviarPlanilha = async (solicitacao: Solicitacao) => {
    try {
      setSendingEmail(solicitacao.id);

      // 1. Buscar documento ativo
      const { data: documento, error: docError } = await supabase
        .from('documentos')
        .select('*')
        .eq('is_active', true)
        .single();

      if (docError || !documento) {
        throw new Error('Nenhuma planilha ativa encontrada. Marque uma planilha como ativa em Documentos.');
      }

      // 2. Enviar email via Vercel Function
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: solicitacao.email,
          name: solicitacao.nome,
          documentUrl: documento.file_url,
          documentName: documento.nome,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar email');
      }

      // 3. Atualizar status no banco
      const { error: updateError } = await supabase
        .from('solicitacoes')
        .update({ 
          status: 'enviado',
          planilha_enviada: true,
          documento_id: documento.id
        })
        .eq('id', solicitacao.id);

      if (updateError) throw updateError;

      // 4. Atualizar localmente
      setSolicitacoes(solicitacoes.map(s => 
        s.id === solicitacao.id 
          ? { ...s, status: 'enviado', planilha_enviada: true } 
          : s
      ));

      alert('✅ Planilha enviada com sucesso para ' + solicitacao.email);
    } catch (err: any) {
      console.error('Erro ao enviar planilha:', err);
      alert('❌ Erro: ' + err.message);
    } finally {
      setSendingEmail(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout activeSection="solicitacoes">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando solicitações...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout activeSection="solicitacoes">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Erro ao carregar solicitações</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection="solicitacoes">
      <div className="space-y-6">
        {/* Header com filtros */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">
              Solicitações de Prestação de Contas
            </h2>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todas</option>
              <option value="pendente">Pendentes</option>
              <option value="enviado">Enviadas</option>
            </select>
          </div>
          <p className="text-sm text-muted-foreground">
            Total: {filteredSolicitacoes.length} solicitação{filteredSolicitacoes.length !== 1 ? 'ões' : ''}
          </p>
        </div>

        {/* Lista de Solicitações */}
        <div className="space-y-4">
          {filteredSolicitacoes.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-border shadow-sm text-center">
              <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {filter === 'all' 
                  ? 'Nenhuma solicitação ainda' 
                  : `Nenhuma solicitação ${filter === 'pendente' ? 'pendente' : 'enviada'}`
                }
              </h3>
              <p className="text-muted-foreground">
                {filter === 'all' 
                  ? 'As solicitações do formulário aparecerão aqui.' 
                  : 'Selecione "Todas" para ver outras solicitações.'
                }
              </p>
            </div>
          ) : (
            filteredSolicitacoes.map((solicitacao) => (
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
                        <span>{new Date(solicitacao.created_at).toLocaleDateString('pt-BR')}</span>
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
                      {solicitacao.status === 'pendente' ? 'Pendente' : 'Enviado'}
                    </span>
                    {solicitacao.status === 'pendente' && (
                      <button
                        onClick={() => handleEnviarPlanilha(solicitacao)}
                        disabled={sendingEmail === solicitacao.id}
                        className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {sendingEmail === solicitacao.id ? 'Enviando...' : 'Enviar Planilha'}
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