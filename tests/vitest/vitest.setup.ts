import { EventLog } from 'lib/events';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  EventLog.clearEvents();
});
