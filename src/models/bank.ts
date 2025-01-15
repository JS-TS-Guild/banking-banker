import GlobalRegistry from '@/services/GlobalRegistry';
import { BankAccountId, BankId, BankOptions, UserId } from '@/types/Common';
import { v4 as uuid } from 'uuid';
import BankAccount from './bank-account';

class Bank {
  private id: BankId;
  private isNegativeAllowed: boolean;

  constructor(options?: BankOptions) {
    this.id = uuid();
    this.isNegativeAllowed = options?.isNegativeAllowed || false;
  }

  static create(options?: BankOptions) {
    const bank = new Bank(options);
    GlobalRegistry.addBank(bank);
    return bank;
  }

  getId() {
    return this.id;
  }

  createAccount(money: number) {
    const account = new BankAccount(this.id, money);
    GlobalRegistry.addBankAccount(account);
    return account;
  }

  getAccount(accountId: BankAccountId) {
    return GlobalRegistry.getBankAccountByAccountId(accountId);
  }

  ifNegativeAllowed() {
    return this.isNegativeAllowed;
  }

  send(
    senderId: UserId,
    receiverId: UserId,
    amountToBeTransferred: number,
    receiverBankId?: BankId
  ) {
    GlobalRegistry.sendMoney(
      senderId,
      receiverId,
      amountToBeTransferred,
      this.id,
      receiverBankId || this.id
    );
  }
}

export default Bank;
