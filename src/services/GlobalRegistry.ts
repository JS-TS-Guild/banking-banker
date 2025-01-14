import {
  Bank,
  BankAccount,
  BankAccountRegistry,
  BankRegistry,
  Transaction,
  TransactionServiceRegistry,
  User,
  UserRegistry,
} from '@/types/Common';

class GlobalRegistry {
  private static bankRegistry: BankRegistry = [];
  private static bankAccountRegistry: BankAccountRegistry = [];
  private static userRegistry: UserRegistry = [];
  private static transactionServiceRegistry: TransactionServiceRegistry = [];

  static addBank(bank: Bank) {
    this.bankRegistry.push(bank);
  }

  static addBankAccount(bankAccount: BankAccount) {
    this.bankAccountRegistry.push(bankAccount);
  }

  static addUser(user: User) {
    this.userRegistry.push(user);
  }

  static addTransaction(transaction: Transaction) {
    this.transactionServiceRegistry.push(transaction);
  }

  static clear() {
    this.bankRegistry = [];
    this.bankAccountRegistry = [];
    this.userRegistry = [];
    this.transactionServiceRegistry = [];
  }
}

export default GlobalRegistry;
