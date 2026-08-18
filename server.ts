import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
  writeBatch
} from "firebase/firestore";

const app = express();
const PORT = 3000;

app.use(express.json());

interface Player {
  id: string;
  player_name: string;
  precisa_de: string;
  status: "waiting" | "called" | "squad";
  timestamp: number;
  doador?: string;
}

interface Doacao {
  id: string;
  doador: string;
  elemental: string;
  receptor: string;
  timestamp: number;
  live?: number;
  cicloId?: string;
}

interface AppState {
  fila: Player[];
  ranking_doadores: Record<string, number>;
  vagas_squad: number; // default 2
  squad_membros: string[]; // members in active squad
  doacoes?: Doacao[];
  currentCicloId?: string;
  ciclos?: { id: string; name: string; status: "active" | "archived"; totalLives: number }[];
}

const defaultState: AppState = {
  fila: [
    { id: "1", player_name: "GamerPro99", precisa_de: "Sprite de Água (Padrão)", status: "waiting", timestamp: Date.now() - 600000, doador: "VitorElements" },
    { id: "2", player_name: "FortniteLover", precisa_de: "Sprite de Fogo (Padrão)", status: "waiting", timestamp: Date.now() - 400000, doador: "" },
    { id: "3", player_name: "ElementalMaster", precisa_de: "Sprite de Terra (Padrão)", status: "waiting", timestamp: Date.now() - 200000, doador: "" },
  ],
  ranking_doadores: {
    "GamerPro99": 3,
    "FortniteLover": 5,
    "VitorElements": 8,
  },
  vagas_squad: 2,
  squad_membros: [],
  doacoes: [
    { id: "d1", doador: "VitorElements", elemental: "Sprite de Água (Padrão)", receptor: "GamerPro99", timestamp: Date.now() - 300000, cicloId: "ciclo1", live: 1 },
    { id: "d2", doador: "FortniteLover", elemental: "Sprite de Fogo (Padrão)", receptor: "ElementalMaster", timestamp: Date.now() - 150000, cicloId: "ciclo1", live: 1 },
  ],
};

let state: AppState = {
  fila: [],
  ranking_doadores: {},
  vagas_squad: 2,
  squad_membros: [],
  doacoes: []
};

// Initialize Firebase
let db: any;
try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    const firebaseConfig = {
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
    };
    const firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp, config.firestoreDatabaseId || "(default)");
    console.log("Firebase inicializado com sucesso para o banco de dados:", config.firestoreDatabaseId);
  } else {
    console.warn("firebase-applet-config.json não encontrado. Firebase não inicializado.");
  }
} catch (error) {
  console.error("Erro ao inicializar Firebase:", error);
}

// Firestore helpers
async function savePlayerToFirestore(player: Player) {
  if (!db) return;
  const { id, ...data } = player;
  await setDoc(doc(db, "fila", id), data);
}

async function removePlayerFromFirestore(id: string) {
  if (!db) return;
  await deleteDoc(doc(db, "fila", id));
}

async function saveSettingsToFirestore(vagas_squad: number, squad_membros: string[]) {
  if (!db) return;
  await setDoc(doc(db, "settings", "app_config"), { vagas_squad, squad_membros }, { merge: true });
}

async function saveDoacaoToFirestore(doacao: Doacao) {
  if (!db) return;
  const { id, ...data } = doacao;
  await setDoc(doc(db, "doacoes", id), data);
}

async function removeDoacaoFromFirestore(id: string) {
  if (!db) return;
  await deleteDoc(doc(db, "doacoes", id));
}

async function saveRankingToFirestore(name: string, points: number) {
  if (!db) return;
  await setDoc(doc(db, "ranking", name), { points });
}

async function removeRankingFromFirestore(name: string) {
  if (!db) return;
  await deleteDoc(doc(db, "ranking", name));
}

async function clearRankingInFirestore() {
  if (!db) return;
  const rankingSnap = await getDocs(collection(db, "ranking"));
  const batch = writeBatch(db);
  rankingSnap.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });
  await batch.commit();
}

