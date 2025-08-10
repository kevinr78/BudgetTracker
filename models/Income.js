import Transaction from "./Transaction.js";

function Income() {
  Transaction.call(this);
  this.type = "income";
}
Income.prototype = Object.create(Transaction.prototype);

Income.prototype.addIncome = function (type, amount, description) {
  this.parseTransaction(this.type, amount, description);
};

Income.prototype.fetchTransactions = function (options, filter) {
  this.fetchAllTransactions(options, filter);
};

const income = new Income();
export { income };
