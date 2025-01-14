import { BankId, BankOptions } from '@/types/Common';
import { v4 as uuid } from 'uuid';
import BankAccount from './bank-account';

class Bank {
  private id: BankId;
  private isNegativeAllowed?: boolean;

  constructor(options?: BankOptions) {
    this.id = uuid();
    this.isNegativeAllowed = options?.isNegativeAllowed || false;
  }

  static create(options?: BankOptions) {
    const bank = new Bank(options);
    return bank;
  }

  getId() {
    return this.id;
  }

  createAccount(money: number) {
    const account = BankAccount.createAccount(money);
    return account;
  }
}

export default Bank;
