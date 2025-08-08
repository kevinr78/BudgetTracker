import Transaction from "./Transaction";

function Income() {
  Transaction.call(this);
  this.type = "income";
}
Income.prototype = Object.create(Transaction.prototype);

Income.prototype.addIncome = function (type, amount, description) {
  debugger;
  this.parseTransaction(this.type, amount, description);
};

Income.prototype.fetchTransactions = function (options, filter = null) {
    this.fetchAllTransactions(options, filter=null);
};


const income = new Income();
export { income };
