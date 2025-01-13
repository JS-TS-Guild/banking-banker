import { v4 as uuid } from 'uuid';

class TransactionService {
  private id: string;

  constructor() {
    this.id = uuid();
  }
}

export default TransactionService;
