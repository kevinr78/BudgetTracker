import { income } from "../models/Income.js";
import { expense } from "../models/Expense.js";

export const addCommnadHelper = function(command){

  const [, type, amount, ...description] = command.trim().split(" ");
  let cleanedDescription = description.join(" ").replace(/"/g, "").trim(); // Remove quotes from description
  if (!amount || !type) {
    return;
  }
  type === "income"
    ? income.addIncome(type, amount, cleanedDescription)
    : expense.addExpense(type, amount, cleanedDescription);
}