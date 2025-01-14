// Bank-related Types and Interfaces
export type BankId = string;
export type BankAccountId = string;
export type BankAccountBalance = number;
export type BankRegistry = Bank[];
export type BankAccountRegistry = BankAccount[];

export interface Bank {
  id: BankId;
}

export interface BankOptions {
  isNegativeAllowed?: boolean;
}

export interface BankAccount {
  id: BankAccountId;
  balance: BankAccountBalance;
}

// User-related Types and Interfaces
export type UserId = string;
export type UserName = string;
export type Accounts = BankAccountId[];
export type UserRegistry = User[];

export interface User {
  id: UserId;
  name: UserName;
  accounts: Accounts;
}

// Transaction-related Types and Interfaces
export type TransactionId = string;
export type TransactionServiceRegistry = Transaction[];

export interface Transaction {
  id: TransactionId;
}
