import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TrafficLog {
  id: string;
  timestamp: string;
  country: string;
  device: "mobile" | "desktop";
  browser: "in-app" | "regular";
  isBot: boolean;
  decision: "black" | "white";
  userAgent: string;
  clientIp: string;
}

/**
 * Traffic Monitor Component
 * Display real-time traffic logs with filtering and analytics
 */
export default function TrafficMonitor() {
  const [logs, setLogs] = useState<TrafficLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<TrafficLog[]>([]);
  const [filter, setFilter] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Simulate traffic logs (in production, fetch from API)
  const generateMockLog = (): TrafficLog => {
    const countries = ["BR", "US", "UK", "FR", "DE", "JP", "CN", "IN"];
    const devices = ["mobile", "desktop"] as const;
    const browsers = ["in-app", "regular"] as const;
    const userAgents = [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1",
      "Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Instagram 180.0.0.37.120",
      "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/370.0.0.1.111;]",
    ];

    const country = countries[Math.floor(Math.random() * countries.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    const browser = browsers[Math.floor(Math.random() * browsers.length)];
    const isBot = Math.random() > 0.9;
    const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    // Determine routing decision
    let decision: "black" | "white" = "white";
    if (country === "BR" && device === "mobile" && browser === "in-app" && !isBot) {
      decision = "black";
    }

    return {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      country,
      device,
      browser,
      isBot,
      decision,
      userAgent,
      clientIp: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
    };
  };

  // Load logs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("trafficLogs");
    if (saved) {
      const parsed = JSON.parse(saved);
      setLogs(parsed);
      applyFilter(parsed, filter);
    }
  }, []);

  // Auto-refresh logs
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Add new mock log
      const newLog = generateMockLog();
      const updated = [newLog, ...logs].slice(0, 100); // Keep last 100 logs
      setLogs(updated);
      localStorage.setItem("trafficLogs", JSON.stringify(updated));
      applyFilter(updated, filter);
    }, 3000); // Add new log every 3 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, logs, filter]);

  // Apply filter
  const applyFilter = (logsToFilter: TrafficLog[], filterType: string) => {
    let filtered = logsToFilter;

    if (filterType === "black") {
      filtered = logsToFilter.filter(log => log.decision === "black");
    } else if (filterType === "white") {
      filtered = logsToFilter.filter(log => log.decision === "white");
    } else if (filterType === "blocked") {
      filtered = logsToFilter.filter(log => log.isBot);
    } else if (filterType === "br") {
      filtered = logsToFilter.filter(log => log.country === "BR");
    }

    setFilteredLogs(filtered);
  };

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    applyFilter(logs, newFilter);
  };

  // Clear logs
  const handleClearLogs = () => {
    setLogs([]);
    setFilteredLogs([]);
    localStorage.removeItem("trafficLogs");
    toast.success("Logs limpos!");
  };

  // Export logs
  const handleExportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `traffic-logs-${new Date().toISOString()}.json`;
    link.click();
    toast.success("Logs exportados!");
  };

  // Calculate stats
  const stats = {
    total: logs.length,
    black: logs.filter(l => l.decision === "black").length,
    white: logs.filter(l => l.decision === "white").length,
    blocked: logs.filter(l => l.isBot).length,
    brazil: logs.filter(l => l.country === "BR").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 space-y-2 border-border/50">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </Card>
        <Card className="p-4 space-y-2 border-border/50 bg-primary/5">
          <p className="text-xs text-muted-foreground">Black</p>
          <p className="text-2xl font-bold text-primary">{stats.black}</p>
        </Card>
        <Card className="p-4 space-y-2 border-border/50">
          <p className="text-xs text-muted-foreground">White</p>
          <p className="text-2xl font-bold text-foreground">{stats.white}</p>
        </Card>
        <Card className="p-4 space-y-2 border-border/50 bg-destructive/5">
          <p className="text-xs text-muted-foreground">Bloqueados</p>
          <p className="text-2xl font-bold text-destructive">{stats.blocked}</p>
        </Card>
        <Card className="p-4 space-y-2 border-border/50">
          <p className="text-xs text-muted-foreground">Brasil</p>
          <p className="text-2xl font-bold text-foreground">{stats.brazil}</p>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 min-w-0">
          <Select value={filter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Acessos</SelectItem>
              <SelectItem value="black">Apenas Black Page</SelectItem>
              <SelectItem value="white">Apenas White Page</SelectItem>
              <SelectItem value="blocked">Apenas Bloqueados</SelectItem>
              <SelectItem value="br">Apenas Brasil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="gap-2 flex-1 sm:flex-none"
          >
            {autoRefresh ? (
              <>
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Ao Vivo</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                <span className="hidden sm:inline">Pausado</span>
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportLogs}
            className="gap-2 flex-1 sm:flex-none"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearLogs}
            className="gap-2 flex-1 sm:flex-none"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Limpar</span>
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      {filteredLogs.length === 0 ? (
        <Card className="p-12 text-center space-y-4 border-border/50">
          <Eye className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Nenhum tráfego
            </h3>
            <p className="text-sm text-muted-foreground">
              Os logs de tráfego aparecerão aqui
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {filteredLogs.map((log) => (
            <Card
              key={log.id}
              className="p-4 space-y-3 border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() =>
                setShowDetails(showDetails === log.id ? null : log.id)
              }
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Status Icon */}
                  {log.isBot ? (
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">
                        {log.country}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground">
                        {log.device}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground">
                        {log.browser}
                      </span>
                      {log.isBot && (
                        <span className="text-xs px-2 py-1 rounded bg-destructive/10 text-destructive">
                          Bot
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(log.timestamp).toLocaleTimeString("pt-BR")}
                    </p>
                  </div>
                </div>

                {/* Decision Badge */}
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    log.decision === "black"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/50 text-muted-foreground"
                  }`}
                >
                  {log.decision === "black" ? "→ Black" : "→ White"}
                </div>
              </div>

              {/* Details */}
              {showDetails === log.id && (
                <div className="pt-3 border-t border-border/50 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-muted-foreground">IP</p>
                      <p className="text-foreground font-mono">{log.clientIp}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="text-foreground">
                        {log.isBot ? "Bloqueado" : "Permitido"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">User-Agent</p>
                    <p className="text-foreground font-mono break-all">
                      {log.userAgent}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
