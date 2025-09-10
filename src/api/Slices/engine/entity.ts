import { EngineStatus } from "./types";

const DEFAULT_VELOCITY = 0;
const DEFAULT_DISTANCE = 0;

export class EngineResponse {
  velocity: number;
  distance: number;
  status: EngineStatus;
  constructor(json: Record<string, unknown>) {
    this.velocity = typeof json.velocity === "number" ? json.velocity : DEFAULT_VELOCITY;
    this.distance = typeof json.distance === "number" ? json.distance : DEFAULT_DISTANCE;
    this.status =
      typeof json.status === "string" && (json.status === EngineStatus.drive || json.status === EngineStatus.started)
        ? json.status
        : EngineStatus.stopped;
  }
}
