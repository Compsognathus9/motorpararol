import { Router } from 'express';
import type { CreateSession } from '../../../application/session/CreateSession.js';
import type { GetSessions } from '../../../application/session/GetSessions.js';

export function buildSessionsRouter(useCases: {
  createSession: CreateSession;
  getSessions: GetSessions;
}): Router {
  const router = Router();

  router.post('/', async (_req, res) => {
    const session = await useCases.createSession.execute();
    res.status(201).json(session);
  });

  router.get('/', async (_req, res) => {
    const sessions = await useCases.getSessions.execute();
    res.status(200).json(sessions);
  });

  return router;
}
