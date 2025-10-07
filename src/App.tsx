
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PendoProvider } from "@/components/analytics/PendoProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Stocks from "./pages/Stocks";
import StockDetail from "./pages/StockDetail";
import Markets from "./pages/Markets";
import Currencies from "./pages/Currencies";
import Global from "./pages/Global";
import Portfolio from "./pages/Portfolio";
import Performance from "./pages/Performance";
import Analysis from "./pages/Analysis";
import AiChat from "./pages/AiChat";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <PendoProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/stocks" element={
              <ProtectedRoute>
                <Stocks />
              </ProtectedRoute>
            } />
            <Route path="/stocks/:symbol" element={
              <ProtectedRoute>
                <StockDetail />
              </ProtectedRoute>
            } />
            <Route path="/markets" element={
              <ProtectedRoute>
                <Markets />
              </ProtectedRoute>
            } />
            <Route path="/currencies" element={
              <ProtectedRoute>
                <Currencies />
              </ProtectedRoute>
            } />
            <Route path="/global" element={
              <ProtectedRoute>
                <Global />
              </ProtectedRoute>
            } />
            <Route path="/portfolio" element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            } />
            <Route path="/performance" element={
              <ProtectedRoute>
                <Performance />
              </ProtectedRoute>
            } />
            <Route path="/analysis" element={
              <ProtectedRoute>
                <Analysis />
              </ProtectedRoute>
            } />
            <Route path="/ai-chat" element={
              <ProtectedRoute>
                <AiChat />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
            </PendoProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
