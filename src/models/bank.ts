import { BankAccountId, BankId, BankOptions, UserId } from "@/types/Common";
import { v4 as uuid } from "uuid";
import BankAccount from "./bank-account";
import GlobalRegistry from "@/services/GlobalRegistry";
import TransactionService from "@/services/TransactionService";

class Bank {
  private id: BankId;
  isNegativeAllowed?: boolean;

  constructor(options?: BankOptions) {
    this.id = uuid();
    this.isNegativeAllowed = options?.isNegativeAllowed || false;
  }

  static create(options?: BankOptions) {
    const bank = new Bank(options);

    GlobalRegistry.addBank(bank);
    return bank;
  }

  getId() {
    return this.id;
  }

  createAccount(money: number) {
    const account = new BankAccount(this.id, money);
    return account;
  }

  getAccount(accountId: BankAccountId) {
    return GlobalRegistry.getBankAccount(accountId);
  }

  send(
    userId1: UserId,
    userId2: UserId,
    money: number,
    user2OtherBankId?: BankId
  ) {
    const user2AccountIdList = GlobalRegistry.getBankAccountIdsByUserIdAndBankId(userId2, user2OtherBankId || this.id);
    const user2FirstAccount = user2AccountIdList[0];
    
    if(this.isNegativeAllowed){      
      // if negative then 
      // get the first account of sender in this bank
      // get the first account of receiver in this bank/given bank
      // send the money irrespective of balance, which might result in negative balance 

      const user1AccountIdList = GlobalRegistry.getBankAccountIdsByUserIdAndBankId(userId1, this.id);
      const user1FirstAccount = user1AccountIdList[0];
      
      new TransactionService(user1FirstAccount, user2FirstAccount, money)    
    } else {
      // if not negative then 
      // check whether the total balance of all accounts of sender for this bank cover the money
      // if not throw error otherwise continue
      // get all the accounts of sender in this bank
      // get the first account of receiver in this bank/given bank
      // send the money sequentially according to the account order for the user
      
      const user1 = GlobalRegistry.getUser(userId1);
      const user1AccountIds = user1.getAccountIds();
      const user1AccountIdList = GlobalRegistry.getBankAccountIdsByUserIdAndBankId(userId1, this.id);
  
      const user1Accounts = user1AccountIdList.map((accountId: BankAccountId) => {
        return GlobalRegistry.getBankAccount(accountId)
      })

      const totalBalance = user1Accounts.reduce((accumulator: number, account: BankAccount) => {
        return accumulator + account.getBalance()
      }, 0)
      
      if(totalBalance < money){
        throw "Insufficient funds";
      }
  
      for (let i=0; money > 0; i++) {
        const bal = user1Accounts[i].getBalance()
        let amount = bal > money ? money : bal
        new TransactionService(user1Accounts[i].getId(), user2FirstAccount, amount)
        money -= amount
      }
      
    }
  }
}

export default Bank;
