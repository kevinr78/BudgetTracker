function Transaction() {


  this.sortTransaction = function (isAsc,field){
    
  }
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
      console.log("Unknown command. Try: add, list, exit");
  }
};
Transaction.prototype.updateTransactionsList = function (line) {
  this.transactions.push({
    type: line[0],
    amount: line[1],
    description: line[2],
  });
  console.log(
    `✅ Added ${line[0].slice(0, 1).toUpperCase() + line[0].slice(1)}: $${
      line[1]
    } for "${line[2]}"`
  );
};

Transaction.prototype.parseIncomeExpenseTransaction = function (line) {
  if (line[0] !== "income" && line[0] !== "expense") {
    console.log("Malformed Command");
    console.info("Usage: add [income | expense] [amount] [description]");
    return false;
  }

  if (isNaN(line[1])) {
    console.log("Second argument should be a valid number");
    console.info("Usage: add [income | expense] [amount] [description]");
    return false;
  }

  return true;
};
Transaction.prototype.fetchAllTransactions = function (options, filter) {

  if (this.transactions.length === 0) {
    console.log("No Transactions to show");
    return;
  }
  if (!filter) {
    if (options === "all") {
      this.transactions.forEach((t, i) => {
        console.log(
          `${i + 1}. ${t.type.slice(0, 1).toUpperCase() + t.type.slice(1)} - $${
            t.amount
          } - ${t.description}`
        );
      });
    } else {
      const filtered = this.transactions.filter((t, i) => {
        if (t.type === options) {
          return t
        }
      });

      filtered.length === 0 ?console.log('No Transactions'): filtered.forEach((t, i) => {
        console.log(
          `${i + 1}. ${t.type.slice(0, 1).toUpperCase() + t.type.slice(1)} - $${
            t.amount
          } - ${t.description}`
        );
      });
    }
  }

};
Transaction.prototype.transactions = [];

export default Transaction;
