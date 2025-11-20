import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { 
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface Documento {
  id: string;
  nome: string;
  file_url: string;
  file_path: string;
  file_size: number;
  is_active: boolean;
  created_at: string;
}

const Documentos = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const fetchDocumentos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documentos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDocumentos(data || []);
    } catch (err: any) {
      console.error('Erro ao buscar documentos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('Arquivo selecionado:', file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    try {
      setUploading(true);
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}_${selectedFile.name}`;
      const filePath = `${fileName}`;

      // Upload para o Storage
      const { error: uploadError } = await supabase.storage
        .from('documentos')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Pegar URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('documentos')
        .getPublicUrl(filePath);

      // Salvar metadados na tabela
      const { error: dbError } = await supabase
        .from('documentos')
        .insert({
          nome: selectedFile.name,
          file_url: publicUrl,
          file_path: filePath,
          file_size: selectedFile.size,
          is_active: false,
          uploaded_by: user.id
        });

      if (dbError) throw dbError;

      // Atualizar lista
      await fetchDocumentos();
      setSelectedFile(null);
      
      // Limpar input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      alert('Upload realizado com sucesso!');
    } catch (err: any) {
      console.error('Erro no upload:', err);
      alert('Erro ao fazer upload: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSetActive = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documentos')
        .update({ is_active: true })
        .eq('id', id);

      if (error) throw error;

      // Atualizar localmente (o trigger do banco já desmarca os outros)
      await fetchDocumentos();
      
      console.log('Documento marcado como ativo!');
    } catch (err: any) {
      console.error('Erro ao marcar como ativo:', err);
      alert('Erro: ' + err.message);
    }
  };

  const handleDownload = async (documento: Documento) => {
    try {
      const { data, error } = await supabase.storage
        .from('documentos')
        .download(documento.file_path);

      if (error) throw error;

      // Criar link de download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = documento.nome;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Erro ao baixar:', err);
      alert('Erro ao baixar: ' + err.message);
    }
  };

  const handleDelete = async (id: string, filePath: string, isActive: boolean) => {
    if (isActive) {
      alert('Não é possível excluir a planilha ativa!');
      return;
    }

    if (!confirm('Tem certeza que deseja excluir este documento?')) {
      return;
    }

    try {
      // Deletar do Storage
      const { error: storageError } = await supabase.storage
        .from('documentos')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Deletar do banco
      const { error: dbError } = await supabase
        .from('documentos')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // Atualizar lista
      setDocumentos(documentos.filter(doc => doc.id !== id));
      
      alert('Documento excluído com sucesso!');
    } catch (err: any) {
      console.error('Erro ao excluir:', err);
      alert('Erro ao excluir: ' + err.message);
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  if (loading) {
    return (
      <AdminLayout activeSection="documentos">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando documentos...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeSection="documentos">
      <div className="space-y-6">
        {/* Upload de Planilha */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-border shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
            Upload de Planilha Mensal
          </h2>
          
          <div className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8">
            <div className="text-center">
              <Upload className="mx-auto text-muted-foreground mb-4" size={48} />
              
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 inline-block max-w-full">
                    <div className="flex items-center gap-3">
                      <FileText size={24} className="text-foreground flex-shrink-0" />
                      <div className="text-left min-w-0">
                        <p className="font-semibold text-foreground text-sm sm:text-base break-all">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                      {uploading ? 'Enviando...' : 'Fazer Upload'}
                    </button>
                    <button
                      onClick={() => setSelectedFile(null)}
                      disabled={uploading}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base px-2">
                    Arraste o arquivo .xls/.xlsx ou clique para selecionar
                  </p>
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileSelect}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors font-semibold text-sm sm:text-base"
                  >
                    Selecionar Arquivo
                  </label>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Histórico de Documentos */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-border shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              Histórico de Documentos
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              A planilha marcada como ativa será enviada aos solicitantes
            </p>
          </div>
          
          {documentos.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                Nenhum documento enviado ainda
              </h3>
              <p className="text-sm text-muted-foreground px-4">
                Faça upload da primeira planilha mensal acima.
              </p>
            </div>
          ) : (
            <>
              {/* Versão Desktop - Tabela */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Planilha Ativa
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Arquivo
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Data Upload
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Tamanho
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentos.map((doc) => (
                      <tr key={doc.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleSetActive(doc.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                              doc.is_active 
                                ? 'bg-green-100 text-green-700 font-semibold' 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                            title={doc.is_active ? 'Planilha ativa' : 'Marcar como ativa'}
                          >
                            <CheckCircle2 size={18} />
                            {doc.is_active && <span className="text-xs">Ativa</span>}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FileText size={18} className="text-muted-foreground" />
                            <span className="text-sm text-foreground font-medium">
                              {doc.nome}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(doc.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {formatFileSize(doc.file_size)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDownload(doc)}
                              className="p-2 hover:bg-muted rounded-lg transition-colors"
                              title="Baixar"
                            >
                              <Download size={18} className="text-foreground" />
                            </button>
                            <button
                              onClick={() => handleDelete(doc.id, doc.file_path, doc.is_active)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="Excluir"
                              disabled={doc.is_active}
                            >
                              <Trash2 
                                size={18} 
                                className={doc.is_active ? 'text-gray-300' : 'text-red-600'}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Versão Mobile - Cards */}
              <div className="md:hidden space-y-4">
                {documentos.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="border border-border rounded-lg p-4 space-y-3"
                  >
                    {/* Status Ativa */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleSetActive(doc.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                          doc.is_active 
                            ? 'bg-green-100 text-green-700 font-semibold' 
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        <CheckCircle2 size={16} />
                        <span>{doc.is_active ? 'Ativa' : 'Marcar como ativa'}</span>
                      </button>
                    </div>

                    {/* Nome do arquivo */}
                    <div className="flex items-start gap-2">
                      <FileText size={18} className="text-muted-foreground flex-shrink-0 mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground text-sm break-all">
                          {doc.nome}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(doc.created_at).toLocaleDateString('pt-BR')} • {formatFileSize(doc.file_size)}
                        </p>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Download size={16} className="text-foreground" />
                        <span className="text-sm font-medium">Baixar</span>
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.file_path, doc.is_active)}
                        disabled={doc.is_active}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 
                          size={16} 
                          className={doc.is_active ? 'text-gray-300' : 'text-red-600'}
                        />
                        <span className={`text-sm font-medium ${doc.is_active ? 'text-gray-300' : 'text-red-600'}`}>
                          Excluir
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Documentos;