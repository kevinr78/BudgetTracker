function sortTransactions(transactions, field, order) {
  const compare = {
    date: {
      asc:  (a, b) => new Date(a.date) - new Date(b.date),
      desc: (a, b) => new Date(b.date) - new Date(a.date),
    },
    amount: {
      asc:  (a, b) => a.amount - b.amount,
      desc: (a, b) => b.amount - a.amount,
    },
  };
    if (compare[field] && compare[field][order]) {
    return [...transactions].sort(compare[field][order]);
  }
  return transactions;
}

export default sortTransactions