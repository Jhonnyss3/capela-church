import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const ChurchLeadership = () => {
  const parallaxRef = useParallax(0.15);
  const pastors = [
    {
      name: "Washington Itaboraí",
      title: "Pastor Principal",
      image: "/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.png", // Placeholder - você pode substituir por fotos reais
      description: "Líder visionário com coração pastoral, dedicado ao ensino da Palavra e ao cuidado das ovelhas."
    },
    {
      name: "Marcelo Carvalho", 
      title: "Pastor Principal",
      image: "/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.png", // Placeholder
      description: "Apaixonado pela evangelização e pelo crescimento espiritual da igreja."
    },
    {
      name: "Dalber Estaneck",
      title: "Pastor Principal", 
      image: "/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.png", // Placeholder
      description: "Focado no discipulado e na formação de líderes para o Reino de Deus."
    }
  ];

  return (
    <section ref={parallaxRef} id="lideranca" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Nossa Liderança
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça os pastores que Deus levantou para liderar esta comunidade 
              com amor, humildade e dedicação à Palavra.
            </p>
          </div>

          {/* Pastors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastors.map((pastor, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  {/* Pastor Image */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-muted-foreground p-1">
                      <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                        <img 
                          src={pastor.image}
                          alt={pastor.name}
                          className="w-20 h-20 object-contain opacity-60 group-hover:opacity-80 transition-opacity"
                        />
                      </div>
                    </div>
                  </div>
                  
                   <h3 className="text-xl font-bold mb-2">{pastor.name}</h3>
                   <p className="text-primary font-medium mb-4">{pastor.title}</p>
                   <p className="text-muted-foreground text-sm leading-relaxed">
                    {pastor.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Entre em Contato</h3>
                <p className="text-muted-foreground mb-6">
                  Tem alguma dúvida ou gostaria de conversar com nossa liderança? 
                  Estamos aqui para você.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Mail className="w-5 h-5" />
                    <span>capelachurch@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Phone className="w-5 h-5" />
                    <span>(24) 99999-9999</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchLeadership;