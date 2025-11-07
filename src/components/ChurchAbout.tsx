import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Book, Hand } from "lucide-react";

const ChurchAbout = () => {
  return (
    <section id="sobre" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Uma igreja diferente
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Somos uma comunidade que acredita que igreja não é lugar, mas pessoas. 
              Venha como você é e descubra o amor genuíno de Deus.
            </p>
          </div>
          
          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Amor Genuíno</h3>
                <p className="text-muted-foreground">
                  Acreditamos no amor incondicional como base de tudo que fazemos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Comunhão</h3>
                <p className="text-muted-foreground">
                  Construímos relacionamentos verdadeiros e duradouros.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Book className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Palavra</h3>
                <p className="text-muted-foreground">
                  Ensinamos a Bíblia de forma prática e relevante para o dia a dia.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Hand className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">Serviço</h3>
                <p className="text-muted-foreground">
                  Servimos nossa comunidade com ações práticas de amor.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Story Section */}
          <div className="bg-background rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Nossa História
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A Capela Church nasceu com um propósito simples: ser uma igreja para quem não gosta de igreja. 
                    Sabemos que muitas pessoas se afastaram da fé por experiências negativas ou por uma visão 
                    distorcida do que realmente significa seguir a Jesus.
                  </p>
                  <p>
                    Nossa comunidade é formada por pessoas reais, com histórias reais e problemas reais. 
                    Não temos respostas prontas para tudo, mas temos um Deus que nos ama incondicionalmente.
                  </p>
                  <p>
                    Baseados em Atos 2:42, perseveramos na doutrina dos apóstolos, na comunhão, 
                    no partir do pão e nas orações. Isso é o que nos define como igreja.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary to-muted-foreground rounded-2xl p-1">
                  <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.png" 
                      alt="Capela Church Logo" 
                      className="w-48 h-48 object-contain opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchAbout;