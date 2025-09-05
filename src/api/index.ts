
import ApiSlice from "./slice.ts";
import EngineSlice from "./Slices/engine/index.ts";
import GarageSlice from "./Slices/garage/index.ts";
import WinnersSlice from "./Slices/winners/index.ts";


class Api extends ApiSlice {
  static garage = GarageSlice;
  static winners = WinnersSlice;
  static engine = EngineSlice;
}

export default Api;