async function clearDoacoesInFirestore() {
  if (!db) return;
  const snap = await getDocs(collection(db, "doacoes"));
  const batch = writeBatch(db);
  snap.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });
  await batch.commit();
}

async function clearFilaInFirestore() {
  if (!db) return;
  const snap = await getDocs(collection(db, "fila"));
  const batch = writeBatch(db);
  snap.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });
  await batch.commit();
}

async function seedDefaultState() {
  if (!db) return;
  try {
    const batch = writeBatch(db);

    // Seed Fila
    defaultState.fila.forEach((p) => {
      const ref = doc(db, "fila", p.id);
      const { id, ...data } = p;
      batch.set(ref, data);
    });

    // Seed Doacoes
    if (defaultState.doacoes) {
      defaultState.doacoes.forEach((d) => {
        const ref = doc(db, "doacoes", d.id);
        const { id, ...data } = d;
        batch.set(ref, data);
      });
    }

    // Seed Ranking
    Object.entries(defaultState.ranking_doadores).forEach(([name, pts]) => {
      const ref = doc(db, "ranking", name);
      batch.set(ref, { points: pts });
    });

    // Seed Settings
    const settingsRef = doc(db, "settings", "app_config");
    batch.set(settingsRef, {
      vagas_squad: defaultState.vagas_squad,
      squad_membros: defaultState.squad_membros,
    });

    await batch.commit();
    state = { ...defaultState };
    console.log("Dados padrão semeados no Firestore com sucesso!");
  } catch (error) {
    console.error("Erro ao semear dados padrão no Firestore:", error);
  }
}

async function loadStateFromFirestore() {
  if (!db) {
    state = { ...defaultState };
    return;
  }
  try {
    const filaSnap = await getDocs(query(collection(db, "fila"), orderBy("timestamp", "asc")));
    const doacoesSnap = await getDocs(query(collection(db, "doacoes"), orderBy("timestamp", "desc")));
    const rankingSnap = await getDocs(collection(db, "ranking"));
    const settingsSnap = await getDoc(doc(db, "settings", "app_config"));

    const fila: Player[] = [];
    filaSnap.forEach((docSnap) => {
      fila.push({ id: docSnap.id, ...docSnap.data() } as Player);
    });

    const doacoes: Doacao[] = [];
    doacoesSnap.forEach((docSnap) => {
      const data = docSnap.data() as Doacao;
      const d: Doacao = { id: docSnap.id, ...data };
      if (!d.cicloId) {
        d.cicloId = "ciclo1";
      }
      doacoes.push(d);
    });

    const ranking_doadores: Record<string, number> = {};
    rankingSnap.forEach((docSnap) => {
      ranking_doadores[docSnap.id] = docSnap.data().points;
    });

    let vagas_squad = 2;
    let squad_membros: string[] = [];

    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      vagas_squad = data.vagas_squad ?? 2;
      squad_membros = data.squad_membros ?? [];
    }

    // Se o banco de dados estiver completamente vazio, semear com dados padrão
    if (fila.length === 0 && doacoes.length === 0 && Object.keys(ranking_doadores).length === 0) {
      console.log("Banco de dados vazio. Semeando dados padrão...");
      await seedDefaultState();
      return;
    }

    state = {
      fila,
      ranking_doadores,
      vagas_squad,
      squad_membros,
      doacoes,
    };
    console.log("Estado carregado do Firestore com sucesso!");
  } catch (error) {
    console.error("Erro ao carregar estado do Firestore, usando o padrão:", error);
    state = { ...defaultState };
  }
}

async function resetFirestoreToDefault() {
  if (!db) return;
  await clearFilaInFirestore();
  await clearDoacoesInFirestore();
  await clearRankingInFirestore();
  await seedDefaultState();
}

// Simple live update tracking
let clients: express.Response[] = [];

function broadcastState() {
  const payload = JSON.stringify({ type: "state", data: state });
  clients.forEach((client) => {
    try {
      client.write(`data: ${payload}\n\n`);
    } catch (e) {
      // ignore dead client
    }
  });
}

// API Routes
app.get("/api/state", (req, res) => {
  res.json(state);
});

// SSE Endpoint
app.get("/api/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Send current state
  res.write(`data: ${JSON.stringify({ type: "state", data: state })}\n\n`);

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
});

app.post("/api/fila/add", async (req, res) => {
  const { player_name, precisa_de, doador } = req.body;
  if (!player_name) {
    return res.status(400).json({ error: "Nome do jogador é obrigatório" });
  }

  const newPlayer: Player = {
    id: Math.random().toString(36).substring(2, 9),
    player_name: player_name.trim(),
    precisa_de: precisa_de || "Sprite de Água (Padrão)",
    status: "waiting",
    timestamp: Date.now(),
    doador: doador ? doador.trim() : ""
  };

  state.fila.push(newPlayer);
  await savePlayerToFirestore(newPlayer);
  broadcastState();

  res.json({ success: true, player: newPlayer });
});

app.post("/api/fila/remove", async (req, res) => {
  const { id } = req.body;
  const player = state.fila.find((p) => p.id === id);
  if (player) {
    state.squad_membros = state.squad_membros.filter((name) => name !== player.player_name);
    await saveSettingsToFirestore(state.vagas_squad, state.squad_membros);
  }
  state.fila = state.fila.filter((p) => p.id !== id);
  await removePlayerFromFirestore(id);
  
  broadcastState();
  res.json({ success: true });
});

app.post("/api/fila/call", async (req, res) => {
  const { id } = req.body;
  const player = state.fila.find((p) => p.id === id);
  if (player) {
    player.status = player.status === "called" ? "waiting" : "called";
    
    // Manage auto squad placement
    if (player.status === "called") {
      if (!state.squad_membros.includes(player.player_name) && state.squad_membros.length < state.vagas_squad) {
        state.squad_membros.push(player.player_name);
      }
    } else {
      state.squad_membros = state.squad_membros.filter((name) => name !== player.player_name);
    }

    await savePlayerToFirestore(player);
    await saveSettingsToFirestore(state.vagas_squad, state.squad_membros);
    broadcastState();
    res.json({ success: true, player });
  } else {
    res.status(404).json({ error: "Jogador não encontrado na fila" });
  }
});

app.post("/api/squad/settings", async (req, res) => {
  const { vagas_squad } = req.body;
  if (typeof vagas_squad === "number") {
    state.vagas_squad = vagas_squad;
    if (state.squad_membros.length > vagas_squad) {
      state.squad_membros = state.squad_membros.slice(0, vagas_squad);
    }
    await saveSettingsToFirestore(state.vagas_squad, state.squad_membros);
    broadcastState();
    res.json({ success: true, vagas_squad });
  } else {
    res.status(400).json({ error: "Inválido" });
  }
});

app.post("/api/ranking/donate", async (req, res) => {
  const { player_name } = req.body;
  if (!player_name) {
    return res.status(400).json({ error: "Nome do jogador é obrigatório" });
  }

  const name = player_name.trim();
  state.ranking_doadores[name] = (state.ranking_doadores[name] || 0) + 1;

  await saveRankingToFirestore(name, state.ranking_doadores[name]);
  broadcastState();
  res.json({ success: true, ranking: state.ranking_doadores });
});

app.post("/api/ranking/set", async (req, res) => {
  const { player_name, count, cicloId } = req.body;
  if (!player_name) {
    return res.status(400).json({ error: "Nome do jogador é obrigatório" });
  }

  const name = player_name.trim();
  const value = parseFloat(String(count).replace(",", "."));
  if (isNaN(value) || value < 0) {
    delete state.ranking_doadores[name];
    await removeRankingFromFirestore(name);
    if (state.doacoes) {
      const toRemove = state.doacoes.filter((d) => {
        const matchName = d.doador.trim().toLowerCase() === name.toLowerCase();
        if (!matchName) return false;
        if (cicloId) return (d.cicloId || "ciclo1") === cicloId;
        return true;
      });
      for (const d of toRemove) {
        await removeDoacaoFromFirestore(d.id);
      }
      state.doacoes = state.doacoes.filter((d) => !toRemove.includes(d));
    }
  } else {
    state.ranking_doadores[name] = value;
    await saveRankingToFirestore(name, value);
  }

  broadcastState();
  res.json({ success: true, ranking: state.ranking_doadores, state });
});

