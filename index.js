import readline from "readline";
import logger, { printHelpCommands } from "./utils/logger.js";
import { income } from "./models/Income.js";
import { expense } from "./models/Expense.js";
import TransactionStore from "./store/TransactionStore.js";

const commandPrompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Budget>",
});

const handleCommands = function (line) {
  const [command] = line.trim().split(" ");
  if (command === "help") {
    printHelpCommands();
    return;
  }
  if (command === "add") {
    const [, type, amount, ...description] = line.trim().split(" ");
    let cleanedDescription = description.join(" ").replace(/"/g, "").trim(); // Remove quotes from description
    if (!amount || !type) {
      return;
    }
    type === "income"
      ? income.addIncome(type, amount, cleanedDescription)
      : expense.addExpense(type, amount, cleanedDescription);
  } else if (command === "list") {
    const [, options, ...filter] = line.trim().split(" ");
    if (!options) {
      logger("info", "Usage: list [all | income | expense]");
      return;
    }
    if (options === "all") {
      TransactionStore.getAll().forEach((transaction) => {
        logger(
          "info",
          `${
            transaction.type.slice(0, 1).toUpperCase() +
            transaction.type.slice(1)
          } - $${transaction.amount} - ${transaction.description}`
        );
      });
      return;
    }
    options === "income"
      ? income.fetchTransactions("income", filter)
      : expense.fetchTransactions("expense", filter);
  } else if (command === "exit") {
    commandPrompt.close();
  } else {
    logger("error", "Unknown command. Try: add, list, exit");
  }
};

console.log("\n💰 Welcome to Budget Tracker CLI\n");
console.log("Use 'help' to see available commands.\n");
commandPrompt
  .on("line", (arg) => {
    const trimmed = arg.trim();
    if (trimmed) {
      handleCommands(trimmed);
    }
    commandPrompt.prompt();
  })
  .on("close", () => {
    console.log("GoodBye");
    process.exit(0);
  });

commandPrompt.prompt();
