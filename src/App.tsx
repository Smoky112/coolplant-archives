import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Servizi from "./pages/Servizi";
import News from "./pages/News";
import Contatti from "./pages/Contatti";
import Login from "./pages/Login";
import Terminal from "./pages/Terminal";
import Dipendenti from "./pages/Dipendenti";
import Eden from "./pages/Eden";
import ServerFarm from "./pages/ServerFarm";
import SOCMonitor from "./pages/SOCMonitor";
import FirewallPage from "./pages/FirewallPage";
import BackupPage from "./pages/BackupPage";
import AuthServerPage from "./pages/AuthServerPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/news" element={<News />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/dipendenti" element={<Dipendenti />} />
          <Route path="/eden" element={<Eden />} />
          <Route path="/server-farm" element={<ServerFarm />} />
          <Route path="/soc-monitor" element={<SOCMonitor />} />
          <Route path="/firewall" element={<FirewallPage />} />
          <Route path="/backup" element={<BackupPage />} />
          <Route path="/auth-server" element={<AuthServerPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;