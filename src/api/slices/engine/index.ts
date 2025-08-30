// src/api/slices/engine/engineSlice.ts
import ApiSlice from "../../slice";
import { EngineResponse } from "./entity";
import { EngineStatus } from "./types";
import { FailedResponse, SuccessResponse } from "../../types";

export default class EngineSlice extends ApiSlice {
    static baseURL = ApiSlice.baseURL + "/engine";

    static async PatchCarEngine({
        id,
        status,
    }: {
        id: number;
        status: EngineStatus.started | EngineStatus.stopped;
    }) {
        const rsp = await this.request(`?id=${id}&status=${status}`, "PATCH");
        if (rsp.meta.error) return rsp as FailedResponse;

        const result = {
            ...(rsp as SuccessResponse),
            data: new EngineResponse(
                (rsp.data && typeof rsp.data === "object"
                    ? { ...rsp.data, status }
                    : {}) as Record<string, unknown>
            ),
        };
        return result;
    }

    static async PatchEngineStatus({
        id,
        status,
    }: {
        id: number;
        status: EngineStatus.drive;
    }) {
        const rsp = await this.request(`?id=${id}&status=${status}`, "PATCH");
        if (rsp.meta.error) return rsp as FailedResponse;

        return rsp as SuccessResponse;
    }
}
