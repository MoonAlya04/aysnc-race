import { EngineResponse } from "../engine/entity";
import { CarCondition } from "./types";

const WITHOUT_ID = -1;
const DEFAULT_POSITION = 0;

export class Car {
  id: number;
  name: string;
  color: string;
  position: number;
  condition: CarCondition;
  engine: EngineResponse;
  constructor(json: Record<string, unknown>) {
    this.name = typeof json.name === "string" ? json.name : "";
    this.color = typeof json.color === "string" ? json.color : "";
    this.id = typeof json.id === "number" ? json.id : WITHOUT_ID;
    this.condition = typeof json.condition === "string" ? CarCondition.broken || CarCondition.running : CarCondition.running;
    this.position = typeof json.position === "number" ? json.position : DEFAULT_POSITION;
    this.engine = new EngineResponse(
      (json.engine && typeof json.engine === "object" ? json.engine : {}) as Record<string, unknown>
    );
  }
}

export class GetCarsResponse {
  items: Car[];
  length: number;
  constructor(json: Record<string, unknown>) {
    this.items = Array.isArray(json.data) ? json.data.map(car => new Car(car)) : [];
    this.length = typeof json.totalCount === "string" ? +json.totalCount : 0;
  }
}
