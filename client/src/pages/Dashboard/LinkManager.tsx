import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Copy,
  Trash2,
  Edit2,
  Plus,
  ExternalLink,
  Check,
  Link as LinkIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CampaignLink {
  id: string;
  name: string;
  targetPage: "black" | "white" | "custom";
  customUrl?: string;
  createdAt: string;
  clicks: number;
}

/**
 * Link Manager Component
 * Manage infinite campaign links with CRUD operations
 */
export default function LinkManager() {
  const [links, setLinks] = useState<CampaignLink[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    targetPage: "black" as "black" | "white" | "custom",
    customUrl: "",
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load links from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("campaignLinks");
    if (saved) {
      setLinks(JSON.parse(saved));
    }
  }, []);

  // Save links to localStorage
  const saveLinks = (newLinks: CampaignLink[]) => {
    setLinks(newLinks);
    localStorage.setItem("campaignLinks", JSON.stringify(newLinks));
  };

  // Generate unique link ID
  const generateLinkId = () => {
    return Math.random().toString(36).substring(2, 11);
  };

  // Get full campaign URL
  const getCampaignUrl = (link: CampaignLink) => {
    const baseUrl = window.location.origin;
    const linkId = link.id;

    if (link.targetPage === "custom" && link.customUrl) {
      return `${baseUrl}/?campaign=${linkId}`;
    }

    return `${baseUrl}/?campaign=${linkId}`;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Nome da campanha é obrigatório");
      return;
    }

    if (formData.targetPage === "custom" && !formData.customUrl.trim()) {
      toast.error("URL customizada é obrigatória");
      return;
    }

    if (editingId) {
      // Update existing link
      const updated = links.map(link =>
        link.id === editingId
          ? {
              ...link,
              name: formData.name,
              targetPage: formData.targetPage,
              customUrl: formData.customUrl,
            }
          : link
      );
      saveLinks(updated);
      toast.success("Link atualizado com sucesso!");
    } else {
      // Create new link
      const newLink: CampaignLink = {
        id: generateLinkId(),
        name: formData.name,
        targetPage: formData.targetPage,
        customUrl: formData.customUrl,
        createdAt: new Date().toISOString(),
        clicks: 0,
      };
      saveLinks([...links, newLink]);
      toast.success("Link criado com sucesso!");
    }

    // Reset form
    setFormData({ name: "", targetPage: "black", customUrl: "" });
    setEditingId(null);
    setIsOpen(false);
  };

  // Handle edit
  const handleEdit = (link: CampaignLink) => {
    setFormData({
      name: link.name,
      targetPage: link.targetPage,
      customUrl: link.customUrl || "",
    });
    setEditingId(link.id);
    setIsOpen(true);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    const updated = links.filter(link => link.id !== id);
    saveLinks(updated);
    toast.success("Link removido com sucesso!");
  };

  // Handle copy to clipboard
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(url);
    toast.success("Link copiado!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData({ name: "", targetPage: "black", customUrl: "" });
  };

  return (
    <div className="space-y-6">
      {/* Create Link Button */}
      <Dialog open={isOpen} onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          <Button size="lg" className="gap-2">
            <Plus className="w-4 h-4" />
            Criar Novo Link
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Editar Link" : "Criar Novo Link"}
            </DialogTitle>
            <DialogDescription>
              Configure o link da campanha e escolha a página de destino
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campaign Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Nome da Campanha
              </label>
              <Input
                placeholder="Ex: Campanha Verão 2026"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                autoFocus
              />
            </div>

            {/* Target Page */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Página de Destino
              </label>
              <Select
                value={formData.targetPage}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, targetPage: value as "black" | "white" | "custom" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">
                    Página Black (Premium)
                  </SelectItem>
                  <SelectItem value="white">Página White (Geral)</SelectItem>
                  <SelectItem value="custom">URL Customizada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom URL */}
            {(formData.targetPage === "custom") && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  URL Customizada
                </label>
                <Input
                  placeholder="https://seu-dominio.com/pagina"
                  value={formData.customUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, customUrl: e.target.value })
                  }
                />
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              {editingId ? "Atualizar Link" : "Criar Link"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Links List */}
      {links.length === 0 ? (
        <Card className="p-12 text-center space-y-4 border-border/50">
          <LinkIcon className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Nenhum link criado
            </h3>
            <p className="text-sm text-muted-foreground">
              Crie seu primeiro link de campanha para começar
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {links.map((link) => {
            const campaignUrl = getCampaignUrl(link);
            const isUrlCopied = copiedId === campaignUrl;

            return (
              <Card
                key={link.id}
                className="p-6 space-y-4 border-border/50 hover:border-primary/50 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-foreground">
                      {link.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      ID: {link.id} • Criado em{" "}
                      {new Date(link.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {link.clicks} cliques
                  </div>
                </div>

                {/* Link Details */}
                <div className="space-y-2 p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground">
                    Página de Destino
                  </p>
                  <p className="text-sm text-foreground font-mono">
                    {link.targetPage === "custom"
                      ? link.customUrl
                      : `/${link.targetPage}`}
                  </p>
                </div>

                {/* Campaign URL */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Link da Campanha
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-background p-3 rounded border border-border/50 text-foreground overflow-x-auto">
                      {campaignUrl}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(campaignUrl)}
                      className="gap-2"
                    >
                      {isUrlCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(link)}
                    className="gap-2 flex-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(campaignUrl, "_blank")}
                    className="gap-2 flex-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Testar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(link.id)}
                    className="gap-2 flex-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Stats */}
      {links.length > 0 && (
        <Card className="p-6 space-y-4 border-border/50 bg-primary/5">
          <h3 className="font-semibold text-foreground">Estatísticas</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total de Links</p>
              <p className="text-2xl font-bold text-foreground">{links.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total de Cliques</p>
              <p className="text-2xl font-bold text-foreground">
                {links.reduce((sum, link) => sum + link.clicks, 0)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Cliques Médios
              </p>
              <p className="text-2xl font-bold text-foreground">
                {links.length > 0
                  ? Math.round(
                      links.reduce((sum, link) => sum + link.clicks, 0) /
                        links.length
                    )
                  : 0}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
