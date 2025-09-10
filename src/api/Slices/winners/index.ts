import ApiSlice from "../../slice";
import { GetWinnersResponse, Winner } from "./entity";
import type { GetWinnersParams } from "./types";
import type { FailedResponse, SuccessResponse } from "../../types";

export default class WinnersSlice extends ApiSlice {
  static baseURL = ApiSlice.baseURL + "/winners";

  static async GetWinners({ page, limit = 10, sort, order }: GetWinnersParams) {
    const params = new URLSearchParams();
    if (page) params.append("_page", page.toString());
    if (limit) params.append("_limit", limit.toString());
    if (sort) params.append("_sort", sort);
    if (order) params.append("_order", order);
    const rsp = await this.request(`?${params.toString()}`);
    if (rsp.meta.error) return rsp as FailedResponse;

    const result = {
      ...(rsp as SuccessResponse),
      data: new GetWinnersResponse((rsp.data && typeof rsp.data === "object" ? rsp.data : {}) as Record<string, unknown>)
    };
    return result;
  }

  static async GetWinner({ id }: { id: number }) {
    const rsp = await this.request(`/${id}`);
    if (rsp.meta.error) return rsp as FailedResponse;
    const result = {
      ...(rsp as SuccessResponse),
      data: new Winner((rsp.data && typeof rsp.data === "object" ? rsp.data : {}) as Record<string, unknown>)
    };
    return result;
  }

  static async CreateWinner({ wins, time }: { wins: number; time: number }) {
    const rsp = await this.request(
      "",
      "POST",
      { wins, time },
      {
        headers: {
          contentType: "application/json"
        }
      }
    );
    if (rsp.meta.error) return rsp as FailedResponse;
    const result = {
      ...(rsp as SuccessResponse),
      data: new Winner((rsp.data && typeof rsp.data === "object" ? rsp.data : {}) as Record<string, unknown>)
    };
    return result;
  }

  static async DeleteWinner({ id }: { id: number }) {
    const rsp = await this.request(`/${id}`, "DELETE");
    if (rsp.meta.error) return rsp as FailedResponse;
    return rsp as SuccessResponse;
  }

  static async UpdateWinner({ id, wins, time }: { id: number; wins: number; time: number }) {
    const rsp = await this.request(
      `/${id}`,
      "PUT",
      { wins, time },
      {
        headers: {
          contentType: "application/json"
        }
      }
    );
    if (rsp.meta.error) return rsp as FailedResponse;

    const result = {
      ...(rsp as SuccessResponse),
      data: new Winner((rsp.data && typeof rsp.data === "object" ? rsp.data : {}) as Record<string, unknown>)
    };
    return result;
  }
}
