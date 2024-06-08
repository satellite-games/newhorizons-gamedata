import { EventLog } from '@satellite-games/orbit';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  EventLog.clearEvents();
});
