export interface ScheduledItem {
  id: string;
  cronExpression: string;
  command: string;
}
