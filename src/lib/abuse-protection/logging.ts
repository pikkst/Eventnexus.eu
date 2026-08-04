export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, unknown>;
}

export function logAbuseEvent(
  level: 'info' | 'warn' | 'error',
  message: string,
  context?: Record<string, unknown>
): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
  };

  const logLine = JSON.stringify(entry);

  switch (level) {
    case 'error':
      console.error(logLine);
      break;
    case 'warn':
      console.warn(logLine);
      break;
    default:
      console.log(logLine);
  }
}
