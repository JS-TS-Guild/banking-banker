import { BankId, BankAccountId, UserId } from "@/types/Common";
import type Bank from "@/models/bank";
import type BankAccount from "@/models/bank-account";
import type User from "@/models/user";
import type TransactionService from "./TransactionService";

class GlobalRegistry {
  private static bankRegistry: Bank[] = [];
  private static bankAccountRegistry: BankAccount[] = [];
  private static userRegistry: User[] = [];
  private static transactionServiceRegistry: TransactionService[] = [];

  static addBank(bank: Bank) {
    this.bankRegistry.push(bank);
  }
  static addBankAccount(bankAccount: BankAccount) {
    this.bankAccountRegistry.push(bankAccount);
  }
  static addUser(user: User) {
    this.userRegistry.push(user);
  }
  static addTransaction(transaction: TransactionService) {
    this.transactionServiceRegistry.push(transaction);
  }

  static getBank(bankId: BankId) {
    return this.bankRegistry.filter((bank: Bank) => bank.getId() === bankId)[0];
  }
  static getBankAccount(bankAccountId: BankAccountId) {
    return this.bankAccountRegistry.filter((bankAccount: BankAccount) => bankAccount.getId() === bankAccountId)[0];
  }
  static getUser(userId: UserId) {
    return this.userRegistry.filter((user: User) => user.getId() === userId)[0];
  }

  static getBankAccountIdsByUserIdAndBankId(userId: UserId, bankId: BankId) {
    const user = this.userRegistry.filter((user: User) => user.getId() === userId)[0];
    const userAccountIdList = user.getAccountIds();
    const finalList = userAccountIdList.filter((accountId: BankAccountId) => {
      const account = this.getBankAccount(accountId);
      return account.getBankId() === bankId;
    })

    return finalList
  }

  static clear() {
    this.bankRegistry = [];
    this.bankAccountRegistry = [];
    this.userRegistry = [];
    this.transactionServiceRegistry = [];
  }
}

export default GlobalRegistry;
