import ApiSlice from "./slice";
import EngineSlice from "./Slices/engine/index";
import GarageSlice from "./Slices/garage/index";
import WinnersSlice from "./Slices/winners/index";

class Api extends ApiSlice {
  static garage = GarageSlice;
  static winners = WinnersSlice;
  static engine = EngineSlice;
}

export default Api;
