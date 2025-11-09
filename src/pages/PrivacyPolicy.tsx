import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

const PrivacyPolicy = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout showContact={false}>
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Início
            </Link>
            
            <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Última atualização: 11 de Abril de 2025</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introdução</h2>
              <p className="text-gray-600 mb-4">
                Na Capela Church ("nós" ou "nosso"), respeitamos sua privacidade e estamos comprometidos em proteger suas informações pessoais. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site ou utiliza nossos serviços.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Informações que Coletamos</h2>
              <p className="text-gray-600 mb-4">
                Podemos coletar informações pessoais que você fornece voluntariamente quando:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Entra em contato conosco através do nosso site</li>
                <li>Se inscreve em nossa newsletter</li>
                <li>Registra-se para nossos serviços</li>
                <li>Participa de nossas pesquisas ou promoções</li>
              </ul>
              <p className="text-gray-600 mb-4">
                Essas informações podem incluir seu nome, endereço de e-mail, número de telefone e qualquer outra informação que você escolher fornecer.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Como Usamos Suas Informações</h2>
              <p className="text-gray-600 mb-4">
                Podemos usar as informações que coletamos para diversos propósitos, incluindo:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Fornecer, operar e manter nossos serviços</li>
                <li>Melhorar, personalizar e expandir nossos serviços</li>
                <li>Compreender e analisar como você usa nossos serviços</li>
                <li>Desenvolver novos produtos, serviços, recursos e funcionalidades</li>
                <li>Comunicar com você sobre nossos serviços, atualizações e outras informações</li>
                <li>Processar transações e enviar informações relacionadas</li>
                <li>Encontrar e prevenir fraudes</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies e Tecnologias de Rastreamento</h2>
              <p className="text-gray-600 mb-4">
                Utilizamos cookies e tecnologias de rastreamento para melhorar sua experiência em nosso site. Os cookies que utilizamos incluem:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li><strong className="text-gray-800">Cookies Necessários:</strong> Essenciais para o funcionamento do site e não podem ser desativados. Eles permitem recursos básicos como navegação de páginas e acesso a áreas seguras do site.</li>
                <li><strong className="text-gray-800">Cookies Analíticos:</strong> Utilizamos Google Analytics para entender como os visitantes interagem com nosso site. Esses cookies nos ajudam a melhorar a funcionalidade e o conteúdo do site.</li>
                <li><strong className="text-gray-800">Cookies de Publicidade:</strong> Podem ser utilizados para personalizar conteúdo e anúncios relevantes para você. Esses cookies são definidos por nós ou por parceiros de publicidade.</li>
              </ul>
              <p className="text-gray-600 mb-4">
                Você pode gerenciar suas preferências de cookies a qualquer momento através do banner de consentimento que aparece ao visitar nosso site pela primeira vez. Você também pode instruir seu navegador a recusar todos os cookies ou a indicar quando um cookie está sendo enviado.
              </p>
              <p className="text-gray-600 mb-4">
                <strong className="text-gray-800">Importante:</strong> Se você optar por desabilitar cookies, algumas funcionalidades do nosso site podem não funcionar corretamente.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Serviços de Terceiros</h2>
              <p className="text-gray-600 mb-4">
                Podemos usar serviços de terceiros que coletam, monitoram e analisam dados para melhorar nossos serviços. Atualmente utilizamos:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li><strong className="text-gray-800">Google Tag Manager e Google Analytics:</strong> Para análise de tráfego e comportamento dos usuários em nosso site.</li>
                <li><strong className="text-gray-800">FormSubmit:</strong> Para processar mensagens enviadas através de nossos formulários de contato.</li>
              </ul>
              <p className="text-gray-600 mb-4">
                Esses terceiros têm suas próprias políticas de privacidade que abordam como eles usam essas informações. Recomendamos que você revise as políticas de privacidade desses serviços.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Retenção de Dados</h2>
              <p className="text-gray-600 mb-4">
                Manteremos suas informações pessoais apenas pelo tempo necessário para os propósitos estabelecidos nesta Política de Privacidade. Reteremos e usaremos suas informações na medida necessária para cumprir nossas obrigações legais, resolver disputas e fazer cumprir nossas políticas.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Segurança</h2>
              <p className="text-gray-600 mb-4">
                A segurança de seus dados é importante para nós, mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger suas informações pessoais, não podemos garantir sua segurança absoluta.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Seus Direitos (LGPD)</h2>
              <p className="text-gray-600 mb-4">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos em relação às suas informações pessoais:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Confirmação da existência de tratamento de dados</li>
                <li>Acesso aos seus dados pessoais</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Portabilidade de dados a outro fornecedor</li>
                <li>Eliminação de dados tratados com seu consentimento</li>
                <li>Revogação do consentimento</li>
              </ul>
              <p className="text-gray-600 mb-4">
                Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail: capelachurch@gmail.com
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Alterações a Esta Política de Privacidade</h2>
              <p className="text-gray-600 mb-4">
                Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página e atualizando a data de "Última atualização" no topo desta política.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Entre em Contato</h2>
              <p className="text-gray-600 mb-4">
                Se você tiver alguma dúvida sobre esta Política de Privacidade, sobre o tratamento de seus dados pessoais ou quiser exercer seus direitos sob a LGPD, entre em contato conosco em:
              </p>
              <p className="text-gray-600 mb-4">
                <strong className="text-gray-800">E-mail:</strong> capelachurch@gmail.com
              </p>
              
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;