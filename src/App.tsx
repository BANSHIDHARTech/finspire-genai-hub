
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create empty placeholder pages for navigation
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4 text-slate-900">{title}</h1>
      <p className="text-xl text-slate-600">This page is under construction</p>
      <a href="/" className="mt-6 inline-block text-finspire-600 hover:text-finspire-700 font-medium">
        Return to Home
      </a>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chatbot" element={<PlaceholderPage title="AI Chatbot" />} />
          <Route path="/portfolio" element={<PlaceholderPage title="Portfolio Tracking" />} />
          <Route path="/expenses" element={<PlaceholderPage title="Expense Management" />} />
          <Route path="/learn" element={<PlaceholderPage title="Learning Resources" />} />
          <Route path="/news" element={<PlaceholderPage title="Financial News" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
