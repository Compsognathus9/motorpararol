import type { Scene } from './Scene.js';

export interface ISceneRepository {
  create(scene: Scene): Promise<Scene>;
  findBySessionId(sessionId: string): Promise<Scene[]>;
  findById(id: string): Promise<Scene | null>;
}
