import type { Session } from '../../domain/session/Session.js';
import type { ISessionRepository } from '../../domain/session/ISessionRepository.js';

export class GetSessions {
  constructor(private readonly sessions: ISessionRepository) {}

  async execute(): Promise<Session[]> {
    return this.sessions.findAll();
  }
}
