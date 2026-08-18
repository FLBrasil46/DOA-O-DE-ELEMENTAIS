import React, { useState, useEffect } from "react";
// @ts-ignore
import amendoimQueimadoImg from "./assets/images/amendoim_queimado_1783219471924.jpg";
import {
  Flame,
  Droplet,
  Leaf,
  Wind,
  Gift,
  Plus,
  Trash2,
  Volume2,
  VolumeX,
  Sparkles,
  Users,
  Search,
  Award,
  RotateCcw,
  UserPlus,
  AlertTriangle,
  Sliders,
  CheckCircle,
  HelpCircle,
  X,
  Shuffle,
  Zap,
  Crown,
  Skull,
  Star,
  Shield,
  Smile,
  Lock,
  Unlock,
  Trophy,
  Target,
  Bird,
  Bot,
  Medal,
  TrendingUp
} from "lucide-react";
import { AppState, Player } from "./types.ts";

export const BASE_SPRITES = [
  {
    name: "Sprite de Água",
    icon: Droplet,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    emoji: "💧",
    description: "Elemental clássico de água congelante de Fortnite."
  },
  {
    name: "Sprite de Terra",
    icon: Leaf,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    emoji: "🌿",
    description: "Espírito da natureza de madeira e videiras."
  },
  {
    name: "Sprite de Fogo",
    icon: Flame,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    badge: "bg-red-500/20 text-red-300 border-red-500/40",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    emoji: "🔥",
    description: "Chama viva com fúria vulcânica elemental."
  },
  {
    name: "Sprite Peixoto",
    icon: Smile,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    glow: "shadow-[0_0_15px_rgba(34,211,238,0.3)]",
    emoji: "🐟",
    description: "Sprite amigável com a carinha do Peixoto!"
  },
  {
    name: "Sprite Aura",
    icon: Sparkles,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    badge: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    glow: "shadow-[0_0_15px_rgba(236,72,153,0.3)]",
    emoji: "✨",
    description: "Brilho dourado-rosado místico de pura energia aura."
  },
  {
    name: "Sprite Atacante",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    emoji: "⚡",
    description: "Carregado de eletricidade rápida e relâmpagos."
  },
  {
    name: "Sprite do Chefe",
    icon: Shield,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
    emoji: "👑",
    description: "O espírito do chefe supremo com coroa majestosa."
  },
  {
    name: "Sprite Sinistro",
    icon: Skull,
    color: "text-[#a855f7]",
    bg: "bg-[#a855f7]/10",
    border: "border-[#a855f7]/30",
    badge: "bg-[#a855f7]/20 text-purple-300 border-[#a855f7]/40",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    emoji: "💀",
    description: "Espírito das sombras com o toque do Ceifador."
  },
  {
    name: "Sprite Pato",
    icon: Gift,
    color: "text-yellow-300",
    bg: "bg-yellow-300/10",
    border: "border-yellow-300/30",
    badge: "bg-yellow-300/20 text-yellow-200 border-yellow-300/40",
    glow: "shadow-[0_0_15px_rgba(253,224,71,0.3)]",
    emoji: "🦆",
    description: "Estilo patinho estiloso de óculos escuros!"
  },
  {
    name: "Sprite Fantasma",
    icon: Wind,
    color: "text-slate-300",
    bg: "bg-slate-300/10",
    border: "border-slate-300/30",
    badge: "bg-slate-300/20 text-slate-200 border-slate-300/40",
    glow: "shadow-[0_0_15px_rgba(203,213,225,0.3)]",
    emoji: "👻",
    description: "Invisível e flutuante, assustadoramente fofo."
  },
  {
    name: "Sprite Rei",
    icon: Crown,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    badge: "bg-amber-400/20 text-amber-200 border-amber-400/40",
    glow: "shadow-[0_0_15px_rgba(251,191,36,0.3)]",
    emoji: "👑",
    description: "Dourado reluzente com a coroa lendária dos Reis."
  },
  {
    name: "Sprite Demônio",
    icon: Flame,
    color: "text-rose-600",
    bg: "bg-rose-600/10",
    border: "border-rose-600/30",
    badge: "bg-rose-600/20 text-rose-300 border-rose-600/40",
    glow: "shadow-[0_0_15px_rgba(225,29,72,0.3)]",
    emoji: "😈",
    description: "Chifres demoníacos e olhar ardente de fogo sombrio."
  },
  {
    name: "Sprite dos Sonhos",
    icon: Star,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.3)]",
    emoji: "⭐",
    description: "Visual de nebulosa estrelada e sonhos infinitos."
  },
  {
    name: "Sprite Punk",
    icon: Zap,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    badge: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
    glow: "shadow-[0_0_15px_rgba(217,70,239,0.3)]",
    emoji: "🤘",
    description: "Moicano punk estiloso pronto para o rock 'n roll."
  },
  {
    name: "Sprite Amendoim Queimado",
    icon: HelpCircle,
    color: "text-amber-600",
    bg: "bg-amber-700/10",
    border: "border-amber-700/30",
    badge: "bg-amber-700/20 text-amber-300 border-amber-700/40",
    glow: "shadow-[0_0_15px_rgba(180,83,9,0.3)]",
    emoji: "🥜",
    image: amendoimQueimadoImg,
    description: "Amendoim crocante, tostado e de boné!"
  },
  {
    name: "Sprite do Ponto Zero",
    icon: RotateCcw,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.35)]",
    emoji: "🌀",
    description: "A energia lendária do Ponto Zero cósmico."
  },
  {
    name: "Sprite Batman",
    icon: Shield,
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    badge: "bg-slate-500/20 text-slate-300 border-slate-500/40",
    glow: "shadow-[0_0_15px_rgba(100,116,139,0.3)]",
    emoji: "🦇",
    description: "O Cavaleiro das Trevas vigilante em forma de sprite."
  },
  {
    name: "Sprite de Ar",
    icon: Wind,
    color: "text-sky-300",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    badge: "bg-sky-500/20 text-sky-200 border-sky-500/40",
    glow: "shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    emoji: "💨",
    description: "Elemental do vento, leve, ágil e veloz."
  },
  {
    name: "Sprite dos Sete",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-600/10",
    border: "border-blue-600/30",
    badge: "bg-blue-600/20 text-blue-300 border-blue-600/40",
    glow: "shadow-[0_0_15px_rgba(37,99,235,0.3)]",
    emoji: "🌌",
    description: "Representante da misteriosa facção de defensores da Realidade."
  },
  {
    name: "Sprite Vini Jr",
    icon: Trophy,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    badge: "bg-green-500/20 text-green-300 border-green-500/40",
    glow: "shadow-[0_0_15px_rgba(34,197,94,0.35)]",
    emoji: "⚽",
    description: "A estrela do futebol com habilidade e alegria contagiante.",
    noVariants: true
  },
  {
    name: "Sprite John Wick",
    icon: Target,
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/30",
    badge: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
    glow: "shadow-[0_0_15px_rgba(115,115,115,0.3)]",
    emoji: "🕶️",
    description: "O lendário assassino Baba Yaga em versão sprite letal."
  },
  {
    name: "Sprite Pollo",
    icon: Bird,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    emoji: "🐔",
    description: "O divertido e simpático Sprite Pollo em versão penosa."
  },
  {
    name: "Sprite IronMouse",
    icon: Bot,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    badge: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    glow: "shadow-[0_0_15px_rgba(244,114,182,0.35)]",
    emoji: "🐭",
    description: "A carismática IronMouse com visual futurista, fofo e divertido!"
  },
  {
    name: "Sprite Banana",
    icon: Smile,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/30",
    badge: "bg-yellow-400/20 text-yellow-200 border-yellow-400/40",
    glow: "shadow-[0_0_15px_rgba(250,204,21,0.35)]",
    emoji: "🍌",
    description: "O clássico e icônico Sprite Banana, tropical, alegre e energético!"
  },
  {
    name: "Sprite Ilhama",
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.35)]",
    emoji: "🦙",
    description: "A lendária Ilhama de suprimentos repleta de cores e raridades."
  }
];

export const VARIANTS = [
  { name: "(Padrão)", emoji: "" },
  { name: "Variante de Gelatina", emoji: "🍮" },
  { name: "Variante Galáxia", emoji: "🌌" },
  { name: "Variante de Ouro", emoji: "🪙" },
  { name: "Variante de Prata", emoji: "🥈" },
  { name: "Variante Holográfica", emoji: "💿" },
  { name: "Variante Corrompida", emoji: "🥀" },
  { name: "Variante de Diamante", emoji: "💎" },
  { name: "Variante de Arco-Íris", emoji: "🌈" },
  { name: "Variante de Plasma", emoji: "⚡" },
  { name: "Variante Cúbica", emoji: "🧊" },
  { name: "Variante Quack", emoji: "🦆" },
  { name: "Variante Gema", emoji: "💎" }
];

export function getElementalPoints(elemental: string): number {
  if (!elemental) return 1;
  const name = elemental.toLowerCase();
  if (name.includes("gema")) {
    return 6.0;
  }
  if (name.includes("galáxia") || name.includes("galaxia")) {
    return 4;
  }
  if (name.includes("gelatina")) {
    return 3;
  }
  if (name.includes("cúbica") || name.includes("cubica")) {
    return 2.5;
  }
  if (name.includes("ouro")) {
    return 2;
  }
  if (name.includes("quack")) {
    return 1.5;
  }
  if (name.includes("hologr")) {
    return 1.5;
  }
  if (name.includes("ironmouse") || name.includes("iron mouse")) {
    return 1.0;
  }
  if (name.includes("banana")) {
    return 1.0;
  }
  return 1;
}

export const ELEMENT_STYLES: Record<string, {
  icon: any;
  color: string;
  bg: string;
  border: string;
  badge: string;
  glow: string;
  emoji: string;
  description: string;
  image?: string;
}> = {};

