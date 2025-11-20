import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { RecaptchaProvider } from "./providers/RecaptchaProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Admin from "./pages/Admin";
import DashboardPage from "./pages/admin/Dashboard";
import SolicitacoesPage from "./pages/admin/Solicitacoes";
import DocumentosPage from "./pages/admin/Documentos";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecaptchaProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* Rotas Protegidas */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/solicitacoes" 
                element={
                  <ProtectedRoute>
                    <SolicitacoesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/documentos" 
                element={
                  <ProtectedRoute>
                    <DocumentosPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RecaptchaProvider>
    </QueryClientProvider>
  );
};

export default App;