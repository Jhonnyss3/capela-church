import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCallback } from 'react';

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const verifyRecaptcha = useCallback(async (action: string): Promise<boolean> => {
    if (!executeRecaptcha) {
      console.error('reCAPTCHA não está disponível');
      return false;
    }

    try {
      // Gerar token do reCAPTCHA
      const token = await executeRecaptcha(action);

      // Validar token no servidor
      const response = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success && data.score >= 0.5) {
        console.log('reCAPTCHA verificado com sucesso. Score:', data.score);
        return true;
      } else {
        console.warn('reCAPTCHA falhou. Score:', data.score);
        return false;
      }
    } catch (error) {
      console.error('Erro ao verificar reCAPTCHA:', error);
      return false;
    }
  }, [executeRecaptcha]);

  return { verifyRecaptcha };
};