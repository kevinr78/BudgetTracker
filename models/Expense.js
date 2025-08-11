import Transaction from "./Transaction.js";

function Expense() {
  Transaction.call(this);
  this.type = "expense";
}

Expense.prototype = Object.create(Transaction.prototype);
Expense.prototype.addExpense = function (type, amount, description) {
  this.parseTransaction(this.type, amount, description);
};



const expense = new Expense();
export { expense };
