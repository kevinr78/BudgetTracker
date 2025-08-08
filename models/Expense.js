import Transaction from "./Transaction";

function Expense() {
  Transaction.call(this);
  this.type = "expense";
}

Expense.prototype = Object.create(Transaction.prototype);
Expense.prototype.addExpense = function (type, amount, description) {
  this.parseTransaction(this.type, amount, description);
};

Expense.prototype.fetchTransactions = function (options, filter = null) {
  this.fetchAllTransactions(options, filter);
};

const expense = new Expense();
export { expense };