import { BankAccountId, TransactionId } from '@/types/Common';
import { v4 as uuid } from 'uuid';
import GlobalRegistry from './GlobalRegistry';

class TransactionService {
  private id: TransactionId;
  private senderAccountId: BankAccountId;
  private receiverAccountId: BankAccountId;
  private amount: number;

  constructor(senderAccountId: BankAccountId, receiverAccountId: BankAccountId, money: number) {
    this.id = uuid();
    this.senderAccountId = senderAccountId
    this.receiverAccountId = receiverAccountId
    this.amount = money;

    GlobalRegistry.addTransaction(this)

    const acc1 = GlobalRegistry.getBankAccount(senderAccountId)
    const acc2 = GlobalRegistry.getBankAccount(receiverAccountId)

    acc1.debitAccount(money)
    acc2.creditAccount(money)
  }
}

export default TransactionService;
