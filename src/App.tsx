import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ChatbaseWidget } from "@/components/ChatbaseWidget";
import { LocalChatbot } from "@/components/LocalChatbot";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RemindersDemo from "./pages/RemindersDemo";
import ScheduleDemo from "./pages/ScheduleDemo";
import OrderingDemo from "./pages/OrderingDemo";
import HelperRemindersDemo from "./pages/HelperRemindersDemo";
import SOSDemo from "./pages/SOSDemo";
import SOSContactsDemo from "./pages/SOSContactsDemo";
import MedicalMapDemo from "./pages/MedicalMapDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LocalChatbot />
          <ChatbaseWidget />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/demo/reminders" element={<ProtectedRoute><RemindersDemo /></ProtectedRoute>} />
              <Route path="/demo/schedule" element={<ProtectedRoute><ScheduleDemo /></ProtectedRoute>} />
              <Route path="/demo/order" element={<ProtectedRoute><OrderingDemo /></ProtectedRoute>} />
              <Route path="/demo/helper-reminders" element={<ProtectedRoute><HelperRemindersDemo /></ProtectedRoute>} />
              <Route path="/demo/sos" element={<ProtectedRoute><SOSDemo /></ProtectedRoute>} />
              <Route path="/demo/sos/contacts" element={<ProtectedRoute><SOSContactsDemo /></ProtectedRoute>} />
              <Route path="/demo/medical-map" element={<ProtectedRoute><MedicalMapDemo /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
