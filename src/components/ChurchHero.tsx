import { Button } from "@/components/ui/button";
import { Cross } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const ChurchHero = () => {
  const parallaxRef = useParallax(0.3);
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('sobre');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={parallaxRef} className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted opacity-50" />
      
      {/* Logo background - subtle with fade in */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 animate-fadeInSubtle" style={{ animationDelay: '0.5s' }}>
        <img 
          src="/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.webp" 
          alt="Capela Church Logo" 
          className="w-96 h-96 object-contain"
          loading="lazy"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Church Logo - Animação de entrada suave */}
          <div className="mb-8 mt-16 md:mt-24 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <img 
              src="/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.webp" 
              alt="Capela Church Logo" 
              className="w-32 h-32 mx-auto object-contain"
              fetchPriority="high"
              width="128"
              height="128"
            />
          </div>
          
          {/* Main Title - Animação escalonada */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              CAPELA
            </span>
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              CHURCH
            </span>
          </h1>
          
          {/* Subtitle - Fade in */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 text-muted-foreground opacity-0 animate-fadeInUp" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            A Igreja para quem não gosta de Igreja
          </p>
          
          {/* Bible Verse - Slide up */}
          <div className="mb-12 p-6 border border-border rounded-lg bg-card max-w-2xl mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            <Cross className="w-6 h-6 mx-auto mb-4 text-primary" />
            <p className="text-lg italic text-muted-foreground mb-2">
              "E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações."
            </p>
            <p className="text-sm font-medium">— Atos 2:42</p>
          </div>
          
          {/* CTA Buttons - Aparecem por último */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
            <Button size="lg" className="text-lg px-8 py-4" onClick={() => window.open('https://www.instagram.com/capelachurch/', '_blank')}>
              Nos siga no Instagram
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4" onClick={scrollToNextSection}>
              Conheça nossa história
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchHero;