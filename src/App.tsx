import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NossaHistoria from "./pages/NossaHistoria";
import OndeEstamos from "./pages/OndeEstamos";
import ComoCremos from "./pages/ComoCremos";
import SejaGeneroso from "./pages/SejaGeneroso";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/nossa-historia" element={<NossaHistoria />} />
            <Route path="/onde-estamos" element={<OndeEstamos />} />
            <Route path="/como-cremos" element={<ComoCremos />} />
            <Route path="/seja-generoso" element={<SejaGeneroso />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;