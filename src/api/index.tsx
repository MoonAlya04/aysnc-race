// src/api/index.ts
import ApiSlice from "./slice";
import EngineSlice from "./slices/engine";
import GarageSlice from "./slices/garage";
import WinnersSlice from "./slices/winners";

class Api extends ApiSlice {
    static garage = GarageSlice;
    static winners = WinnersSlice;
    static engine = EngineSlice;
}

export default Api;
