import express, { type Express } from 'express';
import { CreateSession } from './application/session/CreateSession.js';
import { GetSessions } from './application/session/GetSessions.js';
import { InMemorySessionRepository } from './infrastructure/persistence/InMemorySessionRepository.js';
import { buildSessionsRouter } from './infrastructure/http/routes/sessions.routes.js';

export function buildApp(): Express {
  const app = express();
  app.use(express.json());

  const sessionRepo = new InMemorySessionRepository();
  const createSession = new CreateSession(sessionRepo);
  const getSessions = new GetSessions(sessionRepo);

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/v1/sessions', buildSessionsRouter({ createSession, getSessions }));

  return app;
}
