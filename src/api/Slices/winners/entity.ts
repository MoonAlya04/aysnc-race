export class Winner {
  id: number;
  wins: number;
  time: number;

  constructor(json: Record<string, unknown>) {
    this.id = typeof json.id === "number" ? json.id : 0;
    this.wins = typeof json.wins === "number" ? json.wins : 0;
    this.time = typeof json.time === "number" ? json.time : 0;
  }
}

export class GetWinnersResponse {
  items: Winner[];
  length: number;
  constructor(json: Record<string, unknown>) {
    this.items = Array.isArray(json.data) ? json.data.map(winner => new Winner(winner)) : [];
    this.length = typeof json.totalCount === "string" ? +json.totalCount : 0;
  }
}
