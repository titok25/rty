import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, BarChart3, Link as LinkIcon, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import LinkManager from "./LinkManager";
import TrafficMonitor from "./TrafficMonitor";

/**
 * Main Dashboard Page
 * Displays link management, traffic monitoring, and analytics
 */
export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("dashboardToken");
    if (token === "authenticated") {
      setIsAuthenticated(true);
    } else {
      setLocation("/dashboard/login");
    }
    setLoading(false);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("dashboardToken");
    localStorage.removeItem("loginTime");
    setLocation("/dashboard/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
              <p className="text-xs text-muted-foreground">Advanced Cloaker</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs defaultValue="links" className="space-y-6">
          {/* Tabs Navigation */}
          <TabsList className="grid w-full grid-cols-2 lg:w-auto">
            <TabsTrigger value="links" className="gap-2">
              <LinkIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Gerenciar Links</span>
              <span className="sm:hidden">Links</span>
            </TabsTrigger>
            <TabsTrigger value="traffic" className="gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Monitorar Tráfego</span>
              <span className="sm:hidden">Tráfego</span>
            </TabsTrigger>
          </TabsList>

          {/* Links Tab */}
          <TabsContent value="links" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Gerenciador de Links
              </h2>
              <p className="text-muted-foreground">
                Crie, edite e gerencie links personalizados para suas campanhas
              </p>
            </div>
            <LinkManager />
          </TabsContent>

          {/* Traffic Tab */}
          <TabsContent value="traffic" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Monitor de Tráfego
              </h2>
              <p className="text-muted-foreground">
                Visualize acessos em tempo real, bloqueios e redirecionamentos
              </p>
            </div>
            <TrafficMonitor />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-secondary/30 backdrop-blur-sm mt-20">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Advanced Cloaker Dashboard
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground transition-colors">
                Home
              </a>
              <a href="/api/health" className="hover:text-foreground transition-colors">
                API Status
              </a>
              <a href="/api/traffic-info" className="hover:text-foreground transition-colors">
                Traffic Info
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
