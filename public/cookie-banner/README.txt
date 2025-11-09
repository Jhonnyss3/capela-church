Instruções de Instalação do Gerenciador de Consentimento

1. Extraia o conteúdo deste arquivo zip
2. Coloque os arquivos no diretório do seu site
3. Adicione o seguinte código à sua página HTML, dentro da tag <head>:

<link rel="stylesheet" id="silktide-consent-manager-css" href="caminho-para-css/silktide-consent-manager.css">
<script src="caminho-para-js/silktide-consent-manager.js"></script>
<script>
silktideCookieBannerManager.updateCookieBannerConfig({
  background: {
    showBackground: true
  },
  cookieIcon: {
    position: "bottomLeft"
  },
  cookieTypes: [
    {
      id: "necessary",
      name: "Necessários",
      description: "<p>Estes cookies são necessários para o funcionamento adequado do site e não podem ser desativados. Eles ajudam com funções como login e configuração de suas preferências de privacidade.</p>",
      required: true,
      onAccept: function() {
        console.log('Adicione a lógica para os cookies Necessários aqui');
      }
    },
    {
      id: "analytical",
      name: "Analíticos",
      description: "<p>Estes cookies nos ajudam a melhorar o site rastreando quais páginas são mais populares e como os visitantes se movem pelo site.</p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_analytical',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    },
    {
      id: "advertising",
      name: "Publicidade",
      description: "<p>Estes cookies fornecem recursos extras e personalização para melhorar sua experiência. Eles podem ser definidos por nós ou por parceiros cujos serviços utilizamos.</p>",
      required: false,
      onAccept: function() {
        gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
        dataLayer.push({
          'event': 'consent_accepted_advertising',
        });
      },
      onReject: function() {
        gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
    }
  ],
  text: {
    banner: {
      description: "<p>Usamos cookies em nosso site para melhorar sua experiência, fornecer conteúdo personalizado e analisar nosso tráfego. <a href=\"https://seu-site.com/politica-de-cookies\" target=\"_blank\">Política de Cookies.</a></p>",
      acceptAllButtonText: "Aceitar todos",
      acceptAllButtonAccessibleLabel: "Aceitar todos os cookies",
      rejectNonEssentialButtonText: "Rejeitar não essenciais",
      rejectNonEssentialButtonAccessibleLabel: "Rejeitar cookies não essenciais",
      preferencesButtonText: "Preferências",
      preferencesButtonAccessibleLabel: "Abrir preferências"
    },
    preferences: {
      title: "Personalize suas preferências de cookies",
      description: "<p>Respeitamos seu direito à privacidade. Você pode escolher não permitir alguns tipos de cookies. Suas preferências de cookies serão aplicadas em todo o nosso site.</p>",
      creditLinkText: "Obtenha este banner gratuitamente",
      creditLinkAccessibleLabel: "Obtenha este banner gratuitamente"
    }
  }
});
</script>