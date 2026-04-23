import type { Session } from './Session.js';

export interface ISessionRepository {
  create(session: Session): Promise<Session>;
  findAll(): Promise<Session[]>;
  findById(id: string): Promise<Session | null>;
}
