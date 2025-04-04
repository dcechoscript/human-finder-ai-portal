
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AiMatchingButton from "@/components/AiMatchingButton";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Missing from "./pages/Missing";
import Found from "./pages/Found";
import PersonDetail from "./pages/PersonDetail";
import ReportMissing from "./pages/ReportMissing";
import ReportFound from "./pages/ReportFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/missing" element={<Missing />} />
            <Route path="/found" element={<Found />} />
            <Route path="/person/:id" element={<PersonDetail />} />
            <Route path="/report/missing" element={<ReportMissing />} />
            <Route path="/report/found" element={<ReportFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AiMatchingButton />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
