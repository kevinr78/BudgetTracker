function logger(type, message) {
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

function printHelpCommands() {
  
  console.log(`Available commands:
    Command: add [income | expense] [amount] [description] \n
      Example: add income 1000 "Salary for September"
      Example: add expense 200 "Groceries"\n
    Command: list [all | income | expense] [filter] \n
      Available filters: date, amount
      Sort key must be provided [asc | desc]
      Example: list income --sort date asc
      Example: list expense --sort amount desc
      Example: list all --sort amount asc\n
    Command: summary
      Example: summary\n
    Command: write - Writes a data to a file
      Example: write\n
    Command: exit
      Example: exit \n
    To upload existing Transactions from a file. Place File in the following path
      Path: /data/upload/<filename>.{csv,txt}
      Header/Data Format: Type - Amount - Description
      Amount Defaults to '$'
      Key Points to remember
        1. All file types should include headers
        2. For CSV, currently only csv extension is supported
        3. Text files should be delimited/separated by '-'      
      `);
  console.log(`\nUse 'help' to see available commands.`);
}

function logTransactions(transactions) {
  transactions.forEach((transaction) => {
    logger(
      "info",
      `${
        transaction.type.slice(0, 1).toUpperCase() + transaction.type.slice(1)
      } - $${transaction.amount} - ${transaction.description}`
    );
  });
}


export { logTransactions,printHelpCommands,logger}