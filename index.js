import readline from "readline";
import  {logger, printHelpCommands } from "./utils/logger.js";
import { addCommnadHelper } from "./commands/add.js";
import { listCommandHelper } from "./commands/list.js";
import { summaryCommandHelper } from "./commands/summary.js";
import {fileWrite, readUploadfile} from './utils/file.js'

const commandPrompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Budget>",
});


const handleCommands = async function (line) {

  const [command] = line.trim().split(" ");
  switch (command) {
    case 'help':
      printHelpCommands();
      break;
    case 'add':
      addCommnadHelper(line);
      break;
    case 'list':
      listCommandHelper(line);
      break;
    case 'summary':
      summaryCommandHelper(line);
      break;
    case 'exit':
      commandPrompt.close();
      break;
    case 'write':
      await fileWrite();
      break;
    case 'upload':
      readUploadfile();
      break;
    default:
      logger("error", "Unknown command. Try: add, list, exit\n Type 'help' to see list of avaible commands and usage");
      break;
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
  .on("close", async () => {
    console.log("GoodBye");
    process.exit(0);
  });

commandPrompt.prompt();
