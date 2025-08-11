import Transaction from "../models/Transaction.js";

export default {
  transactions: [],
  add(transaction) {
    this.transactions.push({ ...transaction, date: new Date().toISOString() });
  },
  getAll() {
    return this.transactions;
  },
  getByType(type) {
    return this.transactions.filter((t) => t.type === type);
  },
  filterTransactions(option){
    return option === 'all' ? [...this.transactions]: this.transactions
    .filter(t => t.type === option)
  }
};
