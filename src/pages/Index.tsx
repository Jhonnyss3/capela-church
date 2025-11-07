
import PageLayout from '@/components/PageLayout';
import ChurchHero from '@/components/ChurchHero';
import ChurchAbout from '@/components/ChurchAbout';
import ChurchLeadership from '@/components/ChurchLeadership';
import SEO from '@/components/SEO';
import { useEffect } from 'react';

const Index = () => {
  // Fix any ID conflicts when the page loads
  useEffect(() => {
    const contactElements = document.querySelectorAll('[id="contact"]');
    if (contactElements.length > 1) {
      // If there are multiple elements with id="contact", rename one
      contactElements[1].id = 'contact-footer';
    }
  }, []);

  return (
    <PageLayout showContact={false}>
      <SEO 
        title="Capela Church - A Igreja para quem não gosta de Igreja" 
        description="Capela Church: Uma comunidade baseada em Atos 2:42. Venha como você é e descubra o amor genuíno de Deus em Volta Redonda."
        imageUrl="/lovable-uploads/936d6883-f1f9-4973-a4d5-d20c5292eca7.png"
        keywords={['igreja', 'cristianismo', 'Volta Redonda', 'comunidade cristã', 'Atos 2:42', 'Capela Church', 'igreja evangélica']}
      />
      <ChurchHero />
      <ChurchAbout />
      <ChurchLeadership />
    </PageLayout>
  );
};

export default Index;