BASE_SPRITES.forEach(base => {
  VARIANTS.forEach(variant => {
    // If base has no variants, only process the (Padrão) one
    if ((base as any).noVariants && variant.name !== "(Padrão)") {
      return;
    }

    const fullName = variant.name === "(Padrão)" 
      ? `${base.name} (Padrão)` 
      : `${base.name} - ${variant.name}`;
      
    let glow = base.glow;
    let badge = base.badge;
    let border = base.border;
    let color = base.color;
    let bg = base.bg;
    
    if (variant.name !== "(Padrão)") {
      if (variant.name === "Variante de Gelatina") {
        color = "text-green-400";
        bg = "bg-green-500/10";
        border = "border-green-500/30";
        badge = "bg-green-500/20 text-green-300 border-green-500/40";
        glow = "shadow-[0_0_15px_rgba(34,197,94,0.4)]";
      } else if (variant.name === "Variante Galáxia") {
        color = "text-purple-400";
        bg = "bg-purple-500/10";
        border = "border-purple-500/30";
        badge = "bg-purple-500/20 text-purple-300 border-purple-500/40";
        glow = "shadow-[0_0_15px_rgba(168,85,247,0.4)]";
      } else if (variant.name === "Variante de Ouro") {
        color = "text-yellow-400";
        bg = "bg-yellow-500/10";
        border = "border-yellow-500/30";
        badge = "bg-yellow-500/20 text-yellow-300 border-yellow-500/40";
        glow = "shadow-[0_0_15px_rgba(234,179,8,0.4)]";
      } else if (variant.name === "Variante de Prata") {
        color = "text-slate-300";
        bg = "bg-slate-300/10";
        border = "border-slate-300/30";
        badge = "bg-slate-300/20 text-slate-200 border-slate-300/40";
        glow = "shadow-[0_0_15px_rgba(148,163,184,0.4)]";
      } else if (variant.name === "Variante Holográfica") {
        color = "text-cyan-400";
        bg = "bg-cyan-500/10";
        border = "border-cyan-500/30";
        badge = "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
        glow = "shadow-[0_0_15px_rgba(6,182,212,0.4)]";
      } else if (variant.name === "Variante Corrompida") {
        color = "text-red-500";
        bg = "bg-red-500/10";
        border = "border-red-500/30";
        badge = "bg-red-500/20 text-red-400 border-red-500/40";
        glow = "shadow-[0_0_15px_rgba(239,68,68,0.4)]";
      } else if (variant.name === "Variante de Diamante") {
        color = "text-sky-300";
        bg = "bg-sky-500/10";
        border = "border-sky-500/30";
        badge = "bg-sky-500/20 text-sky-200 border-sky-500/40";
        glow = "shadow-[0_0_15px_rgba(14,165,233,0.4)]";
      } else if (variant.name === "Variante de Arco-Íris") {
        color = "text-pink-400";
        bg = "bg-pink-500/10";
        border = "border-pink-500/30";
        badge = "bg-pink-500/20 text-pink-300 border-pink-500/40";
        glow = "shadow-[0_0_15px_rgba(236,72,153,0.4)]";
      } else if (variant.name === "Variante de Plasma") {
        color = "text-orange-400";
        bg = "bg-orange-500/10";
        border = "border-orange-500/30";
        badge = "bg-orange-500/20 text-orange-300 border-orange-500/40";
        glow = "shadow-[0_0_15px_rgba(249,115,22,0.4)]";
      } else if (variant.name === "Variante Cúbica") {
        color = "text-fuchsia-500";
        bg = "bg-fuchsia-500/10";
        border = "border-fuchsia-500/30";
        badge = "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40";
        glow = "shadow-[0_0_15px_rgba(217,70,239,0.4)]";
      } else if (variant.name === "Variante Quack") {
        color = "text-amber-300";
        bg = "bg-amber-300/10";
        border = "border-amber-300/30";
        badge = "bg-amber-300/20 text-amber-200 border-amber-300/40";
        glow = "shadow-[0_0_15px_rgba(252,211,77,0.4)]";
      } else if (variant.name === "Variante Gema") {
        color = "text-emerald-400";
        bg = "bg-emerald-500/10";
        border = "border-emerald-500/30";
        badge = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
        glow = "shadow-[0_0_15px_rgba(52,211,153,0.4)]";
      }
    }

    const emojiStr = variant.emoji ? `${base.emoji} ${variant.emoji}` : base.emoji;
    const descStr = variant.name === "(Padrão)"
      ? `${base.description}`
      : `${base.description} Edição especial na ${variant.name}.`;

    ELEMENT_STYLES[fullName] = {
      icon: base.icon,
      color,
      bg,
      border,
      badge,
      glow,
      emoji: emojiStr,
      description: descStr,
      image: (base as any).image
    };
  });
});

