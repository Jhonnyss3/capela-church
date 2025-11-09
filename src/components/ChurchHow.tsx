import { Card, CardContent } from "@/components/ui/card";
import { Book, Cross, Heart, Users } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const ChurchHow = () => {
  const parallaxRef = useParallax(-0.1); 

  return (
    <section ref={parallaxRef} id="como-cremos" className="py-20 bg-muted relative z-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Como Cremos
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Nossa fé está fundamentada na Palavra de Deus e nos ensinamentos de Jesus Cristo.
              Conheça os pilares que sustentam nossa comunidade.
            </p>
          </div>

          {/* Video and Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
            {/* YouTube Video */}
            <div className="order-2 lg:order-1">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
                  src="https://www.youtube-nocookie.com/embed/tddHX4HAEnE?start=14"
                  title="Como Cremos - Capela Church"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Fundamentos da Nossa Fé
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nossa fé é simples e centrada em Cristo. Não complicamos o evangelho 
                  nem adicionamos tradições humanas à mensagem de salvação.
                </p>
                <p>
                  Cremos que seguir a Jesus é sobre relacionamento, não religiosidade. 
                  É sobre transformação de vida, não apenas rituais.
                </p>
                <p>
                  Baseados em Atos 2:42, perseveramos na doutrina dos apóstolos, 
                  na comunhão, no partir do pão e nas orações.
                </p>
              </div>
            </div>
          </div>

          {/* Declaration Section */}
          <div className="bg-background rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Nossa Declaração de Fé
            </h3>
            <div className="space-y-4 text-muted-foreground max-w-4xl mx-auto">
              <p>
                <strong className="text-foreground">A Trindade:</strong> Cremos em um só Deus, 
                eternamente existente em três pessoas: Pai, Filho e Espírito Santo.
              </p>
              <p>
                <strong className="text-foreground">A Bíblia Sagrada:</strong> Cremos que a Bíblia 
                é a Palavra de Deus, inspirada pelo Espírito Santo, e nossa única regra de fé e prática.
              </p>
              <p>
                <strong className="text-foreground">Jesus Cristo:</strong> Cremos que Jesus Cristo 
                é o Filho de Deus, nascido da virgem Maria, morreu na cruz por nossos pecados, 
                ressuscitou ao terceiro dia e voltará em glória.
              </p>
              <p>
                <strong className="text-foreground">O Espírito Santo:</strong> Cremos no Espírito Santo 
                como a terceira pessoa da Trindade, que convence do pecado, regenera, santifica 
                e capacita os crentes para o serviço.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchHow;