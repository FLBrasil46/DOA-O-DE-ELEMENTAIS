export interface Player {
  id: string;
  player_name: string;
  precisa_de: string;
  status: "waiting" | "called" | "squad";
  timestamp: number;
  doador?: string;
}

export interface Doacao {
  id: string;
  doador: string;
  elemental: string;
  receptor: string;
  timestamp: number;
  live?: number; // 1 to 10
  cicloId?: string; // "ciclo1", "ciclo2"
}

export interface Ciclo {
  id: string;
  name: string;
  status: "active" | "archived";
  totalLives: number;
}

export interface AppState {
  fila: Player[];
  ranking_doadores: Record<string, number>;
  vagas_squad: number;
  squad_membros: string[];
  doacoes?: Doacao[];
  currentCicloId?: string;
  ciclos?: Ciclo[];
}

