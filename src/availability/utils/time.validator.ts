export function isValidTimeRange(startTime: string, endTime: string): boolean {
  return startTime < endTime;
}