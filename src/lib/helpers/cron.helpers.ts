import { CronExpression, parseExpression } from "cron-parser";

interface ParsedExpression {
  success: boolean;
  expression?: CronExpression<false>;
}

export const tryParseExpression = (expression: string): ParsedExpression => {
  try {
    return {
      success: true,
      expression: parseExpression(expression)
    };
  } catch {
    return {
      success: false
    };
  }
};
