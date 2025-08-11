import path from "path";
import fsPromises from "node:fs/promises";
import TransactionStore from "../store/TransactionStore.js";
import { join } from "node:path";
import { logger } from "./logger.js";

const basePath = path.join(process.cwd(), "data");
const baseUploadsPath = path.join(process.cwd(), "data", "upload");
const fileDownloadPath = path.join(basePath, "data.txt");
const extensionMap = {
  csv: ",",
  txt: "-",
};
const fileWrite = async function () {
  try {
    await fsPromises.mkdir(baseUploadsPath, { recursive: true });
    const transactions = TransactionStore.getAll()
      .map((transaction) => {
        return `${
          transaction.type.slice(0, 1).toUpperCase() + transaction.type.slice(1)
        } - $${transaction.amount} - ${transaction.description}`;
      })
      .join("\n");

    await fsPromises.writeFile(
      fileDownloadPath,
      "Type - Amount - Description\n" + transactions + "\n",
      "utf-8"
    );
  } catch (error) {
    return;
  }
};

const readUploadfile = async function () {
  try {
    const files = await fsPromises.readdir(baseUploadsPath);
    for (const file of files) {
      readFileData(file);
    }
  } catch (error) {}
};

const readFileData = async function (fileName) {
  const extension = path.extname(fileName).slice(1);
  try {
    const file = await fsPromises.open(join(baseUploadsPath, fileName));
    for await (const line of file.readLines()) {
      const [type, amount, description] = line.split(extensionMap[extension]);
      if (type.toLocaleLowerCase() === "type") {
        continue;
      }
      if (
        type.toLocaleLowerCase() === "income" ||
        type.toLocaleLowerCase() === "expense"
      ) {
        if (!isNaN(amount.slice(1))) {
          TransactionStore.add({
            type,
            amount: amount.charAt(0) === "$" ? amount.slice(1) : amount,
            description,
          });
        }
      }
      logger("info", "File Read Succesfull");
    }
  } catch (error) {
    logger("error", "Error while reading file");
  }
};
export { fileWrite, readUploadfile };
