import { X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Inserir dados no Supabase
      const { error } = await supabase
        .from('solicitacoes')
        .insert({
          nome: formData.get('name') as string,
          telefone: formData.get('phone') as string,
          email: formData.get('email') as string,
          status: 'pendente',
          planilha_enviada: false
        });

      if (error) throw error;

      // Sucesso
      setIsSubmitted(true);
      form.reset();
    } catch (err: any) {
      console.error("Erro ao enviar solicitação:", err);
      setError("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.target.setCustomValidity("Por favor informe um e-mail válido");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity("");
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-2xl font-bold">Solicitar Prestação de Contas</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo Condicional: Mensagem de Sucesso OU Formulário */}
        {isSubmitted ? (
          // Mensagem de Sucesso
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold">Solicitação Enviada!</h4>
            <p className="text-muted-foreground">
              Sua solicitação foi recebida e retornaremos o contato em breve, fique de olho na caixa do seu e-mail cadastrado!
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Fechar
            </button>
          </div>
        ) : (
          // Formulário com Supabase
          <form 
            onSubmit={handleSubmit}
            className="p-6 space-y-4"
          >
            {/* Campo Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                placeholder="Seu nome completo"
              />
            </div>

            {/* Campo Telefone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isSubmitting}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onInvalid={handleEmailInvalid}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                placeholder="seu@email.com"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Digite um e-mail válido (ex: nome@exemplo.com)
              </p>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Aviso de Privacidade */}
            <p className="text-xs text-muted-foreground text-center">
              Ao enviar este formulário, você concorda com nossa{" "}
              <a 
                href="/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Política de Privacidade
              </a>.
            </p>

            {/* Botão de Enviar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Seus dados estão seguros e serão usados apenas para enviar a prestação de contas.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactFormModal;