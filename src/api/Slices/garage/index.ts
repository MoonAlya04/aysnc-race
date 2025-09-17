import ApiSlice from '../../slice';
import { FailedResponse, SuccessResponse } from '../../types';

import { Car, GetCarsResponse } from './entity';

export default class GarageSlice extends ApiSlice {
  static baseURL = ApiSlice.baseURL + '/garage';

  static async GetCars(page: number = 1, limit: number = 9) {
    const params = new URLSearchParams();
    if (page) params.set('_page', page.toString());
    if (limit) params.set('_limit', limit.toString());
    const rsp = await this.request(`?${params.toString()}`);
    if (rsp.meta.error) return rsp as FailedResponse;
    const result = {
      ...(rsp as SuccessResponse),
      data: new GetCarsResponse((rsp.data && typeof rsp.data === 'object' ? rsp.data : {}) as Record<string, unknown>),
    };
    return result;
  }

  static async GetCar({ id }: { id: number }) {
    const rsp = await this.request(`/${id}`);
    if (rsp.meta.error) return rsp as FailedResponse;

    const result = {
      ...(rsp as SuccessResponse),
      data: new Car((rsp.data && typeof rsp.data === 'object' ? rsp.data : {}) as Record<string, unknown>),
    };
    return result;
  }

  static async CreateCar({ name, color }: { name: string; color: string }) {
    const rsp = await this.request(
      '/',
      'POST',
      { name, color },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (rsp.meta.error) return rsp as FailedResponse;
    const result = {
      ...(rsp as SuccessResponse),
      data: new Car((rsp.data && typeof rsp.data === 'object' ? rsp.data : {}) as Record<string, unknown>),
    };
    return result;
  }

  static async UpdateCar({ id, name, color }: { id: number; name: string; color: string }) {
    const rsp = await this.request(
      `/${id}`,
      'PUT',
      { name, color },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (rsp.meta.error) return rsp as FailedResponse;
    const result = {
      ...(rsp as SuccessResponse),
      data: new Car((rsp.data && typeof rsp.data === 'object' ? rsp.data : {}) as Record<string, unknown>),
    };
    return result;
  }

  static async DeleteCar({ id }: { id: number }) {
    const rsp = await this.request(`/${id}`, 'DELETE');
    if (rsp.meta.error) return rsp as FailedResponse;
    return rsp as SuccessResponse;
  }
}
