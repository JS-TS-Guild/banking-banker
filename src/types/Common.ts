// Bank-related Types and Interfaces
export type BankId = string;

export interface BankOptions {
  isNegativeAllowed?: boolean;
}

// BankAccount-related Types and Interfaces
export type BankAccountId = string;
export type BankAccountBalance = number;

// User-related Types and Interfaces
export type UserId = string;
export type UserName = string;
export type Accounts = BankAccountId[];

// Transaction-related Types and Interfaces
export type TransactionId = string;
