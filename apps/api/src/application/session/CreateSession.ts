import { randomUUID } from 'node:crypto';
import type { Session } from '../../domain/session/Session.js';
import type { ISessionRepository } from '../../domain/session/ISessionRepository.js';

export class CreateSession {
  constructor(private readonly sessions: ISessionRepository) {}

  async execute(): Promise<Session> {
    const session: Session = {
      id: randomUUID(),
      createdAt: new Date(),
    };
    return this.sessions.create(session);
  }
}
