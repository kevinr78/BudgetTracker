import path from "path";
import fsPromises from "node:fs/promises";
import TransactionStore from "../store/TransactionStore.js";

const fileWrite = async function () {
  const basePath = path.join(process.cwd(), "data");
  const filePath = path.join(basePath, "data.txt");
  console.log(filePath)
  try {
    await fsPromises.mkdir(basePath,{recursive:true});
    const transactions =  TransactionStore.getAll().map(transaction => {
      return `${
        transaction.type.slice(0, 1).toUpperCase() + transaction.type.slice(1)
      } - $${transaction.amount} - ${transaction.description}`
    }).join('\n');

    await fsPromises.writeFile(filePath,'Type - Amount - Description\n'+ transactions+'\n','utf-8');
    
  } catch (error) {
    if (error.code === "ENOENT") {
      await fsPromises.mkdir(basePath,{recursive:true});
    }
  }
};



export { fileWrite };
