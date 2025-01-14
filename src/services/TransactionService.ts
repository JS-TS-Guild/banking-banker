import { TransactionId } from '@/types/Common';
import { v4 as uuid } from 'uuid';

class TransactionService {
  private id: TransactionId;

  constructor() {
    this.id = uuid();
  }
}

export default TransactionService;
