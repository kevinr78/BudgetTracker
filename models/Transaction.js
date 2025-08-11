import TransactionStore from "../store/TransactionStore.js";
import {logger} from "../utils/logger.js";
function Transaction() {

}

Transaction.prototype.parseTransaction = function (...line) {
  switch (line[0]) {
    case "income":
    case "expense":
      const valid = this.parseIncomeExpenseTransaction(line);
      if (valid) this.updateTransactionsList(line);
      break;
    case "list":
      this.fetchTransactions();
      break;
    default:
      logger("error", "Unknown command. Try: add, list, exit");
  }
};

Transaction.prototype.updateTransactionsList = function (line) {
  TransactionStore.add({
    type: line[0],
    amount: line[1],
    description: line[2],
  });

  logger(
    "info",
    `✅ Added ${line[0].slice(0, 1).toUpperCase() + line[0].slice(1)}: $${
      line[1]
    } for "${line[2]}"`
  );
};

Transaction.prototype.parseIncomeExpenseTransaction = function (line) {
  if (line[0] !== "income" && line[0] !== "expense") {
    logger("info", "Usage: add [income | expense] [amount] [description]");
    return false;
  }

  if (isNaN(line[1])) {
    logger(
      "info",
      "Second argument should be a valid number\nUsage: add [income | expense] [amount] [description]"
    );
    return false;
  }

  return true;
};




export default Transaction;
