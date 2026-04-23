import type { Session } from '../../domain/session/Session.js';
import type { ISessionRepository } from '../../domain/session/ISessionRepository.js';

export class InMemorySessionRepository implements ISessionRepository {
  private readonly store = new Map<string, Session>();

  async create(session: Session): Promise<Session> {
    this.store.set(session.id, session);
    return session;
  }

  async findAll(): Promise<Session[]> {
    return Array.from(this.store.values());
  }

  async findById(id: string): Promise<Session | null> {
    return this.store.get(id) ?? null;
  }
}
