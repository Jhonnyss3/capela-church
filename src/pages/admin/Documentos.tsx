import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { 
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface Documento {
  id: number;
  nome: string;
  fileUrl: string;
  fileSize: string;
  isActive: boolean;
  createdAt: string;
}

const Documentos = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Dados de exemplo - depois você substituirá por dados reais do Supabase
  const [documentos, setDocumentos] = useState<Documento[]>([
    {
      id: 1,
      nome: 'relatorio_janeiro_2025.xlsx',
      fileUrl: '#',
      fileSize: '2.5 MB',
      isActive: true,
      createdAt: '2025-02-01'
    },
    {
      id: 2,
      nome: 'relatorio_dezembro_2024.xlsx',
      fileUrl: '#',
      fileSize: '2.3 MB',
      isActive: false,
      createdAt: '2025-01-05'
    },
    {
      id: 3,
      nome: 'relatorio_novembro_2024.xlsx',
      fileUrl: '#',
      fileSize: '2.1 MB',
      isActive: false,
      createdAt: '2024-12-01'
    },
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('Arquivo selecionado:', file.name);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Fazendo upload:', selectedFile.name);
      // Aqui você adicionará a lógica para fazer upload no Supabase Storage
      // e salvar os metadados na tabela documents
      setSelectedFile(null);
    }
  };

  const handleSetActive = (id: number) => {
    console.log('Marcando documento como ativo:', id);
    // Aqui você adicionará a lógica para atualizar no Supabase
    // O trigger do banco vai desmarcar os outros automaticamente
    setDocumentos(documentos.map(doc => ({
      ...doc,
      isActive: doc.id === id
    })));
  };

  const handleDownload = (documento: Documento) => {
    console.log('Baixando documento:', documento.nome);
    // Aqui você adicionará a lógica para baixar do Supabase Storage
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      console.log('Excluindo documento:', id);
      // Aqui você adicionará a lógica para excluir do Supabase
      setDocumentos(documentos.filter(doc => doc.id !== id));
    }
  };

  return (
    <AdminLayout activeSection="documentos">
      <div className="space-y-6">
        {/* Upload de Planilha */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Upload de Planilha Mensal
          </h2>
          
          <div className="border-2 border-dashed border-border rounded-lg p-8">
            <div className="text-center">
              <Upload className="mx-auto text-muted-foreground mb-4" size={48} />
              
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 inline-block">
                    <div className="flex items-center gap-3">
                      <FileText size={24} className="text-foreground" />
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleUpload}
                      className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Fazer Upload
                    </button>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">
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
                    className="inline-block px-6 py-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Selecionar Arquivo
                  </label>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Histórico de Documentos */}
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-2">
              Histórico de Documentos
            </h2>
            <p className="text-sm text-muted-foreground">
              A planilha marcada como ativa será enviada aos solicitantes
            </p>
          </div>
          
          {documentos.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum documento enviado ainda
              </h3>
              <p className="text-muted-foreground">
                Faça upload da primeira planilha mensal acima.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
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
                            doc.isActive 
                              ? 'bg-green-100 text-green-700 font-semibold' 
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                          title={doc.isActive ? 'Planilha ativa' : 'Marcar como ativa'}
                        >
                          <CheckCircle2 size={18} />
                          {doc.isActive && <span className="text-xs">Ativa</span>}
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
                        {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {doc.fileSize}
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
                            onClick={() => handleDelete(doc.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Excluir"
                            disabled={doc.isActive}
                          >
                            <Trash2 
                              size={18} 
                              className={doc.isActive ? 'text-gray-300' : 'text-red-600'}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Documentos;