export default function App() {
  // Real-time server state
  const [state, setState] = useState<AppState>({
    fila: [],
    ranking_doadores: {},
    vagas_squad: 2,
    squad_membros: [],
    doacoes: []
  });

  // Client states
  const [playerName, setPlayerName] = useState("");
  const [playerDoador, setPlayerDoador] = useState("");
  const [elementalNeed, setElementalNeed] = useState<string>("Sprite de Água (Padrão)");
  const [selectedBaseSprite, setSelectedBaseSprite] = useState("Sprite de Água");
  const [selectedVariant, setSelectedVariant] = useState("(Padrão)");
  const [searchQuery, setSearchQuery] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");
  const [activeTab, setActiveTab] = useState<"fila" | "enciclopedia">("fila");
  const [selectedVariantFilter, setSelectedVariantFilter] = useState("Todas");
  const [isAdmin, setIsAdmin] = useState(() => window.location.pathname === "/admin");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => localStorage.getItem("admin_auth") === "true");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === "CGNICKDGP2026") {
      localStorage.setItem("admin_auth", "true");
      setIsAdminAuthenticated(true);
      setPasswordError("");
      playSynthSound("click");
    } else {
      setPasswordError("Senha incorreta. Tente novamente.");
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAdminAuthenticated(false);
    navigateTo("/");
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsAdmin(window.location.pathname === "/admin");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState(null, "", path);
    setIsAdmin(path === "/admin");
    playSynthSound("click");
  };

  // Keep in sync
  useEffect(() => {
    const combined = selectedVariant === "(Padrão)"
      ? `${selectedBaseSprite} (Padrão)`
      : `${selectedBaseSprite} - ${selectedVariant}`;
    setElementalNeed(combined);
  }, [selectedBaseSprite, selectedVariant]);

  const selectElemental = (fullName: string) => {
    if (fullName.includes(" - ")) {
      const parts = fullName.split(" - ");
      const base = parts[0].trim();
      const variant = parts.slice(1).join(" - ").trim();
      setSelectedBaseSprite(base);
      setSelectedVariant(variant);
    } else if (fullName.endsWith(" (Padrão)")) {
      const base = fullName.replace(" (Padrão)", "");
      setSelectedBaseSprite(base.trim());
      setSelectedVariant("(Padrão)");
    } else {
      setSelectedBaseSprite(fullName);
      setSelectedVariant("(Padrão)");
    }
    setElementalNeed(fullName);
  };
  
  // Cycle and Live states
  const [selectedCicloId, setSelectedCicloId] = useState<string>("ciclo2");
  const [selectedLiveFilter, setSelectedLiveFilter] = useState<number>(0);
  const [rankingGeralScope, setRankingGeralScope] = useState<"ciclo2" | "todos">("ciclo2");

  // Modal / Admin States
  const [showConfirmResetQueue, setShowConfirmResetQueue] = useState(false);
  const [showConfirmResetRanking, setShowConfirmResetRanking] = useState(false);
  const [showConfirmResetHistory, setShowConfirmResetHistory] = useState(false);
  const [showConfirmClearLive, setShowConfirmClearLive] = useState<{ cicloId: string; live: number } | null>(null);
  const [editPlayerScore, setEditPlayerScore] = useState<{ name: string; count: string; cicloId?: string } | null>(null);
  const [deleteDonorName, setDeleteDonorName] = useState<{ name: string; cicloId: string; live?: number } | null>(null);

  // Donation Modal State
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateForm, setDonateForm] = useState({
    doador: "",
    elemental: "Sprite de Água (Padrão)",
    receptor: "Geral",
    removerFila: true,
    filaId: "",
    live: 1,
    cicloId: "ciclo2",
  });

  const getCicloDonorStats = (cicloId: string) => {
    const allDoacoes = state.doacoes || [];

    if (cicloId === "ciclo1") {
      // Ciclo 1 is the authoritative archived cycle matching state.ranking_doadores exactly
      const statsMap: Record<string, {
        name: string;
        livePoints: Record<number, number>;
        liveCounts: Record<number, number>;
        totalPoints: number;
        livesParticipated: number;
      }> = {};

      // 1. Add all official scores from state.ranking_doadores (guarantees zero divergence)
      Object.entries(state.ranking_doadores || {}).forEach(([name, countVal]) => {
        const count = Number(countVal) || 0;
        statsMap[name] = {
          name,
          livePoints: { 1: count, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
          liveCounts: { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
          totalPoints: count,
          livesParticipated: count > 0 ? 1 : 0,
        };
      });

      // 2. Add any explicit ciclo1 doacoes if donor wasn't in ranking
      const ciclo1Doacoes = allDoacoes.filter((d) => d.cicloId === "ciclo1");
      ciclo1Doacoes.forEach((d) => {
        const donorName = d.doador.trim();
        if (!donorName) return;
        if (!statsMap[donorName]) {
          const pts = getElementalPoints(d.elemental);
          statsMap[donorName] = {
            name: donorName,
            livePoints: { 1: pts, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
            liveCounts: { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
            totalPoints: pts,
            livesParticipated: 1,
          };
        }
      });

      const result = Object.values(statsMap);
      result.sort((a, b) => b.totalPoints - a.totalPoints);

      let grandTotal = 0;
      result.forEach((item) => {
        grandTotal += item.totalPoints;
      });

      const liveTotals: Record<number, number> & { grandTotal: number } = {
        1: grandTotal, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, grandTotal
      };

      return { donors: result, liveTotals };
    }

    // Ciclo 2 and beyond: 10 Lives (strictly ciclo2 donations)
    const cicloDoacoes = allDoacoes.filter((d) => (d.cicloId || "ciclo2") === cicloId);

    const statsMap: Record<string, {
      name: string;
      livePoints: Record<number, number>;
      liveCounts: Record<number, number>;
      totalPoints: number;
      livesParticipated: number;
    }> = {};

    cicloDoacoes.forEach((d) => {
      const donorName = d.doador.trim();
      if (!donorName) return;

      if (!statsMap[donorName]) {
        statsMap[donorName] = {
          name: donorName,
          livePoints: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
          liveCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
          totalPoints: 0,
          livesParticipated: 0,
        };
      }

      const liveNum = Math.min(Math.max(d.live || 1, 1), 10);
      const pts = getElementalPoints(d.elemental);

      statsMap[donorName].livePoints[liveNum] = (statsMap[donorName].livePoints[liveNum] || 0) + pts;
      statsMap[donorName].liveCounts[liveNum] = (statsMap[donorName].liveCounts[liveNum] || 0) + 1;
    });

    const result = Object.values(statsMap).map((item) => {
      let totalPts = 0;
      let liveCount = 0;
      for (let l = 1; l <= 10; l++) {
        const p = item.livePoints[l] || 0;
        totalPts += p;
        if (p > 0 || item.liveCounts[l] > 0) {
          liveCount++;
        }
      }
      return {
        ...item,
        totalPoints: totalPts,
        livesParticipated: liveCount,
      };
    });

    result.sort((a, b) => b.totalPoints - a.totalPoints || b.livesParticipated - a.livesParticipated);

    const liveTotals: Record<number, number> & { grandTotal: number } = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, grandTotal: 0
    };
    result.forEach((item) => {
      for (let l = 1; l <= 10; l++) {
        liveTotals[l] += item.livePoints[l] || 0;
      }
      liveTotals.grandTotal += item.totalPoints;
    });

    return { donors: result, liveTotals };
  };

  const getRankingGeralData = (scope: "ciclo2" | "todos") => {
    const allDoacoes = state.doacoes || [];
    const statsMap: Record<string, {
      name: string;
      totalPoints: number;
      totalDoacoes: number;
      livesList: number[];
      ciclos: Set<string>;
    }> = {};

    if (scope === "todos") {
      // 1. Add Ciclo 1 official rankings (state.ranking_doadores)
      Object.entries(state.ranking_doadores || {}).forEach(([name, countVal]) => {
        const count = Number(countVal) || 0;
        if (!statsMap[name]) {
          statsMap[name] = {
            name,
            totalPoints: 0,
            totalDoacoes: 0,
            livesList: [],
            ciclos: new Set(["ciclo1"])
          };
        }
        statsMap[name].totalPoints += count;
        statsMap[name].totalDoacoes += count > 0 ? 1 : 0;
        if (count > 0 && !statsMap[name].livesList.includes(1)) {
          statsMap[name].livesList.push(1);
        }
      });

      // 2. Add all doacoes across all cycles
      allDoacoes.forEach((d) => {
        const donorName = d.doador.trim();
        if (!donorName) return;
        const pts = getElementalPoints(d.elemental);
        const ciclo = d.cicloId || "ciclo2";
        const liveNum = Math.min(Math.max(d.live || 1, 1), 10);

        // Avoid double counting if already in state.ranking_doadores for ciclo1
        if (ciclo === "ciclo1" && state.ranking_doadores && state.ranking_doadores[donorName] !== undefined) {
          return;
        }

        if (!statsMap[donorName]) {
          statsMap[donorName] = {
            name: donorName,
            totalPoints: 0,
            totalDoacoes: 0,
            livesList: [],
            ciclos: new Set()
          };
        }

        statsMap[donorName].totalPoints += pts;
        statsMap[donorName].totalDoacoes += 1;
        statsMap[donorName].ciclos.add(ciclo);
        if (!statsMap[donorName].livesList.includes(liveNum)) {
          statsMap[donorName].livesList.push(liveNum);
        }
      });
    } else {
      // Ciclo 2 strictly (Todas as 10 Lives do Ciclo 2)
      const ciclo2Doacoes = allDoacoes.filter((d) => (d.cicloId || "ciclo2") === "ciclo2");
      ciclo2Doacoes.forEach((d) => {
        const donorName = d.doador.trim();
        if (!donorName) return;
        const pts = getElementalPoints(d.elemental);
        const liveNum = Math.min(Math.max(d.live || 1, 1), 10);

        if (!statsMap[donorName]) {
          statsMap[donorName] = {
            name: donorName,
            totalPoints: 0,
            totalDoacoes: 0,
            livesList: [],
            ciclos: new Set(["ciclo2"])
          };
        }

        statsMap[donorName].totalPoints += pts;
        statsMap[donorName].totalDoacoes += 1;
        if (!statsMap[donorName].livesList.includes(liveNum)) {
          statsMap[donorName].livesList.push(liveNum);
        }
      });
    }

    const donors = Object.values(statsMap).map((d) => ({
      ...d,
      livesCount: d.livesList.length || (d.totalPoints > 0 ? 1 : 0),
    }));

    donors.sort((a, b) => b.totalPoints - a.totalPoints || b.totalDoacoes - a.totalDoacoes);

    const grandTotal = donors.reduce((sum, d) => sum + d.totalPoints, 0);
    const maxPoints = donors.length > 0 ? Math.max(...donors.map(d => d.totalPoints), 1) : 1;
    const topDonor = donors.length > 0 && donors[0].totalPoints > 0 ? donors[0] : null;

    return { donors, grandTotal, maxPoints, topDonor };
  };

  const openDonateModal = (
    receptorName: string = "",
    preferredElemental: string = "",
    doadorName: string = "",
    filaId: string = "",
    liveNumber: number = selectedLiveFilter || 1
  ) => {
    setDonateForm({
      doador: doadorName || "",
      elemental: preferredElemental || "Sprite de Água (Padrão)",
      receptor: receptorName || "Geral",
      removerFila: receptorName ? true : false,
      filaId: filaId || "",
      live: liveNumber || 1,
      cicloId: selectedCicloId || "ciclo2",
    });
    setShowDonateModal(true);
    playSynthSound("click");
  };

  const openDonateModalWithDonor = (donorName: string) => {
    setDonateForm({
      doador: donorName,
      elemental: "Sprite de Água (Padrão)",
      receptor: "Geral",
      removerFila: false,
      filaId: "",
      live: selectedLiveFilter || 1,
      cicloId: selectedCicloId || "ciclo2",
    });
    setShowDonateModal(true);
    playSynthSound("click");
  };

  // Audio synthesis helper for cool retro game sounds!
  const playSynthSound = (type: "add" | "call" | "donate" | "click") => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "add") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === "call") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "donate") {
        osc.type = "square";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      // ignore blocked audio
    }
  };

  // Connect to the backend with robust HTTP Polling falling back from SSE
  useEffect(() => {
    let intervalId: any;
    
    const fetchState = async () => {
      try {
        const res = await fetch("/api/state");
        if (res.ok) {
          const data = await res.json();
          setState(data);
          setConnectionStatus("connected");
        } else {
          setConnectionStatus("disconnected");
        }
      } catch (err) {
        setConnectionStatus("disconnected");
        console.error("Error connecting to server:", err);
      }
    };

    fetchState();
    // Poll state every 2 seconds to make sure updates are instant and robust
    intervalId = setInterval(fetchState, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Handle player insertion
  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/fila/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_name: playerName, precisa_de: elementalNeed, doador: playerDoador })
      });
      if (res.ok) {
        setPlayerName("");
        setPlayerDoador("");
        playSynthSound("add");
        // Reload state instantly
        const updatedRes = await fetch("/api/state");
        if (updatedRes.ok) setState(await updatedRes.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle remove
  const handleRemovePlayer = async (id: string) => {
    playSynthSound("click");
    try {
      await fetch("/api/fila/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  // Handle call/toggle squad status
  const handleCallPlayer = async (id: string) => {
    playSynthSound("call");
    try {
      await fetch("/api/fila/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  // Record donation (opens modal with donor populated)
  const handleDonate = async (nameToDonate: string) => {
    openDonateModalWithDonor(nameToDonate);
  };

  const handleAddDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateForm.doador.trim() || !donateForm.elemental.trim() || !donateForm.receptor.trim()) return;

    setLoading(true);
    playSynthSound("donate");
    try {
      const res = await fetch("/api/doacoes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doador: donateForm.doador.trim(),
          elemental: donateForm.elemental.trim(),
          receptor: donateForm.receptor.trim(),
          removerFila: donateForm.removerFila,
          filaId: donateForm.filaId,
          live: donateForm.live || 1,
          cicloId: donateForm.cicloId || "ciclo2"
        })
      });
      if (res.ok) {
        setShowDonateModal(false);
        const updatedRes = await fetch("/api/state");
        if (updatedRes.ok) setState(await updatedRes.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDonation = async (id: string) => {
    playSynthSound("click");
    try {
      await fetch("/api/doacoes/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  // Edit custom ranking count
  const handleSetDonorCount = async (name: string, count: number, cicloId?: string) => {
    try {
      await fetch("/api/ranking/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_name: name, count, cicloId })
      });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
      setEditPlayerScore(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete donor from ranking & donations
  const handleDeleteDonor = async (name: string, cicloId?: string, live?: number) => {
    playSynthSound("click");
    try {
      await fetch("/api/ranking/delete-donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player_name: name, cicloId, live })
      });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
      setDeleteDonorName(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Change squad slots settings
  const handleSetSquadSlots = async (slots: number) => {
    playSynthSound("click");
    try {
      await fetch("/api/squad/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vagas_squad: slots })
      });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  // Clean queue
  const handleClearQueue = async () => {
    playSynthSound("click");
    try {
      await fetch("/api/fila/clear", { method: "POST" });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
      setShowConfirmResetQueue(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Reset donors ranking
  const handleResetRanking = async () => {
    playSynthSound("click");
    try {
      await fetch("/api/ranking/reset", { method: "POST" });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
      setShowConfirmResetRanking(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Clear donation history
  const handleClearHistory = async () => {
    playSynthSound("click");
    try {
      await fetch("/api/doacoes/clear", { method: "POST" });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
      setShowConfirmResetHistory(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Clear specific ciclo / live donations
  const handleClearCiclo = async (cicloId: string, live?: number) => {
    playSynthSound("click");
    try {
      await fetch("/api/doacoes/clear-ciclo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cicloId, live }),
      });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  // Reset database to default mock
  const handleResetToMock = async () => {
    playSynthSound("click");
    try {
      await fetch("/api/db/reset", { method: "POST" });
      const updatedRes = await fetch("/api/state");
      if (updatedRes.ok) setState(await updatedRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  // Sort queue by entry
  const sortedQueue = [...state.fila].sort((a, b) => a.timestamp - b.timestamp);

  // Filter list with query
  const filteredQueue = sortedQueue.filter((p) =>
    p.player_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.precisa_de.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSquadMembros = state.squad_membros || [];

  // Sort ranking (descending score)
  const sortedRanking = Object.entries(state.ranking_doadores)
    .map(([name, count]) => ({ name, count: count as number }))
    .sort((a, b) => b.count - a.count);

  if (isAdmin && !isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070709] text-[#c5c6c7] font-sans antialiased flex flex-col justify-center items-center p-4 selection:bg-cyan-500/35 selection:text-cyan-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06),transparent)] pointer-events-none" />
        
        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl relative z-10 backdrop-blur-md">
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-4">
              <Lock className="w-10 h-10 text-cyan-400 animate-pulse" />
            </div>
            <h1 className="text-xl font-display font-bold text-white mb-1">Painel Administrativo</h1>
            <p className="text-xs text-slate-400">Insira a senha de moderador para liberar os controles</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Senha de Acesso
              </label>
              <input
                type="password"
                required
                value={adminPasswordInput}
                onChange={(e) => {
                  setAdminPasswordInput(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Insira a senha de acesso"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all text-center font-mono tracking-widest"
                autoFocus
              />
              {passwordError && (
                <p className="text-[11px] text-rose-400 mt-1.5 text-center font-mono">
                  ❌ {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/15 active:scale-[0.98] transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              <Unlock className="w-4 h-4" />
              <span>Entrar como Admin</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-center">
            <button
              onClick={() => navigateTo("/")}
              className="text-xs text-slate-400 hover:text-white transition-all flex items-center gap-1.5 uppercase font-mono cursor-pointer"
            >
              👁️ Voltar para Modo Usuário
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-[#c5c6c7] font-sans antialiased flex flex-col selection:bg-cyan-500/35 selection:text-cyan-200">
      
      {/* Header Banner */}
      <header className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-[#0e0f13] to-slate-950 border-b border-cyan-500/20 px-4 py-5 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.08),transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10">
          
          {/* Logo Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white flex items-center gap-2">
                Fila <span className="text-cyan-400 font-extrabold uppercase">Fortnite Elementais</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/20 text-[#00dfa2] border border-[#00dfa2]/30 animate-pulse">
                  ONLINE 🟢
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                <span>Moderação Fixa na Squad:</span>
                <strong className="text-white bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono">DAVIGP</strong>
                <span>|</span>
                <strong className="text-white bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono">NICKOLBOY</strong>
                <span className="text-[#00dfa2] font-semibold font-mono ml-2">• CAMPINA GAMER</span>
              </p>
            </div>
          </div>

          {/* Connection & General Actions */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Status indicators */}
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${
                connectionStatus === "connected" ? "bg-[#00dfa2] shadow-[0_0_8px_rgba(0,223,162,0.6)] animate-pulse" : "bg-red-500 animate-pulse"
              }`} />
              <span className="text-slate-300">
                {connectionStatus === "connected" ? "Servidor Conectado" : "Reconectando..."}
              </span>
            </div>

            {/* Sound Switch */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSynthSound("click");
              }}
              className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all flex items-center justify-center"
              title={soundEnabled ? "Desativar áudio" : "Ativar áudio"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00dfa2]" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
            </button>

            {/* Tabs Selector */}
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => {
                  setActiveTab("fila");
                  playSynthSound("click");
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  activeTab === "fila" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Painel da Live
              </button>
              <button
                onClick={() => {
                  setActiveTab("enciclopedia");
                  playSynthSound("click");
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  activeTab === "enciclopedia" ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                Os 16 Elementais 📖
              </button>
            </div>

            {/* Quick view switcher */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => navigateTo("/")}
                  className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 font-bold text-xs rounded-lg border border-cyan-500/30 transition-all flex items-center gap-1.5 cursor-pointer font-mono"
                  title="Ver a tela pública dos espectadores"
                >
                  <span>Modo Usuário 👁️</span>
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 hover:text-slate-950 text-rose-400 font-bold text-xs rounded-lg border border-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer font-mono"
                  title="Sair do painel administrativo"
                >
                  <span>Sair Admin 🚪</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo("/admin")}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-xs text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer font-mono"
                title="Acessar painel administrativo/moderador"
              >
                <span>Acesso Admin ⚙️</span>
              </button>
            )}

            {/* Quick reset demo - Admin only */}
            {isAdmin && (
              <button
                onClick={handleResetToMock}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-xs text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-all flex items-center gap-1.5"
                title="Gerar nicks fictícios para testar a fila"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetar Mock</span>
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Main Container */}
      {activeTab === "fila" ? (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT PANEL - Input, Squad Configuration, Fast Setup */}
          <section className="lg:col-span-4 flex flex-col gap-6">
            
            {/* LIVE SQUAD SUMMARY */}
            <div className="bg-slate-950/75 rounded-2xl border border-slate-800/80 p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Users className="w-32 h-32 text-cyan-400" />
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h2 className="font-display font-bold text-white text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Squad ao Vivo</span>
                </h2>
                
                {/* Squad size slot selector */}
                {isAdmin ? (
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <span className="text-[10px] uppercase font-mono text-slate-500 px-1">Vagas:</span>
                    {[1, 2, 3].map((slots) => (
                      <button
                        key={slots}
                        onClick={() => handleSetSquadSlots(slots)}
                        className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
                          state.vagas_squad === slots ? "bg-[#00dfa2] text-slate-950" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {slots}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] uppercase font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded font-bold tracking-wider">
                    {state.vagas_squad} {state.vagas_squad === 1 ? "Vaga" : "Vagas"}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                
                {/* Fixed Live Hosts */}
                <div className="p-3 bg-slate-900/40 rounded-xl border border-dashed border-slate-800 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyan-400 font-bold uppercase tracking-wide flex items-center gap-1">
                      👑 Moderadores na Squad
                    </span>
                    <span className="text-slate-500 font-bold">Fixos</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="px-2 py-1 bg-[#00dfa2]/5 text-[#00dfa2] text-xs font-mono rounded-lg border border-[#00dfa2]/15 font-bold text-center tracking-wider">
                      🎮 DAVIGP
                    </span>
                    <span className="px-2 py-1 bg-[#00dfa2]/5 text-[#00dfa2] text-xs font-mono rounded-lg border border-[#00dfa2]/15 font-bold text-center tracking-wider">
                      🎮 NICKOLBOY
                    </span>
                  </div>
                </div>

                {/* Queue players inside Squad */}
                <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-blue-400 font-bold uppercase">
                      Inscritos na Squad ({currentSquadMembros.length}/{state.vagas_squad})
                    </span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 px-1.5 py-0.2 rounded font-mono">
                      {state.vagas_squad - currentSquadMembros.length} Vagas Livres
                    </span>
                  </div>

                  {currentSquadMembros.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-3 text-center">
                      Nenhum inscrito na squad ativa. Clique em "Chamar Squad" na fila ao lado para puxar alguém!
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {currentSquadMembros.map((name, idx) => (
                        <div
                          key={name}
                          className="flex items-center justify-between bg-slate-950/90 px-3 py-2 rounded-lg border border-slate-800/80 hover:border-slate-700 transition-all"
                        >
                          <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                            <span className="text-cyan-400">#{idx + 1}</span>
                            {name}
                          </span>
                          
                          {isAdmin && (
                            <button
                              onClick={() => {
                                const playerInFila = state.fila.find((p) => p.player_name === name);
                                openDonateModal(name, playerInFila?.precisa_de || "", playerInFila?.doador || "", playerInFila?.id || "");
                              }}
                              className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-[9px] rounded border border-amber-500/20 hover:border-amber-500 transition-all uppercase font-mono flex items-center gap-0.5"
                              title="Especificar doação recebida"
                            >
                              <Award className="w-3 h-3" />
                              Contar Doação
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* ADD TO WAITLIST BOX */}
            {isAdmin ? (
              <div className="bg-slate-950/75 rounded-2xl border border-slate-800/80 p-5 shadow-xl relative backdrop-blur-md">
                <h2 className="font-display font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                  <UserPlus className="w-4 h-4 text-[#00dfa2]" />
                  <span>Adicionar à Fila</span>
                </h2>

                <form onSubmit={handleAddPlayer} className="space-y-4">
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Nick Epic / Chat da Live
                      </label>
                      <input
                        type="text"
                        required
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Ex: DAVIGP_MITO"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Doador (Opcional)
                      </label>
                      <input
                        type="text"
                        value={playerDoador}
                        onChange={(e) => setPlayerDoador(e.target.value)}
                        placeholder="Ex: VitorElements"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Selecione o Elemental de Desejo ({BASE_SPRITES.length} Sprites & {VARIANTS.length - 1} Variantes)
                    </label>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[9px] font-mono text-slate-500 mb-1">1. Sprite Base</span>
                        <select
                          value={selectedBaseSprite}
                          onChange={(e) => {
                            setSelectedBaseSprite(e.target.value);
                            playSynthSound("click");
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all font-mono"
                        >
                          {BASE_SPRITES.map((base) => (
                            <option key={base.name} value={base.name}>
                              {base.emoji} {base.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <span className="block text-[9px] font-mono text-slate-500 mb-1">2. Variante / Estilo</span>
                        <select
                          value={selectedVariant}
                          onChange={(e) => {
                            setSelectedVariant(e.target.value);
                            playSynthSound("click");
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-all font-mono"
                        >
                          {VARIANTS.map((v) => (
                            <option key={v.name} value={v.name}>
                              {v.emoji || "✨"} {v.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Highlight current selection details */}
                    {ELEMENT_STYLES[elementalNeed] && (
                      <div className={`p-3 bg-slate-900/60 rounded-xl border ${ELEMENT_STYLES[elementalNeed].border} flex items-start gap-2.5 transition-all mt-2`}>
                        <span className={`p-1.5 rounded-lg ${ELEMENT_STYLES[elementalNeed].bg} mt-0.5 flex items-center justify-center w-7 h-7 overflow-hidden`}>
                          {ELEMENT_STYLES[elementalNeed].image ? (
                            <img
                              src={ELEMENT_STYLES[elementalNeed].image}
                              alt={elementalNeed}
                              className="w-4 h-4 rounded-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            React.createElement(ELEMENT_STYLES[elementalNeed].icon, {
                              className: `w-4 h-4 ${ELEMENT_STYLES[elementalNeed].color}`
                            })
                          )}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            {elementalNeed} {ELEMENT_STYLES[elementalNeed].emoji}
                          </span>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                            {ELEMENT_STYLES[elementalNeed].description}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00dfa2] hover:bg-[#00c58e] disabled:opacity-50 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/15 active:scale-[0.98] transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Inserir na Fila</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-slate-950 to-[#0e0f13] rounded-2xl border border-cyan-500/25 p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none">
                  <Sparkles className="w-24 h-24 text-cyan-400" />
                </div>
                <h2 className="font-display font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Como Participar? 🎮</span>
                </h2>
                <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                  <p>
                    Bem-vindo à live de entrega dos <strong>Fortnite Elementais</strong>! Acompanhe a fila em tempo real nesta página e prepare-se para entrar na squad.
                  </p>
                  <div className="p-3.5 bg-cyan-500/5 rounded-xl border border-cyan-500/10 space-y-2.5">
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold">1.</span>
                      <p><strong>Entrar na Fila:</strong> Envie o seu Nick Epic no chat da live ou solicite aos moderadores.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold">2.</span>
                      <p><strong>Aguarde seu Chamado:</strong> Acompanhe a fila ao lado. Quando seu nick for chamado, você será convidado para o Squad!</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold">3.</span>
                      <p><strong>Doador Vip:</strong> Doadores acumulam pontos no ranking ao vivo e têm prioridade e destaque garantidos!</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Atualizações em tempo real via Firestore</span>
                    <span className="animate-pulse text-[#00dfa2] font-bold">● ONLINE</span>
                  </div>
                </div>
              </div>
            )}

            {/* QUICK ACTIONS CONTROLS - Admin only */}
            {isAdmin && (
              <div className="bg-slate-950/40 rounded-xl border border-slate-800/40 p-4 shadow-sm flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  Zerar Controles de Live
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowConfirmResetQueue(true)}
                    className="p-2.5 bg-red-950/15 hover:bg-red-950/30 text-red-400 border border-red-900/20 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Limpar Fila
                  </button>
                  <button
                    onClick={() => setShowConfirmResetRanking(true)}
                    className="p-2.5 bg-amber-950/15 hover:bg-amber-950/30 text-amber-400 border border-amber-900/20 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Ranking
                  </button>
                </div>
              </div>
            )}

          </section>

          {/* RIGHT COLUMN - Waiting List & Donor Leaderboard with custom Prize Wheel */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            
            {/* LIVE WAITING LIST */}
            <div className="bg-slate-950/75 rounded-2xl border border-slate-800/80 p-5 shadow-xl relative flex-1 flex flex-col backdrop-blur-md">
              
              {/* Header section with filter search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                <div>
                  <h2 className="font-display font-bold text-white text-base flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    <span>Fila de Espera Elemental ({state.fila.length})</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Inscritos ordenados por ordem de chegada para garantir a vez de todos.
                  </p>
                </div>

                {/* Filter / Search input */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar inscrito ou elemental..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-mono"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Fila elements list */}
              <div className="flex-1 overflow-y-auto max-h-[460px] space-y-2 pr-1">
                {filteredQueue.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Search className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-xs text-slate-500 italic">
                      {searchQuery ? "Nenhum resultado correspondente." : "Nenhum jogador na fila de espera."}
                    </p>
                  </div>
                ) : (
                  filteredQueue.map((player, idx) => {
                    const style = ELEMENT_STYLES[player.precisa_de] || {
                      icon: Gift,
                      color: "text-amber-500",
                      bg: "bg-amber-500/10",
                      border: "border-amber-500/30",
                      badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
                      glow: "",
                      emoji: "🎁",
                      description: ""
                    };
                    const IconComp = style.icon;
                    const isCalled = player.status === "called";

                    return (
                      <div
                        key={player.id}
                        className={`p-3 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
                          isCalled
                            ? "bg-cyan-500/5 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
                            : "bg-slate-950/80 border-slate-900/80 hover:border-slate-800"
                        }`}
                      >
                        
                        {/* Player details */}
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center border ${
                            isCalled 
                              ? "bg-cyan-500 text-slate-950 border-cyan-400" 
                              : "bg-slate-900 text-slate-400 border-slate-800"
                          }`}>
                            {idx + 1}º
                          </div>

                          <div>
                            <span className="font-mono text-xs font-bold text-white block">
                              {player.player_name}
                            </span>
                            {player.doador && (
                              <span className="text-[10px] text-amber-400 block font-mono">
                                Doador: <strong>{player.doador}</strong>
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500 block font-mono">
                              Entrou há {Math.max(1, Math.round((Date.now() - player.timestamp) / 60000))} min
                            </span>
                          </div>

                          {isCalled && (
                            <span className="text-[9px] uppercase font-mono bg-cyan-500 text-slate-950 px-1 py-0.2 rounded font-bold tracking-wider animate-pulse self-center">
                              Chamado 🎙️
                            </span>
                          )}
                        </div>

                        {/* Elemental choice indicator badge */}
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-semibold ${style.badge} ${style.glow}`}>
                            {style.image ? (
                              <img
                                src={style.image}
                                alt={player.precisa_de}
                                className="w-4 h-4 rounded-full object-cover border border-slate-700/50"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <IconComp className="w-3 h-3" />
                            )}
                            <span>Quer: <strong>{player.precisa_de}</strong></span>
                            <span>{style.emoji}</span>
                          </span>
                        </div>

                         {/* Quick actions for host */}
                         {isAdmin && (
                           <div className="flex items-center gap-1.5 self-end md:self-center">
                             <button
                               onClick={() => handleCallPlayer(player.id)}
                               className={`px-2.5 py-1.5 text-[10px] font-bold font-mono uppercase tracking-wide rounded-lg transition-all flex items-center gap-1 border ${
                                 isCalled
                                   ? "bg-cyan-500 text-slate-950 border-cyan-400 hover:bg-cyan-400"
                                   : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
                               }`}
                             >
                               <Users className="w-3 h-3" />
                               {isCalled ? "Recolocar" : "Chamar Squad"}
                             </button>

                             <button
                               onClick={() => openDonateModal(player.player_name, player.precisa_de, player.doador, player.id)}
                               className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-[10px] rounded-lg border border-amber-500/20 hover:border-amber-500 transition-all font-mono uppercase flex items-center gap-1"
                               title="Especificar doação recebida"
                             >
                               <Award className="w-3 h-3" />
                               <span>Doou ✨</span>
                             </button>

                             <button
                               onClick={() => handleRemovePlayer(player.id)}
                               className="p-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-slate-950 border border-rose-500/20 hover:border-rose-500 rounded-lg transition-all"
                               title="Remover da fila"
                             >
                               <Trash2 className="w-3.5 h-3.5" />
                             </button>
                           </div>
                         )}

                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* TOP DONORS LEADERBOARD & CYCLE / LIVES MANAGEMENT */}
            <div className="bg-slate-950/75 rounded-2xl border border-slate-800/80 p-5 shadow-xl backdrop-blur-md space-y-4">
              
              {/* Cycle selector tabs */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <div>
                    <h2 className="font-display font-bold text-white text-sm sm:text-base">
                      Ranking de Doações
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      {selectedCicloId === "ciclo1"
                        ? "📁 Ciclo 1 (Arquivado) — Tabela Oficial consolidada sem divergências."
                        : "⚡ Ciclo 2 (Ativo) — Estrutura ampliada para 10 Lives com pontuação por raridade."}
                    </p>
                  </div>
                </div>

                {/* Cycle Buttons */}
                <div className="flex items-center gap-1.5 self-start md:self-center">
                  <button
                    onClick={() => {
                      setSelectedCicloId("ciclo1");
                      setSelectedLiveFilter(0);
                      playSynthSound("click");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      selectedCicloId === "ciclo1"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    <span>📁 Ciclo 1</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-slate-900 text-amber-400 border border-slate-700 rounded uppercase font-bold">
                      Oficial (Arquivado)
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCicloId("ciclo2");
                      setSelectedLiveFilter(0);
                      playSynthSound("click");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      selectedCicloId === "ciclo2"
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    <span>⚡ Ciclo 2</span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded uppercase font-bold">
                      Ativo (10 Lives)
                    </span>
                  </button>
                </div>
              </div>

              {/* Live filter controls if Ciclo 2 */}
              {selectedCicloId === "ciclo2" && (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mr-1 whitespace-nowrap">
                      Lives (1 a 10):
                    </span>
                    <button
                      onClick={() => setSelectedLiveFilter(0)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer border whitespace-nowrap ${
                        selectedLiveFilter === 0
                          ? "bg-slate-800 text-white border-slate-700 shadow-sm"
                          : "bg-slate-950 text-slate-400 border-slate-850 hover:text-slate-200"
                      }`}
                    >
                      Todas
                    </button>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setSelectedLiveFilter(num)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer border whitespace-nowrap ${
                          selectedLiveFilter === num
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/10 font-black"
                            : "bg-slate-950 text-slate-400 border-slate-850 hover:text-slate-200"
                        }`}
                      >
                        L{num}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {isAdmin && selectedLiveFilter > 0 && (
                      <button
                        onClick={() => setShowConfirmClearLive({ cicloId: "ciclo2", live: selectedLiveFilter })}
                        className="px-2.5 py-1 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                        title={`Zerar todos os registros da Live ${selectedLiveFilter}`}
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Zerar Live {selectedLiveFilter}</span>
                      </button>
                    )}

                    {isAdmin && (
                      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <input
                          type="text"
                          placeholder="Novo doador..."
                          id="live-donor-name"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const input = e.currentTarget;
                              if (input.value.trim()) {
                                handleDonate(input.value);
                                input.value = "";
                              }
                            }
                          }}
                          className="bg-transparent text-xs text-white px-2.5 py-1 focus:outline-none placeholder-slate-500 font-mono w-32"
                        />
                        <button
                          onClick={() => {
                            const el = document.getElementById("live-donor-name") as HTMLInputElement;
                            if (el && el.value.trim()) {
                              handleDonate(el.value);
                              el.value = "";
                            }
                          }}
                          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded-lg text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer"
                        >
                          Registrar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Table Matrix or Empty State */}
              {(() => {
                const stats = getCicloDonorStats(selectedCicloId);
                const currentDonors = selectedLiveFilter === 0
                  ? stats.donors
                  : stats.donors.filter(d => (d.livePoints[selectedLiveFilter] || 0) > 0 || (d.liveCounts[selectedLiveFilter] || 0) > 0);

                if (currentDonors.length === 0) {
                  return (
                    <p className="text-xs text-slate-500 italic text-center py-6">
                      Nenhuma doação registrada para {selectedCicloId === "ciclo1" ? "o Ciclo 1" : selectedLiveFilter > 0 ? `a Live ${selectedLiveFilter}` : "o Ciclo 2"} ainda.
                    </p>
                  );
                }

                if (selectedCicloId === "ciclo1") {
                  // Dedicated view for Ciclo 1 (Archived official ranking)
                  return (
                    <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/90 shadow-inner max-h-[340px] overflow-y-auto">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead className="sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
                          <tr className="border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                            <th className="py-2.5 px-3 text-center w-12">#</th>
                            <th className="py-2.5 px-3">Doador / Participante</th>
                            <th className="py-2.5 px-3 text-center text-amber-400 font-bold">Pontuação Oficial Acumulada</th>
                            <th className="py-2.5 px-3 text-center text-slate-400">Status</th>
                            {isAdmin && <th className="py-2.5 px-3 text-center w-24">Ações</th>}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 text-xs font-mono">
                          {currentDonors.map((donor, idx) => {
                            let placeBadge = (
                              <span className="text-slate-400 font-bold">{idx + 1}º</span>
                            );
                            if (idx === 0) placeBadge = <span className="text-amber-400 font-black text-sm">🥇 1º</span>;
                            if (idx === 1) placeBadge = <span className="text-slate-300 font-black text-sm">🥈 2º</span>;
                            if (idx === 2) placeBadge = <span className="text-amber-600 font-black text-sm">🥉 3º</span>;

                            return (
                              <tr key={donor.name} className="hover:bg-slate-900/50 transition-all">
                                <td className="py-2.5 px-3 text-center font-bold">
                                  {placeBadge}
                                </td>
                                <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                                  <span>{donor.name}</span>
                                  {idx === 0 && (
                                    <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded font-bold">
                                      Campeão Ciclo 1
                                    </span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3 text-center font-bold text-amber-300 text-sm">
                                  {donor.totalPoints} {donor.totalPoints === 1 ? "ponto" : "pontos"}
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                                    📁 Arquivado
                                  </span>
                                </td>
                                {isAdmin && (
                                  <td className="py-2.5 px-3 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                      <button
                                        onClick={() => handleDonate(donor.name)}
                                        className="w-5 h-5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 rounded flex items-center justify-center text-[10px] transition-all cursor-pointer"
                                        title="Registrar doação para este doador"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() => setEditPlayerScore({ name: donor.name, count: String(donor.totalPoints), cicloId: "ciclo1" })}
                                        className="w-5 h-5 bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 rounded flex items-center justify-center text-[9px] transition-all cursor-pointer"
                                        title="Editar pontos"
                                      >
                                        ✏️
                                      </button>
                                      <button
                                        onClick={() => setDeleteDonorName({ name: donor.name, cicloId: "ciclo1" })}
                                        className="w-5 h-5 bg-slate-900 hover:bg-red-950 hover:text-red-400 text-slate-400 border border-slate-800 hover:border-red-900/50 rounded flex items-center justify-center text-[10px] transition-all cursor-pointer"
                                        title="Deletar doador do Ciclo 1"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="sticky bottom-0 bg-slate-900 border-t-2 border-slate-800">
                          <tr className="font-mono text-xs font-bold text-white">
                            <td colSpan={2} className="py-2.5 px-3 uppercase text-[10px] text-slate-400 tracking-wider">
                              📊 Total de Pontos Consolidados (Ciclo 1):
                            </td>
                            <td className="py-2.5 px-3 text-center text-amber-400 text-sm font-black">
                              {stats.liveTotals.grandTotal} pts
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-400 text-[10px]">
                              Finalizado
                            </td>
                            {isAdmin && <td></td>}
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  );
                }

                // Ciclo 2 Matrix Table (10 Lives)
                return (
                  <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/90 shadow-inner max-h-[340px] overflow-y-auto">
                    <table className="w-full text-left border-collapse min-w-[860px]">
                      <thead className="sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
                        <tr className="border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          <th className="py-2.5 px-3 text-center w-10">#</th>
                          <th className="py-2.5 px-3">Doador / Participante</th>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((l) => (
                            <th key={l} className="py-2.5 px-1.5 text-center text-cyan-400 text-[10px]">
                              L{l}
                            </th>
                          ))}
                          <th className="py-2.5 px-3 text-center text-purple-400">Participação</th>
                          <th className="py-2.5 px-3 text-right text-emerald-400 font-bold">Total (Soma)</th>
                          {isAdmin && <th className="py-2.5 px-3 text-center w-24">Ações</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-xs font-mono">
                        {currentDonors.map((donor, idx) => {
                          let placeColor = "text-slate-400";
                          if (idx === 0) placeColor = "text-amber-400 font-black";
                          if (idx === 1) placeColor = "text-slate-300 font-black";
                          if (idx === 2) placeColor = "text-amber-600 font-black";

                          return (
                            <tr key={donor.name} className="hover:bg-slate-900/50 transition-all">
                              <td className={`py-2.5 px-3 text-center font-bold ${placeColor}`}>
                                {idx + 1}
                              </td>
                              <td className="py-2.5 px-3 font-bold text-white">
                                {donor.name}
                              </td>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((l) => {
                                const pts = donor.livePoints[l] || 0;
                                return (
                                  <td key={l} className="py-2.5 px-1.5 text-center text-[10px] relative group/cell">
                                    {pts > 0 ? (
                                      <div className="inline-flex items-center justify-center gap-0.5">
                                        <span className="text-cyan-300 font-semibold bg-cyan-500/10 px-1 py-0.5 rounded border border-cyan-500/20">
                                          +{pts}
                                        </span>
                                        {isAdmin && (
                                          <button
                                            onClick={() => setDeleteDonorName({ name: donor.name, cicloId: "ciclo2", live: l })}
                                            className="opacity-0 group-hover/cell:opacity-100 w-3.5 h-3.5 text-slate-500 hover:text-red-400 transition-all cursor-pointer flex items-center justify-center"
                                            title={`Apagar pontos de ${donor.name} na Live ${l}`}
                                          >
                                            <Trash2 className="w-2.5 h-2.5" />
                                          </button>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="text-slate-700">-</span>
                                    )}
                                  </td>
                                );
                              })}
                              <td className="py-2.5 px-3 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  donor.livesParticipated >= 7
                                    ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                                    : donor.livesParticipated >= 3
                                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                    : "bg-slate-800 text-slate-400 border-slate-700"
                                }`}>
                                  📡 {donor.livesParticipated}/10 Lives
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-right font-bold text-emerald-400 text-xs">
                                {donor.totalPoints} pts
                              </td>
                              {isAdmin && (
                                <td className="py-2.5 px-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <button
                                      onClick={() => handleDonate(donor.name)}
                                      className="w-5 h-5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 rounded flex items-center justify-center text-[10px] transition-all cursor-pointer"
                                      title="Registrar doação para este doador"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => setEditPlayerScore({ name: donor.name, count: String(donor.totalPoints), cicloId: "ciclo2" })}
                                      className="w-5 h-5 bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 rounded flex items-center justify-center text-[9px] transition-all cursor-pointer"
                                      title="Editar pontos"
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={() => setDeleteDonorName({ name: donor.name, cicloId: "ciclo2", live: selectedLiveFilter > 0 ? selectedLiveFilter : undefined })}
                                      className="w-5 h-5 bg-slate-900 hover:bg-red-950 hover:text-red-400 text-slate-400 border border-slate-800 hover:border-red-900/50 rounded flex items-center justify-center text-[10px] transition-all cursor-pointer"
                                      title={selectedLiveFilter > 0 ? `Remover da Live ${selectedLiveFilter}` : "Deletar doador do Ciclo 2"}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="sticky bottom-0 bg-slate-900 border-t-2 border-slate-800">
                        <tr className="font-mono text-xs font-bold text-white">
                          <td colSpan={2} className="py-2.5 px-3 uppercase text-[10px] text-slate-400 tracking-wider">
                            📊 Soma de Cada Live:
                          </td>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((l) => (
                            <td key={l} className="py-2.5 px-1.5 text-center text-cyan-400 text-[10px]">
                              {stats.liveTotals[l]} pts
                            </td>
                          ))}
                          <td className="py-2.5 px-3 text-center text-slate-400 text-[10px]">
                            Soma Geral
                          </td>
                          <td className="py-2.5 px-3 text-right text-emerald-400 text-xs font-black">
                            {stats.liveTotals.grandTotal} pts
                          </td>
                          {isAdmin && <td></td>}
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                );
              })()}

              {/* DRAW ASSIST FOR SKIN CONTEST */}
              {(() => {
                const stats = getCicloDonorStats(selectedCicloId);
                if (stats.donors.length === 0) return null;

                return (
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                    <div className="text-xs text-slate-400 leading-relaxed">
                      🎉 <strong className="text-slate-200">Sorteador Proporcional ({selectedCicloId === "ciclo1" ? "Ciclo 1" : "Ciclo 2"}):</strong> Quanto mais pontos acumulados de doações, maior a chance no sorteio de Skins!
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          playSynthSound("call");
                          const pool: string[] = [];
                          stats.donors.forEach((d) => {
                            for (let i = 0; i < d.totalPoints; i++) {
                              pool.push(d.name);
                            }
                          });
                          if (pool.length > 0) {
                            const winner = pool[Math.floor(Math.random() * pool.length)];
                            alert(`🎉 PARABÉNS! O vencedor sorteado no ${selectedCicloId === "ciclo1" ? "Ciclo 1" : "Ciclo 2"} é: ${winner.toUpperCase()}! 🏆`);
                          } else {
                            alert("Nenhum participante com pontos para o sorteio.");
                          }
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/10 cursor-pointer"
                      >
                        <Shuffle className="w-4 h-4" />
                        Sortear Vencedor
                      </button>
                    )}
                  </div>
                );
              })()}

            </div>

            {/* RANKING GERAL - TOTAL DE PONTOS ACUMULADOS DE TODAS AS LIVES */}
            <div className="bg-slate-950/75 rounded-2xl border border-slate-800/80 p-5 shadow-xl backdrop-blur-md space-y-4">
              
              {/* Header do Ranking Geral */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-amber-600/20 rounded-xl border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Trophy className="w-6 h-6 text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display font-bold text-white text-base md:text-lg">
                        Ranking Geral — Total de Pontos
                      </h2>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#00dfa2] border border-[#00dfa2]/30 font-extrabold uppercase animate-pulse">
                        Todas as Lives
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Classificação consolidada apenas com o total de pontos acumulados por cada doador somando todas as lives.
                    </p>
                  </div>
                </div>

                {/* Scope Switcher: Ciclo 2 (10 Lives) vs Geral Completo */}
                <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start sm:self-center">
                  <button
                    onClick={() => {
                      setRankingGeralScope("ciclo2");
                      playSynthSound("click");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      rankingGeralScope === "ciclo2"
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 font-black"
                        : "bg-transparent text-slate-400 border-transparent hover:text-white"
                    }`}
                  >
                    <span>⚡ Ciclo 2</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded uppercase font-extrabold ${
                      rankingGeralScope === "ciclo2" ? "bg-slate-950 text-cyan-300" : "bg-slate-800 text-slate-400"
                    }`}>
                      10 Lives
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setRankingGeralScope("todos");
                      playSynthSound("click");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      rankingGeralScope === "todos"
                        ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 font-black"
                        : "bg-transparent text-slate-400 border-transparent hover:text-white"
                    }`}
                  >
                    <span>🌐 Geral</span>
                    <span className={`text-[9px] px-1 py-0.2 rounded uppercase font-extrabold ${
                      rankingGeralScope === "todos" ? "bg-slate-950 text-amber-300" : "bg-slate-800 text-slate-400"
                    }`}>
                      Ciclos 1 + 2
                    </span>
                  </button>
                </div>
              </div>

              {/* Ranking Data Render */}
              {(() => {
                const rankingData = getRankingGeralData(rankingGeralScope);

                if (rankingData.donors.length === 0) {
                  return (
                    <div className="py-8 text-center bg-slate-900/30 rounded-xl border border-slate-850">
                      <Trophy className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 italic">
                        Nenhuma doação pontuada registrada para {rankingGeralScope === "ciclo2" ? "as lives do Ciclo 2" : "o ranking geral"} ainda.
                      </p>
                      {isAdmin && (
                        <button
                          onClick={() => openDonateModal()}
                          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-all font-mono uppercase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Registrar Primeira Doação
                        </button>
                      )}
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    
                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      
                      {/* Top Leader */}
                      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-slate-900/80 p-3 rounded-xl border border-amber-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-sm">
                            👑
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block">
                              Líder Geral
                            </span>
                            <span className="text-xs font-bold text-white font-mono truncate max-w-[120px] block">
                              {rankingData.topDonor ? rankingData.topDonor.name : "Nenhum"}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-black font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/30">
                          {rankingData.topDonor ? `${rankingData.topDonor.totalPoints} pts` : "0 pts"}
                        </span>
                      </div>

                      {/* Total Points */}
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-sm">
                            ⚡
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                              Total Acumulado
                            </span>
                            <span className="text-xs font-bold text-white font-mono">
                              Todas as Lives
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-black font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                          {rankingData.grandTotal} pts
                        </span>
                      </div>

                      {/* Active Donors */}
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-sm">
                            👥
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                              Total de Doadores
                            </span>
                            <span className="text-xs font-bold text-white font-mono">
                              Participantes
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-black font-mono text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
                          {rankingData.donors.length} {rankingData.donors.length === 1 ? "doador" : "doadores"}
                        </span>
                      </div>

                    </div>

                    {/* Table View - Clean Total Points per Donor */}
                    <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/90 shadow-inner max-h-[380px] overflow-y-auto">
                      <table className="w-full text-left border-collapse min-w-[550px]">
                        <thead className="sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
                          <tr className="border-b border-slate-800 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                            <th className="py-2.5 px-3 text-center w-14">#</th>
                            <th className="py-2.5 px-3">Doador / Participante</th>
                            <th className="py-2.5 px-3 hidden md:table-cell w-48">Proporção dos Pontos</th>
                            <th className="py-2.5 px-3 text-center text-slate-400">Presença</th>
                            <th className="py-2.5 px-3 text-right text-emerald-400 font-extrabold text-xs">Total de Pontos</th>
                            {isAdmin && <th className="py-2.5 px-3 text-center w-24">Ações</th>}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 text-xs font-mono">
                          {rankingData.donors.map((donor, idx) => {
                            const isFirst = idx === 0 && donor.totalPoints > 0;
                            const isSecond = idx === 1 && donor.totalPoints > 0;
                            const isThird = idx === 2 && donor.totalPoints > 0;
                            const percentage = Math.max(5, Math.round((donor.totalPoints / rankingData.maxPoints) * 100));

                            let rankBadge = (
                              <span className="text-slate-400 font-bold">{idx + 1}º</span>
                            );
                            if (isFirst) rankBadge = <span className="text-amber-400 font-black text-sm">🥇 1º</span>;
                            if (isSecond) rankBadge = <span className="text-slate-300 font-black text-sm">🥈 2º</span>;
                            if (isThird) rankBadge = <span className="text-amber-600 font-black text-sm">🥉 3º</span>;

                            return (
                              <tr
                                key={donor.name}
                                className={`transition-all ${
                                  isFirst
                                    ? "bg-amber-500/5 hover:bg-amber-500/10"
                                    : "hover:bg-slate-900/50"
                                }`}
                              >
                                {/* Position */}
                                <td className="py-3 px-3 text-center font-bold">
                                  {rankBadge}
                                </td>

                                {/* Donor Name with badge */}
                                <td className="py-3 px-3">
                                  <div className="flex items-center gap-2">
                                    <span className={`font-bold ${isFirst ? "text-amber-300 font-black text-sm" : "text-white"}`}>
                                      {donor.name}
                                    </span>
                                    {isFirst && (
                                      <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded uppercase font-extrabold flex items-center gap-1">
                                        <Crown className="w-2.5 h-2.5" />
                                        1º Lugar
                                      </span>
                                    )}
                                    {isSecond && (
                                      <span className="text-[9px] px-1.5 py-0.2 bg-slate-800 text-slate-300 border border-slate-700 rounded uppercase font-bold">
                                        2º Lugar
                                      </span>
                                    )}
                                    {isThird && (
                                      <span className="text-[9px] px-1.5 py-0.2 bg-amber-950/40 text-amber-600 border border-amber-800/40 rounded uppercase font-bold">
                                        3º Lugar
                                      </span>
                                    )}
                                  </div>
                                </td>

                                {/* Visual Progress Bar */}
                                <td className="py-3 px-3 hidden md:table-cell">
                                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800/60 p-0.5">
                                    <div
                                      className={`h-full rounded-full transition-all ${
                                        isFirst
                                          ? "bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                                          : isSecond
                                          ? "bg-gradient-to-r from-slate-400 to-slate-200"
                                          : isThird
                                          ? "bg-gradient-to-r from-amber-700 to-amber-500"
                                          : "bg-gradient-to-r from-cyan-500 to-emerald-400"
                                      }`}
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </td>

                                {/* Participation Presence */}
                                <td className="py-3 px-3 text-center">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                    donor.livesCount >= 5
                                      ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                                      : donor.livesCount >= 2
                                      ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                                      : "bg-slate-800/80 text-slate-400 border-slate-700/80"
                                  }`}>
                                    {donor.livesCount} {donor.livesCount === 1 ? "live" : "lives"}
                                  </span>
                                </td>

                                {/* Total Points (Big & Highlighted) */}
                                <td className="py-3 px-3 text-right font-black">
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${
                                    isFirst
                                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/15 text-sm"
                                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                  }`}>
                                    <span>{donor.totalPoints}</span>
                                    <span className="text-[10px] font-normal opacity-80">
                                      {donor.totalPoints === 1 ? "pt" : "pts"}
                                    </span>
                                  </span>
                                </td>

                                {/* Admin Quick Actions */}
                                {isAdmin && (
                                  <td className="py-3 px-3 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                      <button
                                        onClick={() => handleDonate(donor.name)}
                                        className="w-5 h-5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 rounded flex items-center justify-center text-[10px] transition-all cursor-pointer"
                                        title="Registrar doação para este doador"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() => setEditPlayerScore({
                                          name: donor.name,
                                          count: String(donor.totalPoints),
                                          cicloId: rankingGeralScope === "ciclo2" ? "ciclo2" : "ciclo1"
                                        })}
                                        className="w-5 h-5 bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 rounded flex items-center justify-center text-[9px] transition-all cursor-pointer"
                                        title="Editar pontuação"
                                      >
                                        ✏️
                                      </button>
                                      <button
                                        onClick={() => setDeleteDonorName({
                                          name: donor.name,
                                          cicloId: rankingGeralScope === "ciclo2" ? "ciclo2" : "ciclo1"
                                        })}
                                        className="w-5 h-5 bg-slate-900 hover:bg-red-950 hover:text-red-400 text-slate-400 border border-slate-800 hover:border-red-900/50 rounded flex items-center justify-center text-[10px] transition-all cursor-pointer"
                                        title="Deletar doador do ranking"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="sticky bottom-0 bg-slate-900 border-t-2 border-slate-800">
                          <tr className="font-mono text-xs font-bold text-white">
                            <td colSpan={2} className="py-2.5 px-3 uppercase text-[10px] text-slate-400 tracking-wider">
                              📊 Total Geral Acumulado ({rankingGeralScope === "ciclo2" ? "Ciclo 2 - 10 Lives" : "Todos os Ciclos"}):
                            </td>
                            <td className="py-2.5 px-3 hidden md:table-cell"></td>
                            <td className="py-2.5 px-3 text-center text-slate-400 text-[10px]">
                              {rankingData.donors.length} doadores
                            </td>
                            <td className="py-2.5 px-3 text-right text-emerald-400 text-sm font-black">
                              {rankingData.grandTotal} pts
                            </td>
                            {isAdmin && <td></td>}
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                  </div>
                );
              })()}

            </div>

            {/* HISTÓRICO DETALHADO DE DOAÇÕES */}
            <div className="bg-slate-950/75 rounded-2xl border border-slate-800/80 p-5 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h2 className="font-display font-bold text-white text-base flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00dfa2]" />
                  <span>Histórico Detalhado de Doações ({state.doacoes?.length || 0})</span>
                </h2>
                
                {isAdmin && state.doacoes && state.doacoes.length > 0 && (
                  <button
                    onClick={() => setShowConfirmResetHistory(true)}
                    className="text-[10px] text-rose-400 hover:text-rose-300 font-mono flex items-center gap-1 uppercase font-bold cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    Limpar Histórico
                  </button>
                )}
              </div>

              {!state.doacoes || state.doacoes.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-6">
                  Nenhuma doação registrada no histórico detalhado ainda.
                </p>
              ) : (
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {state.doacoes.map((log) => {
                    const style = ELEMENT_STYLES[log.elemental] || {
                      emoji: "✨",
                      color: "text-slate-400",
                      badge: "bg-slate-900 border-slate-800",
                      image: undefined as string | undefined
                    };
                    return (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-3 bg-slate-900/40 rounded-xl border border-slate-850 hover:border-slate-800 transition-all text-xs font-mono"
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <span className="text-base flex-shrink-0 bg-slate-950 p-1.5 rounded-lg border border-slate-850 overflow-hidden flex items-center justify-center w-8 h-8">
                            {style.image ? (
                              <img
                                src={style.image}
                                alt={log.elemental}
                                className="w-5 h-5 rounded-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              style.emoji
                            )}
                          </span>
                          
                          <div className="truncate text-slate-300 flex items-center gap-1 flex-wrap">
                            <span className="text-amber-400 font-bold">{log.doador}</span>
                            <span className="text-slate-500">doou</span>
                            <span className="text-white font-bold">{log.elemental}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                              getElementalPoints(log.elemental) === 4 ? "bg-violet-500/20 text-violet-400 border-violet-500/30" :
                              getElementalPoints(log.elemental) === 3 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                              getElementalPoints(log.elemental) === 2 ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                              getElementalPoints(log.elemental) === 1.5 ? "bg-sky-500/20 text-sky-400 border-sky-500/30" :
                              "bg-slate-800 text-slate-400 border-slate-700"
                            }`}>
                              +{getElementalPoints(log.elemental)} pts
                            </span>
                            <span className="text-slate-500">para</span>
                            <span className="text-cyan-400 font-bold">{log.receptor}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                          <span className="text-[10px] text-slate-500">
                            {Math.max(1, Math.round((Date.now() - log.timestamp) / 60000))}m atrás
                          </span>
                          {isAdmin && (
                            <button
                              onClick={() => handleRemoveDonation(log.id)}
                              className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10 transition-all cursor-pointer"
                              title="Desfazer esta doação"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </section>

        </main>
      ) : (
        
        /* 16 ELEMENTALS ENCYCLOPEDIA TAB */
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
          <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-6 shadow-xl backdrop-blur-md">
            
            <div className="border-b border-slate-800 pb-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-white text-xl flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  <span>Enciclopédia Oficial dos 16 Elementais</span>
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Veja a lista oficial identificada para as lives de Fortnite. Cada sprite elemental possui seu estilo, badge correspondente e cor no painel de trocas.
                </p>
              </div>

              {/* Filter by variant */}
              <div className="flex items-center gap-2 bg-slate-905 border border-slate-800 px-3 py-1.5 rounded-xl self-start md:self-auto">
                <span className="text-xs text-slate-400 font-mono">Variante:</span>
                <select
                  value={selectedVariantFilter}
                  onChange={(e) => {
                    setSelectedVariantFilter(e.target.value);
                    playSynthSound("click");
                  }}
                  className="bg-transparent text-white text-xs focus:outline-none font-mono cursor-pointer"
                >
                  <option value="Todas" className="bg-slate-950 text-white">🌈 Todas as variantes</option>
                  {VARIANTS.map((v) => (
                    <option key={v.name} value={v.name} className="bg-slate-950 text-white">
                      {v.emoji || "✨"} {v.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.keys(ELEMENT_STYLES)
                .filter((el) => {
                  if (selectedVariantFilter === "Todas") return true;
                  if (selectedVariantFilter === "(Padrão)") {
                    return el.endsWith(" (Padrão)");
                  }
                  return el.includes(` - ${selectedVariantFilter}`);
                })
                .map((el) => {
                  const style = ELEMENT_STYLES[el];
                  const IconComp = style.icon;
                  return (
                    <div
                      key={el}
                      className={`bg-slate-900/60 border rounded-2xl p-4 flex flex-col justify-between transition-all hover:border-slate-700 ${style.border} ${style.glow}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`p-2 rounded-xl ${style.bg} overflow-hidden flex items-center justify-center w-9 h-9`}>
                            {style.image ? (
                              <img
                                src={style.image}
                                alt={el}
                                className="w-6 h-6 rounded object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <IconComp className={`w-5 h-5 ${style.color}`} />
                            )}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold border ${
                              getElementalPoints(el) === 4 ? "bg-violet-500/20 text-violet-300 border-violet-500/40 shadow-[0_0_8px_rgba(139,92,246,0.3)]" :
                              getElementalPoints(el) === 3 ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" :
                              getElementalPoints(el) === 2 ? "bg-amber-500/20 text-amber-300 border-amber-500/40" :
                              getElementalPoints(el) === 1.5 ? "bg-sky-500/20 text-sky-300 border-sky-500/40" :
                              "bg-slate-800/80 text-slate-400 border-slate-750"
                            }`}>
                              +{getElementalPoints(el)} {getElementalPoints(el) === 1 ? "Ponto" : "Pontos"}
                            </span>
                            <span className="text-2xl">{style.emoji}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-white font-mono font-bold text-sm">
                          {el}
                        </h3>
                        
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          {style.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono text-slate-500">
                          Fortnite Sprite
                        </span>
                        <button
                          onClick={() => {
                            selectElemental(el);
                            setActiveTab("fila");
                            playSynthSound("click");
                          }}
                          className="text-[10px] text-cyan-400 hover:text-white font-mono hover:underline font-bold"
                        >
                          Selecionar →
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900/80 py-6 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-mono">🎮 Fortnite Live Element Trades Dashboard v3.0</p>
            <p className="mt-1 text-slate-600">Sincronização em tempo real de filas para Lives do Youtube & Twitch. Otimizado para DAVIGP & NICKOLBOY.</p>
          </div>
          <div className="flex items-center gap-4 font-mono text-slate-400">
            <span>SQUAD HOSTS: DAVIGP | NICKOLBOY</span>
          </div>
        </div>
      </footer>

      {/* CONFIRM RESET QUEUE MODAL */}
      {showConfirmResetQueue && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-2.5 text-red-400 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display font-bold text-white text-base">Limpar toda a Fila?</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Isso apagará permanentemente todos os inscritos que estão aguardando na fila. Essa ação não pode ser desfeita.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmResetQueue(false)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearQueue}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition-all font-mono"
              >
                Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM RESET RANKING MODAL */}
      {showConfirmResetRanking && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-2.5 text-amber-400 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display font-bold text-white text-base">Zerar Ranking de Doações?</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Todos os pontos de doadores acumulados no painel de controle serão redefinidos para zero. Confirmar?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmResetRanking(false)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleResetRanking}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold transition-all font-mono"
              >
                Zerar Tudo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM RESET HISTORY MODAL */}
      {showConfirmResetHistory && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-2.5 text-rose-400 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display font-bold text-white text-base">Limpar todo o Histórico?</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Isso apagará permanentemente todo o histórico detalhado de doações do painel. Essa ação não pode ser desfeita.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmResetHistory(false)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition-all font-mono"
              >
                Limpar Histórico
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DONOR MODAL */}
      {deleteDonorName && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-2.5 text-red-400 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display font-bold text-white text-base">
                {deleteDonorName.live
                  ? `Remover da Live ${deleteDonorName.live}?`
                  : deleteDonorName.cicloId === "ciclo2"
                  ? "Remover do Ciclo 2?"
                  : "Remover Doador?"}
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Deseja realmente remover as doações de <span className="text-white font-mono font-bold">"{deleteDonorName.name}"</span>
              {deleteDonorName.live ? (
                <> na <span className="text-cyan-400 font-bold">Live {deleteDonorName.live}</span> do Ciclo 2?</>
              ) : deleteDonorName.cicloId === "ciclo2" ? (
                <> em todas as lives do <span className="text-cyan-400 font-bold">Ciclo 2</span>?</>
              ) : (
                <> do ranking? Todos os pontos consolidados serão apagados.</>
              )}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteDonorName(null)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleDeleteDonor(deleteDonorName.name, deleteDonorName.cicloId, deleteDonorName.live);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition-all font-mono cursor-pointer"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM CLEAR LIVE / CICLO MODAL */}
      {showConfirmClearLive && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-2.5 text-red-400 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display font-bold text-white text-base">
                {showConfirmClearLive.live > 0
                  ? `Zerar Live ${showConfirmClearLive.live}?`
                  : "Zerar Ciclo 2 Inteiro?"}
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              {showConfirmClearLive.live > 0 ? (
                <>Isso apagará permanentemente todos os registros de doações e pontos da <span className="text-cyan-400 font-bold">Live {showConfirmClearLive.live}</span> do Ciclo 2.</>
              ) : (
                <>Isso apagará permanentemente todos os registros de doações e pontos de <span className="text-cyan-400 font-bold">todas as 10 lives do Ciclo 2</span>.</>
              )}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmClearLive(null)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleClearCiclo(showConfirmClearLive.cicloId, showConfirmClearLive.live > 0 ? showConfirmClearLive.live : undefined);
                  setShowConfirmClearLive(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition-all font-mono cursor-pointer"
              >
                Confirmar e Zerar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT DONATION SCORE MODAL */}
      {editPlayerScore && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-display font-bold text-white text-base mb-1">Editar doações de:</h3>
            <p className="text-sm font-mono text-cyan-400 font-bold mb-4">{editPlayerScore.name}</p>
            
            <div className="mb-6">
              <label className="block text-[10px] text-slate-500 font-mono mb-2 uppercase">Quantidade de doações</label>
              <input
                type="text"
                value={editPlayerScore.count}
                onChange={(e) => setEditPlayerScore({ ...editPlayerScore, count: e.target.value })}
                placeholder="Ex: 5,5 ou 10"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 text-sm font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setEditPlayerScore(null)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-semibold transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const val = parseFloat(editPlayerScore.count.replace(",", "."));
                  handleSetDonorCount(editPlayerScore.name, isNaN(val) ? 0 : val, editPlayerScore.cicloId);
                }}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer"
              >
                Salvar Alteração
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED REGISTER DONATION MODAL */}
      {showDonateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleAddDonation}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-white text-base">Registrar Nova Doação</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDonateModal(false)}
                className="text-slate-500 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Doador Input */}
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Nome do Doador (Quem está doando)
              </label>
              <input
                type="text"
                required
                value={donateForm.doador}
                onChange={(e) => setDonateForm({ ...donateForm, doador: e.target.value })}
                placeholder="Ex: VitorElements"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all font-mono"
              />

              {/* Suggestions for Doador */}
              <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                <span className="text-[9px] font-mono text-slate-500 mr-1">Sugestões:</span>
                {["DAVIGP", "NICKOLBOY"].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setDonateForm({ ...donateForm, doador: name })}
                    className="px-2 py-0.5 bg-slate-950 hover:bg-slate-800 text-[9px] font-mono text-slate-400 rounded border border-slate-800 hover:border-slate-700 transition-all"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Selector */}
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Número da Live (Ciclo 2 - 10 Lives)</span>
                <span className="text-cyan-400 text-[10px] font-bold">Live {donateForm.live || 1} selecionada</span>
              </label>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setDonateForm({ ...donateForm, live: num })}
                    className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                      (donateForm.live || 1) === num
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 font-black"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    L{num}
                  </button>
                ))}
              </div>
            </div>

            {/* Elemental Selection */}
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Elemental que será Doado</span>
                <span className="text-amber-400 text-[10px] font-bold">
                  +{getElementalPoints(donateForm.elemental)} {getElementalPoints(donateForm.elemental) === 1 ? "Ponto" : "Pontos"} no Ranking
                </span>
              </label>
              <select
                value={donateForm.elemental}
                onChange={(e) => setDonateForm({ ...donateForm, elemental: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all font-mono cursor-pointer"
              >
                {Object.keys(ELEMENT_STYLES).map((el) => {
                  const pts = getElementalPoints(el);
                  return (
                    <option key={el} value={el} className="bg-slate-950 text-white text-xs">
                      {ELEMENT_STYLES[el].emoji} {el} ({pts} {pts === 1 ? "ponto" : "pontos"})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Receptor Input */}
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Nome do Receptor (Para quem é a doação)
              </label>
              <input
                type="text"
                required
                value={donateForm.receptor}
                onChange={(e) => setDonateForm({ ...donateForm, receptor: e.target.value })}
                placeholder="Ex: GamerPro99, Geral"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-all font-mono"
              />

              {/* Suggestions for Receptor */}
              <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                <span className="text-[9px] font-mono text-slate-500 mr-1">Sugestões:</span>
                <button
                  type="button"
                  onClick={() => setDonateForm({ ...donateForm, receptor: "Geral" })}
                  className="px-2 py-0.5 bg-slate-950 hover:bg-slate-800 text-[9px] font-mono text-slate-400 rounded border border-slate-800 hover:border-slate-700 transition-all"
                >
                  Geral
                </button>
                {state.fila.filter((p) => p.status === "called").slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setDonateForm({
                        ...donateForm,
                        receptor: p.player_name,
                        elemental: p.precisa_de,
                        removerFila: true
                      });
                    }}
                    className="px-2 py-0.5 bg-cyan-950/30 hover:bg-cyan-950/60 text-[9px] font-mono text-cyan-400 rounded border border-cyan-900/30 hover:border-cyan-900/50 transition-all"
                  >
                    🎙️ {p.player_name}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto-remove from Queue Checkbox */}
            {state.fila.some((p) => p.player_name.toLowerCase() === donateForm.receptor.toLowerCase()) && (
              <div className="flex items-center gap-2 bg-slate-950/50 p-3 rounded-xl border border-slate-850">
                <input
                  type="checkbox"
                  id="removerFila"
                  checked={donateForm.removerFila}
                  onChange={(e) => setDonateForm({ ...donateForm, removerFila: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-opacity-25 bg-slate-900"
                />
                <label htmlFor="removerFila" className="text-xs text-slate-400 cursor-pointer font-mono select-none">
                  Remover <strong className="text-cyan-400 font-bold">{donateForm.receptor}</strong> automaticamente da fila?
                </label>
              </div>
            )}

            {/* Confirm Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setShowDonateModal(false)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl text-xs font-semibold transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-[#00dfa2] hover:bg-[#00c58e] disabled:opacity-50 text-slate-950 rounded-xl text-xs font-extrabold font-mono tracking-wide uppercase transition-all shadow-md shadow-emerald-500/15"
              >
                Confirmar Registro
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
