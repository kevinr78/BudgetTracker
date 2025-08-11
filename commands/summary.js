import TransactionStore from "../store/TransactionStore.js";
import {logger} from "../utils/logger.js";
export const summary = function () {
  let summary = TransactionStore.getAll().reduce(
    (acc, curr) => {
      acc[curr.type] += parseFloat(curr.amount);
      return acc;
    },
    { income: 0, expense: 0 }
  );
  summary["total"] = summary.income - summary.expense;

  return summary;
};

export const summaryCommandHelper = function () {
  const summaryDetails = summary();
  logger(
    "info",
    `
          \tSummary:\n
          Income: $${summaryDetails.income}
          Expense: $${summaryDetails.expense}
          Total: $${
            summaryDetails.total > 0
              ? summaryDetails.total
              : "-" + summaryDetails.total
          }
        `
  );
};