app.post("/api/ranking/delete-donor", async (req, res) => {
  const { player_name, cicloId, live } = req.body;
  if (!player_name) {
    return res.status(400).json({ error: "Nome do jogador é obrigatório" });
  }

  const name = player_name.trim();

  // If deleting only from a specific live
  if (live && Number(live) > 0) {
    const liveNum = Number(live);
    if (state.doacoes) {
      const toRemove = state.doacoes.filter(
        (d) =>
          d.doador.trim().toLowerCase() === name.toLowerCase() &&
          (d.cicloId || "ciclo1") === (cicloId || "ciclo2") &&
          (d.live || 1) === liveNum
      );
      for (const d of toRemove) {
        await removeDoacaoFromFirestore(d.id);
      }
      state.doacoes = state.doacoes.filter((d) => !toRemove.includes(d));
    }
  } else if (cicloId) {
    // Delete donor from specific ciclo
    if (state.doacoes) {
      const toRemove = state.doacoes.filter(
        (d) =>
          d.doador.trim().toLowerCase() === name.toLowerCase() &&
          (d.cicloId || "ciclo1") === cicloId
      );
      for (const d of toRemove) {
        await removeDoacaoFromFirestore(d.id);
      }
      state.doacoes = state.doacoes.filter((d) => !toRemove.includes(d));
    }
    if (cicloId === "ciclo1") {
      delete state.ranking_doadores[name];
      await removeRankingFromFirestore(name);
    }
  } else {
    // Delete donor completely
    delete state.ranking_doadores[name];
    await removeRankingFromFirestore(name);
    if (state.doacoes) {
      const toRemove = state.doacoes.filter(
        (d) => d.doador.trim().toLowerCase() === name.toLowerCase()
      );
      for (const d of toRemove) {
        await removeDoacaoFromFirestore(d.id);
      }
      state.doacoes = state.doacoes.filter((d) => !toRemove.includes(d));
    }
  }

  broadcastState();
  res.json({ success: true, state });
});

app.post("/api/ranking/reset", async (req, res) => {
  state.ranking_doadores = {};
  if (state.doacoes) {
    state.doacoes = [];
  }
  await clearRankingInFirestore();
  await clearDoacoesInFirestore();
  broadcastState();
  res.json({ success: true });
});

