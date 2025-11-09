import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ContactFormModal from "@/components/ContactFormModal";

const ChurchBeChurch = () => {
  const [activeTab, setActiveTab] = useState("video1");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const parallaxRef = useParallax(0.1);
  
  // Scroll reveal hooks for each section
  const headerReveal = useScrollReveal(0.1);
  const textReveal = useScrollReveal(0.1);
  const videoReveal = useScrollReveal(0.1);
  const ctaReveal = useScrollReveal(0.1);

  const videos = {
    video1: {
      id: "Ujyzhnb7B6I",
      title: "Money",
      description: "Parte 1"
    },
    video2: {
      id: "cA5yCsdOe8Q",
      title: "Money",
      description: "Parte 2"
    }
  };

  return (
    <>
      <section ref={parallaxRef} id="seja-generoso" className="py-20 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header - Slide from top */}
            <div 
              ref={headerReveal.ref}
              className={`text-center mb-16 opacity-0 ${
                headerReveal.isVisible ? 'animate-slideInFromTop' : ''
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Seja Generoso
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                A generosidade é mais do que doar dinheiro, é um estilo de vida que 
                reflete o coração de Deus. Quando somos generosos, participamos da 
                obra de transformação que Deus está fazendo no mundo.
              </p>
            </div>

            {/* Video and Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
              {/* Text Content - Slide from left */}
              <div
                ref={textReveal.ref}
                className={`opacity-0 ${
                  textReveal.isVisible ? 'animate-slideInFromLeft' : ''
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Por Que Ser Generoso?
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A Bíblia nos ensina que "Deus ama quem dá com alegria" (2 Coríntios 9:7). 
                    A generosidade não é uma obrigação, mas uma resposta de gratidão ao amor 
                    que recebemos de Deus.
                  </p>
                  <p>
                    Quando você contribui com a Capela Church, está investindo em vidas, 
                    sustentando ministérios, ajudando famílias e levando esperança para 
                    nossa comunidade.
                  </p>
                  <p>
                    Sua generosidade permite que continuemos compartilhando o amor de Deus 
                    através de cultos, eventos, ações sociais e muito mais.
                  </p>
                </div>
              </div>

              {/* YouTube Video with Tabs - Slide from right */}
              <div
                ref={videoReveal.ref}
                className={`opacity-0 ${
                  videoReveal.isVisible ? 'animate-slideInFromRight' : ''
                }`}
              >
                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab("video1")}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === "video1"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <div className="text-sm font-semibold">{videos.video1.title}</div>
                    <div className="text-xs opacity-80">{videos.video1.description}</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("video2")}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === "video2"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <div className="text-sm font-semibold">{videos.video2.title}</div>
                    <div className="text-xs opacity-80">{videos.video2.description}</div>
                  </button>
                </div>

                {/* Video Player */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    key={activeTab}
                    className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
                    src={`https://www.youtube-nocookie.com/embed/${videos[activeTab].id}`}
                    title={videos[activeTab].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Call to Action - Slide from bottom */}
            <div
              ref={ctaReveal.ref}
              className={`bg-muted rounded-2xl p-8 md:p-12 text-center opacity-0 ${
                ctaReveal.isVisible ? 'animate-slideInFromBottom' : ''
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Nossas Contas
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Solicite nossa planilha de prestação de contas de forma totalmente transparente. 
              </p>
              
              {/* Contact Button */}
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-3 bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-6 h-6" />
                Solicitar Prestação de Contas
              </button>

              <p className="text-sm text-muted-foreground mt-6">
                "Cada um contribua segundo tiver proposto no coração, não com tristeza 
                ou por necessidade; porque Deus ama a quem dá com alegria." - 2 Coríntios 9:7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal do Formulário */}
      <ContactFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
};

export default ChurchBeChurch;