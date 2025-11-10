import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

const SESSION_TIMEOUT = 600000; // 10 minutos em milissegundos

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Definir signOut antes do useEffect usando useCallback
  const signOut = useCallback(async () => {
    window.localStorage.removeItem('login_time');
    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  const signIn = async (email: string, password: string) => {
    // Limpa qualquer timestamp antigo
    window.localStorage.removeItem('login_time');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // Salva o timestamp do login
    if (!error) {
      window.localStorage.setItem('login_time', Date.now().toString());
    }
    
    return { data, error };
  };

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Verificar timeout a cada minuto
    const timeoutCheck = setInterval(() => {
      const loginTime = window.localStorage.getItem('login_time');
      if (loginTime) {
        const elapsed = Date.now() - parseInt(loginTime);
        if (elapsed > SESSION_TIMEOUT) {
          // Sessão expirou, fazer logout
          signOut();
        }
      }
    }, 60000); // Verifica a cada 1 minuto

    return () => {
      subscription.unsubscribe();
      clearInterval(timeoutCheck);
    };
  }, [signOut]);

  return {
    user,
    loading,
    signIn,
    signOut,
  };
};