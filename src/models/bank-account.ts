import GlobalRegistry from '@/services/GlobalRegistry';
import { BankAccountBalance, BankAccountId, BankId, TransactionId } from '@/types/Common';
import { v4 as uuid } from 'uuid';

class BankAccount {
  private id: BankAccountId;
  private bankId: BankId;
  private balance: BankAccountBalance;

  constructor(bankId: BankId, money: number) {
    this.id = uuid();
    this.bankId = bankId;
    this.balance = money;

    GlobalRegistry.addBankAccount(this);
  }

  getId() {
    return this.id;
  }
  getBankId() {
    return this.bankId;
  }
  getBalance() {
    return this.balance;
  }
  
  creditAccount(money: number){
    this.balance += money;
  }
  debitAccount(money: number){
    this.balance -= money;
  }
}

export default BankAccount;
