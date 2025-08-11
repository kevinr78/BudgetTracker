import sortTransactions from "../utils/sort.js";
import TransactionStore from "../store/TransactionStore.js";
import {logTransactions} from "../utils/logger.js";

export const listCommandHelper = function(command){
  const [, options, ...filter] = command.trim().split(" ");
    if (!options) {
      logger("info", "Usage: list [all | income | expense]");
      return;
    }

    const transactions = TransactionStore.filterTransactions(options);
    if(filter.length >=2 ){
      const [,field, order] = filter;
      logTransactions(sortTransactions(transactions,field,order));
    }else{
      logTransactions(transactions);
    }
}