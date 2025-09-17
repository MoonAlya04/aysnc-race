import ApiSlice from '../../slice';
import { FailedResponse, SuccessResponse } from '../../types';
import { EngineResponse } from './entity';
import { EngineStatus } from './types';

export default class EngineSlice extends ApiSlice {
  static baseURL = ApiSlice.baseURL + '/engine';

  static async PatchCarEngine({
    id,
    status,
  }: {
    id: number;
    status: EngineStatus.started | EngineStatus.stopped;
  }) {
    // only pass the query string, ApiSlice will prepend baseURL
    const rsp = await this.request(`?id=${id}&status=${status}`, 'PATCH');
    if (rsp.meta.error) return rsp as FailedResponse;

    const result = {
      ...(rsp as SuccessResponse),
      data: new EngineResponse(
        (rsp.data && typeof rsp.data === 'object'
          ? {
              ...rsp.data,
              status,
            }
          : {}) as Record<string, unknown>,
      ),
    };
    return result;
  }

  static async PatchEngineStatus({ id, status }: { id: number; status: EngineStatus.drive }) {
    const rsp = await this.request(`?id=${id}&status=${status}`, 'PATCH');
    if (rsp.meta.error) return rsp as FailedResponse;

    return rsp as SuccessResponse;
  }
}
