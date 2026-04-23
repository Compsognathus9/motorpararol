import type { PNJ } from './PNJ.js';

export interface IPNJRepository {
  create(pnj: PNJ): Promise<PNJ>;
  findBySceneId(sceneId: string): Promise<PNJ[]>;
  findById(id: string): Promise<PNJ | null>;
}
