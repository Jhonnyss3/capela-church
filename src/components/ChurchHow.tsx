import { Card, CardContent } from "@/components/ui/card";
import { Book, Cross, Heart, Users } from "lucide-react";

const ChurchHow = () => {
  // ID do vídeo do YouTube (você pode alterar para o vídeo correto)
  // Exemplo: se a URL é https://www.youtube.com/watch?v=ABC123xyz, o videoId é "ABC123xyz"
  const youtubeVideoId = "dQw4w9WgXcQ"; // ← SUBSTITUA pelo ID real do seu vídeo

  const beliefs = [
    {
      icon: <Book className="w-12 h-12 mx-auto mb-4 text-primary" />,
      title: "A Bíblia",
      description: "Cremos que a Bíblia é a Palavra de Deus inspirada, infalível e autoridade final para nossa fé e prática.",
    },
    {
      icon: <Cross className="w-12 h-12 mx-auto mb-4 text-primary" />,
      title: "Jesus Cristo",
      description: "Cremos em Jesus Cristo como único Filho de Deus, Salvador e Senhor de nossas vidas.",
    },
    {
      icon: <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />,
      title: "Salvação",
      description: "Cremos que a salvação é pela graça mediante a fé em Jesus Cristo, não por obras.",
    },
    {
      icon: <Users className="w-12 h-12 mx-auto mb-4 text-primary" />,
      title: "A Igreja",
      description: "Cremos que a igreja é o corpo de Cristo, formada por todos que creem e O seguem.",
    },
  ];

  return (
    <section id="como-cremos" className="py-20 bg-muted">
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
                  src="https://www.youtube.com/embed/tddHX4HAEnE?start=14"
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

          {/* Beliefs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beliefs.map((belief, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {belief.icon}
                  <h3 className="text-xl font-semibold mb-3">{belief.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {belief.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Statement of Faith (Optional) */}
          <div className="mt-16 bg-background rounded-2xl p-8 md:p-12">
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