
import { EngineResponse } from "../engine/entity"

const WITHOUT_ID = -1
const DEFAULT_POSITION = 0

export class Car {
  id: number
  name: string
  color: string
  position: number
  engine: EngineResponse

  constructor(json: Record<string, unknown>) {
    this.name = typeof json.name === "string" ? json.name : ""
    this.color = typeof json.color === "string" ? json.color : ""
    this.id = typeof json.id === "number" ? json.id : WITHOUT_ID
    this.position = typeof json.position === "number" ? json.position : DEFAULT_POSITION
    this.engine = new EngineResponse(
      (json.engine && typeof json.engine === "object" ? json.engine : {}) as Record<string, unknown>
    )
  }
}

export class GetCarsResponse {
  items: Car[]
  constructor(json: Record<string, unknown>) {
    this.items = Array.isArray(json.items) ? json.items.map(car => new Car(car)) : []
  }
}
