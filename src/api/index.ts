
import ApiSlice from "./slice.ts";
import EngineSlice from "./slices/engine/index.ts";
import GarageSlice from "./slices/garage/index.ts";
import WinnersSlice from "./slices/winners/index.ts";


class Api extends ApiSlice {
  static garage = GarageSlice;
  static winners = WinnersSlice;
  static engine = EngineSlice;
}

export default Api;
