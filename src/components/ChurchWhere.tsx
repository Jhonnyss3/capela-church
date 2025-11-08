import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Navigation } from "lucide-react";

const ChurchLocations = () => {
  const locations = [
    {
      name: "Unidade Volta Redonda",
      address: "Rua Tupi, 115 - Jardim Cidade do Aço, Volta Redonda - RJ",
      cep: "27275-330",
      schedule: "Domingos às 10h",
      mapsUrl: "https://www.google.com/maps/place/R.+Tupi,+115+-+Jardim+Cidade+do+Aco,+Volta+Redonda+-+RJ,+27275-330/@-22.5038761,-44.1149206,803m/data=!3m2!1e3!4b1!4m6!3m5!1s0x9e9817df063ae3:0x37fa6acee020d067!8m2!3d-22.5038761!4d-44.1149206!16s%2Fg%2F11s9q8cpd1!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D",
      image: "/images/locations/vr_location.png"
    },
    {
      name: "Unidade Niterói",
      address: "Av. Exemplo, 456 - Bairro, Volta Redonda - RJ",
      cep: "27200-000",
      schedule: "Domingos às 10h e 18h",
      mapsUrl: "https://maps.google.com/?q=Volta+Redonda+RJ",
      image: "/images/locations/niteroi_location.png"
    },
  ];

  return (
    <section id="onde-estamos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
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
            {locations.map((location, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  {/* Location Image */}
                  <div className="h-48 overflow-hidden bg-muted">
                    <img 
                      src={location.image} 
                      alt={location.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">{location.name}</h3>
                    
                    {/* Address */}
                    <div className="flex gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-muted-foreground">{location.address}</p>
                        <p className="text-sm text-muted-foreground">CEP: {location.cep}</p>
                      </div>
                    </div>
                    
                    {/* Schedule */}
                    <div className="flex gap-3 mb-6">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground">{location.schedule}</p>
                    </div>
                    
                    {/* Action Button */}
                    <a 
                      href={location.mapsUrl}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChurchLocations;