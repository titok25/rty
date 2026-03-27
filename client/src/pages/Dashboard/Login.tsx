import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

/**
 * Dashboard Login Page
 * Simple authentication with hardcoded credentials for demo
 * In production, integrate with proper authentication system
 */
export default function DashboardLogin() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Demo credentials: password is "admin123"
      if (password === "admin123") {
        // Store token in localStorage
        localStorage.setItem("dashboardToken", "authenticated");
        localStorage.setItem("loginTime", new Date().toISOString());
        setLocation("/dashboard");
      } else {
        setError("Senha incorreta. Tente 'admin123' para demo.");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 border-border/50">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Acesso ao painel de controle do Advanced Cloaker
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Senha de Acesso
            </label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="h-10"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !password}
            className="w-full"
          >
            {loading ? "Entrando..." : "Entrar no Dashboard"}
          </Button>
        </form>

        {/* Demo Info */}
        <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 space-y-2">
          <p className="text-xs font-semibold text-foreground">
            Credenciais de Demo:
          </p>
          <p className="text-xs text-muted-foreground">
            Senha: <code className="bg-background px-2 py-1 rounded">admin123</code>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <a
            href="/"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            ← Voltar para Home
          </a>
        </div>
      </Card>
    </div>
  );
}
