export default function (type, message) {
  const timestamp = new Date().toLocaleDateString();
  switch (type) {
    case "info":
      console.info(`[${timestamp}] INFO: ${message}`);
      break;
    case "warn":
      console.warn(`[${timestamp}] WARN: ${message}`);
      break;
    case "error":
      console.error(`[${timestamp}] ERROR: ${message}`);
      break;
    default:
      console.log(`[${timestamp}] LOG: ${message}`);
  }
}

export function printHelpCommands() {
  console.log(`Available commands:
  add [income | expense] [amount] [description] \n
      Example: add income 1000 "Salary for September" \n
      Example: add expense 200 "Groceries" \n
  list [all | income | expense] [filter] \n
      Available filters: date, amount\n
      Sort key must be provided [asc | desc] \n
  Example: list income date asc \n
  Example: list expense amount desc \n
  exit \n
  Example: exit \n`);
  console.log(`\nUse 'help' to see available commands.`);
}
