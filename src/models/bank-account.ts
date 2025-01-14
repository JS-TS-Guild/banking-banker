import { BankAccountBalance, BankAccountId } from '@/types/Common';
import { v4 as uuid } from 'uuid';

class BankAccount {
  private id: BankAccountId;
  private balance: BankAccountBalance;

  constructor(money: number) {
    this.id = uuid();
    this.balance = money;
  }

  static createAccount(money: number) {
    const account = new BankAccount(money);
    return account;
  }

  getId() {
    return this.id;
  }
}

export default BankAccount;
