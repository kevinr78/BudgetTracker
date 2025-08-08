import readline from "readline";
import { income } from "./models/Income";
import { expense } from "./models/Expense";
const commandPrompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Budget>",
});

const handleCommands = function (line) {
  const [command] = line.trim().split(" ");
  debugger
  if (command === "add") {
    const [,type, amount, ...description] =  line.trim().split(" ");
    if (!amount || !type) {
      return;
    }
    debugger
    type === "income"
      ? income.addIncome(type, amount, description)
      : expense.addExpense(type, amount, description);

  } else if (command === "list") {
    const [,options,...filter] = line.trim().split(" ");    
    income.fetchTransactions(options,filter)


  } else if (command === "exit") {
    commandPrompt.close();
  } else {
    console.log("Unknown command. Try: add, list, exit");
  }
};

console.log("\n💰 Welcome to Budget Tracker CLI\n");
commandPrompt.prompt();
commandPrompt
  .on("line", (arg) => {
    handleCommands(arg);
    commandPrompt.prompt();
  })
  .on("close", () => {
    console.log("GoodBye");
    process.exit(0);
  });
