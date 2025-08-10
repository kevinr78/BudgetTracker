import TransactionStore from "../store/TransactionStore.js";
import logger from "../utils/logger.js";
function Transaction() {
  this.sortFunc = {
    sortByDateAsc: function (a, b) {
      return new Date(a.date) - new Date(b.date);
    },
    sortByDateDesc: function (a, b) {
      return new Date(b.date) - new Date(a.date);
    },
    sortByAmountAsc: function (a, b) {
      return a.amount - b.amount;
    },
    sortByAmountDesc: function (a, b) {
      return b.amount - a.amount;
    },
  };
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
Transaction.prototype.fetchAllTransactions = function (options, filter) {
  const transactions = TransactionStore.getAll();
  if (transactions.length === 0) {
    logger("info", "No Transactions to show");
    return;
  }

  const filtered = TransactionStore.getByType(options);

  if (filter.length !== 0) {
    const sortKey = `sortBy${filter[1]
      .charAt(0)
      .toUpperCase()}${filter[1].slice(1)}${filter[2]
      .charAt(0)
      .toUpperCase()}${filter[2].slice(1)}`;
    if (this.sortFunc[sortKey]) {
      filtered.sort(this.sortFunc[sortKey]);
    } else {
      console.log("Invalid sort option");
      return;
    }
  }
  filtered.length === 0
    ? console.log("No Transactions")
    : filtered.forEach((t, i) => {
        logger(
          "info",
          `${i + 1}. ${t.type.slice(0, 1).toUpperCase() + t.type.slice(1)} - $${
            t.amount
          } - ${t.description}`
        );
      });
};

export default Transaction;
