// Bank-related Types and Interfaces
export type BankId = string;
export type BankAccountId = string;
export type BankAccountBalance = number;

export interface BankOptions {
  isNegativeAllowed?: boolean;
}

// User-related Types and Interfaces
export type UserId = string;
export type UserName = string;

// Transaction-related Types and Interfaces
export type TransactionId = string;
