import { EventLog } from '@/events';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  EventLog.clearEvents();
});
