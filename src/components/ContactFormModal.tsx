import { X } from "lucide-react";
import { useState } from "react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/jpsanglard28@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
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
              Sua solicitação foi recebida e retornaremos o contato em breve.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Fechar
            </button>
          </div>
        ) : (
          // Formulário com FormSubmit
          <form 
            onSubmit={handleSubmit}
            className="p-6 space-y-4"
          >
            {/* Configurações do FormSubmit (campos ocultos) */}
            <input type="hidden" name="_subject" value="Nova Solicitação de Prestação de Contas - Capela Church" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="text" name="_honey" style={{ display: 'none' }} />
            
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
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50"
                placeholder="seu@email.com"
              />
            </div>

            {/* Aviso de Privacidade - NOVO */}
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