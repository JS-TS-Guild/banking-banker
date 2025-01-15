import { BankAccountBalance, BankAccountId, BankId } from '@/types/Common';
import { v4 as uuid } from 'uuid';

class BankAccount {
  private id: BankAccountId;
  private bankId: BankId;
  private balance: BankAccountBalance;

  constructor(bankId: BankId, money: number) {
    this.id = uuid();
    this.bankId = bankId;
    this.balance = money;
  }

  getId() {
    return this.id;
  }

  getBalance() {
    return this.balance;
  }

  getBankId() {
    return this.bankId;
  }

  creditMoney(money: number) {
    this.balance += money;
  }

  debitMoney(
    money: number,
    isNegativeAllowed: boolean,
    currentIndex: number,
    endIndex: number
  ): { balance: number; money: number } {
    if (isNegativeAllowed && currentIndex === endIndex) {
      this.balance -= money;
      money = 0;
    } else if (money > this.balance) {
      money -= this.balance;
      this.balance = 0;
    } else {
      this.balance -= money;
      money = 0;
    }

    return { balance: this.balance, money };
  }
}

export default BankAccount;
