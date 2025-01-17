import GlobalRegistry from '@/services/GlobalRegistry';
import { BankAccountId, UserId, UserName } from '@/types/Common';
import { v4 as uuid } from 'uuid';

class User {
  private id: UserId;
  private name: UserName;
  private accountIds: BankAccountId[];

  constructor(name: UserName, accounts: BankAccountId[]) {
    this.id = uuid();
    this.name = name;
    this.accountIds = accounts;
  }

  static create(name: UserName, accounts: BankAccountId[]): User {
    const user = new User(name, accounts);

    GlobalRegistry.addUser(user);
    return user;
  }

  getId() {
    return this.id;
  }

  getAccountIds() {
    return this.accountIds;
  }
}

export default User;
