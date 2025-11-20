import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      throw new Error('Secret key não configurada');
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const response = await fetch(verifyUrl, {
      method: 'POST',
    });

    const data = await response.json();

    if (data.success && data.score >= 0.5) {
      return res.status(200).json({ 
        success: true, 
        score: data.score 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        score: data.score,
        error: 'Verificação do reCAPTCHA falhou'
      });
    }
  } catch (error: any) {
    console.error('Erro ao verificar reCAPTCHA:', error);
    return res.status(500).json({ 
      error: 'Erro ao verificar reCAPTCHA',
      details: error.message 
    });
  }
}