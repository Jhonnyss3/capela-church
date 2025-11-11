import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, name, documentUrl, documentName } = req.body;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Capela Church <onboarding@resend.dev>',
        to: [to],
        subject: 'Prestação de Contas - Capela Church',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
              <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #000; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
                  .button { 
                      display: inline-block; 
                      background: #000; 
                      color: #fff !important; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      margin: 20px 0;
                  }
                  .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1 style="margin: 0;">Capela Church</h1>
                  </div>
                  <div class="content">
                      <h2>Olá, ${name}!</h2>
                      <p>Sua solicitação de prestação de contas foi processada.</p>
                      <p>Clique no botão abaixo para baixar a planilha:</p>
                      <p style="text-align: center;">
                          <a href="${documentUrl}" class="button">Baixar Planilha</a>
                      </p>
                      <p><small>Arquivo: ${documentName}</small></p>
                      <p>Qualquer dúvida, entre em contato conosco.</p>
                      <br>
                      <p>Atenciosamente,<br><strong>Equipe Capela Church</strong></p>
                  </div>
                  <div class="footer">
                      <p>© ${new Date().getFullYear()} Capela Church. Todos os direitos reservados.</p>
                  </div>
              </div>
          </body>
          </html>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao enviar email');
    }

    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Erro:', error);
    return res.status(500).json({ error: error.message });
  }
}