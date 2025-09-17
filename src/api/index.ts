import ApiSlice from './slice';
import EngineSlice from './Slices/engine';
import GarageSlice from './Slices/garage';
import WinnersSlice from './Slices/winners';

class Api extends ApiSlice {
  static garage = GarageSlice;
  static winners = WinnersSlice;
  static engine = EngineSlice;
}

export default Api;
