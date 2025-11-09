import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Navigation } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ChurchLocations = () => {
  const parallaxRef = useParallax(0.2);
  const headerReveal = useScrollReveal(0.1);
  const leftCardReveal = useScrollReveal(0.1);
  const rightCardReveal = useScrollReveal(0.1);

  const locations = [
    {
      name: "Unidade Volta Redonda",
      address: "Rua Tupi, 115 - Jardim Cidade do Aço, Volta Redonda - RJ",
      cep: "27275-330",
      schedule: "Domingos às 10h",
      mapsUrl: "https://www.google.com/maps/place/R.+Tupi,+115+-+Jardim+Cidade+do+Aco,+Volta+Redonda+-+RJ,+27275-330/@-22.5038761,-44.1149206,803m/data=!3m2!1e3!4b1!4m6!3m5!1s0x9e9817df063ae3:0x37fa6acee020d067!8m2!3d-22.5038761!4d-44.1149206!16s%2Fg%2F11s9q8cpd1!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D",
      image: "/images/locations/vr_location.webp"
    },
    {
      name: "Unidade Niterói",
      address: "Rua Dr. Martins Torres, 542 - Niterói - RJ",
      cep: "24240-705",
      schedule: "Domingos às 10h e 18h",
      mapsUrl: "https://www.google.com/maps/place/R.+Dr.+Martins+T%C3%B4rres,+542+-+Santa+Rosa,+Niter%C3%B3i+-+RJ,+24240-705/data=!4m2!3m1!1s0x998412af76c1e7:0x145b7719287a7514?sa=X&ved=1t:242&ictx=111",
      image: "/images/locations/niteroi_location.webp"
    },
  ];

  return (
    <section ref={parallaxRef} id="onde-estamos" className="py-20 bg-background relative z-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header with slide from top animation */}
          <div 
            ref={headerReveal.ref}
            className={`text-center mb-16 opacity-0 ${
              headerReveal.isVisible ? 'animate-slideInFromTop' : ''
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Onde Estamos
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Venha nos visitar! Temos unidades em diferentes regiões para estar 
              mais perto de você e sua família.
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Card - Volta Redonda */}
            <div
              ref={leftCardReveal.ref}
              className={`opacity-0 ${
                leftCardReveal.isVisible ? 'animate-slideInFromLeft' : ''
              }`}
            >
              <Card className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  {/* Location Image */}
                  <div className="h-48 overflow-hidden bg-muted">
                    <img 
                      src={locations[0].image} 
                      alt={locations[0].name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">{locations[0].name}</h3>
                    
                    {/* Address */}
                    <div className="flex gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-muted-foreground">{locations[0].address}</p>
                        <p className="text-sm text-muted-foreground">CEP: {locations[0].cep}</p>
                      </div>
                    </div>
                    
                    {/* Schedule */}
                    <div className="flex gap-3 mb-6">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground">{locations[0].schedule}</p>
                    </div>
                    
                    {/* Action Button */}
                    <a 
                      href={locations[0].mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Como Chegar
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Card - Niterói */}
            <div
              ref={rightCardReveal.ref}
              className={`opacity-0 ${
                rightCardReveal.isVisible ? 'animate-slideInFromRight' : ''
              }`}
            >
              <Card className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  {/* Location Image */}
                  <div className="h-48 overflow-hidden bg-muted">
                    <img 
                      src={locations[1].image} 
                      alt={locations[1].name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">{locations[1].name}</h3>
                    
                    {/* Address */}
                    <div className="flex gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-muted-foreground">{locations[1].address}</p>
                        <p className="text-sm text-muted-foreground">CEP: {locations[1].cep}</p>
                      </div>
                    </div>
                    
                    {/* Schedule */}
                    <div className="flex gap-3 mb-6">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground">{locations[1].schedule}</p>
                    </div>
                    
                    {/* Action Button */}
                    <a 
                      href={locations[1].mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      Como Chegar
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent"></div>
    </section>
  );
};

export default ChurchLocations;