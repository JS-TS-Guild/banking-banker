import { v4 as uuid } from 'uuid';
import BankAccount from './bank-account';

class Bank {
  private id: string;

  constructor() {
    this.id = uuid();
  }

  static create() {
    const bank = new Bank();
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
