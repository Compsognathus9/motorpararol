import { describe, expect, it } from 'vitest';
import { CreateSession } from './CreateSession.js';
import { InMemorySessionRepository } from '../../infrastructure/persistence/InMemorySessionRepository.js';

describe('CreateSession', () => {
  it('creates a session with id and createdAt', async () => {
    const repo = new InMemorySessionRepository();
    const useCase = new CreateSession(repo);

    const session = await useCase.execute();

    expect(session.id).toBeTypeOf('string');
    expect(session.id.length).toBeGreaterThan(0);
    expect(session.createdAt).toBeInstanceOf(Date);
  });

  it('persists the session in the repository', async () => {
    const repo = new InMemorySessionRepository();
    const useCase = new CreateSession(repo);

    const created = await useCase.execute();
    const stored = await repo.findById(created.id);

    expect(stored).not.toBeNull();
    expect(stored?.id).toBe(created.id);
  });
});
