import { Button } from "@/components/ui/button";
import { Cross } from "lucide-react";

const ChurchHero = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('sobre');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden pb-0">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted opacity-50" />
      
      {/* Logo background - subtle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src="/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.png" 
          alt="Capela Church Logo" 
          className="w-96 h-96 object-contain"
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Church Logo */}
          <div className="mb-8 mt-16 md:mt-24">
            <img 
              src="/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.png" 
              alt="Capela Church Logo" 
              className="w-32 h-32 mx-auto object-contain"
            />
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            CAPELA
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-2">CHURCH</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 text-muted-foreground">
            A Igreja para quem não gosta de Igreja
          </p>
          
          {/* Bible Verse */}
          <div className="mb-12 p-6 border border-border rounded-lg bg-card max-w-2xl mx-auto">
            <Cross className="w-6 h-6 mx-auto mb-4 text-primary" />
            <p className="text-lg italic text-muted-foreground mb-2">
              "E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações."
            </p>
            <p className="text-sm font-medium">— Atos 2:42</p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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