function getElementalPoints(elemental: string): number {
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

app.post("/api/doacoes/add", async (req, res) => {
  const { doador, elemental, receptor, removerFila, filaId, live, cicloId } = req.body;
  if (!doador || !elemental || !receptor) {
    return res.status(400).json({ error: "Doador, elemental e receptor são obrigatórios" });
  }

  const targetCiclo = cicloId || state.currentCicloId || "ciclo2";
  const targetLive = Math.min(Math.max(Number(live) || 1, 1), 10);

  const newDoacao: Doacao = {
    id: Math.random().toString(36).substring(2, 9),
    doador: doador.trim(),
    elemental: elemental.trim(),
    receptor: receptor.trim(),
    timestamp: Date.now(),
    live: targetLive,
    cicloId: targetCiclo
  };

  if (!state.doacoes) {
    state.doacoes = [];
  }
  state.doacoes.unshift(newDoacao);
  await saveDoacaoToFirestore(newDoacao);

  // Increment ranking by points based on rarity
  const donorName = doador.trim();
  const points = getElementalPoints(elemental.trim());
  state.ranking_doadores[donorName] = (state.ranking_doadores[donorName] || 0) + points;
  await saveRankingToFirestore(donorName, state.ranking_doadores[donorName]);

  // Remove recipient from queue if removerFila is checked
  if (removerFila) {
    let toRemove: Player[] = [];
    if (filaId) {
      toRemove = state.fila.filter((p) => p.id === filaId);
    }
    if (toRemove.length === 0) {
      const recvName = receptor.trim().toLowerCase();
      const nameMatches = state.fila.filter((p) => p.player_name.toLowerCase() === recvName);
      if (nameMatches.length > 0) {
        // Find one that matches the elemental name if possible
        const exactMatch = nameMatches.find((p) => p.precisa_de.toLowerCase() === elemental.trim().toLowerCase());
        if (exactMatch) {
          toRemove = [exactMatch];
        } else {
          // Otherwise, remove the oldest one
          toRemove = [nameMatches[0]];
        }
      }
    }

    for (const player of toRemove) {
      await removePlayerFromFirestore(player.id);
      state.fila = state.fila.filter((p) => p.id !== player.id);
      
      // Only remove from active squad members if they have no other items left in the queue
      const hasOtherEntries = state.fila.some((p) => p.player_name.toLowerCase() === player.player_name.toLowerCase());
      if (!hasOtherEntries) {
        state.squad_membros = state.squad_membros.filter((name) => name.toLowerCase() !== player.player_name.toLowerCase());
      }
    }
    await saveSettingsToFirestore(state.vagas_squad, state.squad_membros);
  }

  broadcastState();
  res.json({ success: true, doacao: newDoacao, state });
});

app.post("/api/doacoes/remove", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "ID é obrigatório" });
  }

  if (state.doacoes) {
    const index = state.doacoes.findIndex((d) => d.id === id);
    if (index !== -1) {
      const doacao = state.doacoes[index];
      const donorName = doacao.doador;
      const points = getElementalPoints(doacao.elemental);
      if (state.ranking_doadores[donorName]) {
        state.ranking_doadores[donorName] = Math.max(0, state.ranking_doadores[donorName] - points);
        if (state.ranking_doadores[donorName] === 0) {
          delete state.ranking_doadores[donorName];
          await removeRankingFromFirestore(donorName);
        } else {
          await saveRankingToFirestore(donorName, state.ranking_doadores[donorName]);
        }
      }
      state.doacoes.splice(index, 1);
      await removeDoacaoFromFirestore(id);
    }
  }

  broadcastState();
  res.json({ success: true, state });
});

app.post("/api/doacoes/clear", async (req, res) => {
  state.doacoes = [];
  await clearDoacoesInFirestore();
  broadcastState();
  res.json({ success: true, state });
});

app.post("/api/doacoes/clear-ciclo", async (req, res) => {
  const { cicloId, live } = req.body;
  const targetCiclo = cicloId || "ciclo2";

  if (state.doacoes && state.doacoes.length > 0) {
    const toRemove: Doacao[] = [];
    const remaining: Doacao[] = [];

    state.doacoes.forEach((d) => {
      const matchCiclo = (d.cicloId || "ciclo1") === targetCiclo;
      const matchLive = live ? (d.live || 1) === Number(live) : true;
      if (matchCiclo && matchLive) {
        toRemove.push(d);
      } else {
        remaining.push(d);
      }
    });

    for (const d of toRemove) {
      await removeDoacaoFromFirestore(d.id);
    }
    state.doacoes = remaining;
  }

  broadcastState();
  res.json({ success: true, state });
});

app.post("/api/fila/clear", async (req, res) => {
  state.fila = [];
  state.squad_membros = [];
  await clearFilaInFirestore();
  await saveSettingsToFirestore(state.vagas_squad, state.squad_membros);
  broadcastState();
  res.json({ success: true });
});

app.post("/api/db/reset", async (req, res) => {
  await resetFirestoreToDefault();
  broadcastState();
  res.json({ success: true, state });
});

async function startServer() {
  await loadStateFromFirestore();

  const isProd = process.env.NODE_ENV === "production" || fs.existsSync(path.join(process.cwd(), "dist/index.html"));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
