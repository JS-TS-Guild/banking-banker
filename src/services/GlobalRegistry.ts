import type Bank from '@/models/bank';
import BankAccount from '@/models/bank-account';
import User from '@/models/user';
import { BankAccountId, BankId, UserId } from '@/types/Common';
import type TransactionService from './TransactionService';

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

  // static addTransaction(transaction: Transaction) {
  //   this.transactionServiceRegistry.push(transaction);
  // }

  static getBankAccountByAccountId(accountId: BankAccountId) {
    const account = this.bankAccountRegistry.find(
      (account: BankAccount) => account.getId() === accountId
    );

    return account;
  }

  static getBankAccountsByUserIdAndBankId(userId: UserId, bankId: BankId) {
    const user = this.userRegistry.find(
      (user: User) => user.getId() === userId
    );
    const accounts = this.bankAccountRegistry.filter(
      (account: BankAccount) =>
        account.getBankId() === bankId &&
        user
          .getAccounts()
          .find(
            (userAccountId: BankAccountId) => account.getId() === userAccountId
          ) !== undefined
    );

    return accounts;
  }

  static sendMoney(
    senderId: UserId,
    receiverId: UserId,
    amountToBeTransferred: number,
    senderBankId: BankId,
    receiverBankId: BankId
  ) {
    const senderBank = this.bankRegistry.find(
      (bank: Bank) => bank.getId() === senderBankId
    );

    const senderAccounts = this.getBankAccountsByUserIdAndBankId(
      senderId,
      senderBankId
    );

    if (!senderBank.ifNegativeAllowed()) {
      if (
        senderAccounts.reduce((acc, curr) => (acc += curr.getBalance()), 0) <
        amountToBeTransferred
      ) {
        throw 'Insufficient funds';
      }
    }

    let transferAmount = amountToBeTransferred;

    senderAccounts.some((account: BankAccount, index) => {
      if (transferAmount === 0) return true;
      const currentStatus = account.debitMoney(
        transferAmount,
        senderBank.ifNegativeAllowed(),
        index,
        senderAccounts.length - 1
      );
      transferAmount = currentStatus.money;
      return false;
    });

    const receiverAccounts = this.getBankAccountsByUserIdAndBankId(
      receiverId,
      receiverBankId
    );

    receiverAccounts[0].creditMoney(amountToBeTransferred);
  }

  static clear() {
    this.bankRegistry = [];
    this.bankAccountRegistry = [];
    this.userRegistry = [];
    this.transactionServiceRegistry = [];
  }
}

export default GlobalRegistry;

declare global {
  interface Array<T> {
    find(
      callback: (element: T, index: number, array: T[]) => boolean
    ): T | undefined;
  }
}

Array.prototype.find = function <T>(
  callback: (element: T, index: number, array: T[]) => boolean
): T | undefined {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};
