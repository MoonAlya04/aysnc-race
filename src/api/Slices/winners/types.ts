export interface GetWinnersParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
}

export type WinnersSort = "id" | "wins" | "time";
export type WinnersOrder = "asc" | "desc";
