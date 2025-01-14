import GlobalRegistry from '@/services/GlobalRegistry';
import { Accounts, UserId, UserName } from '@/types/Common';
import { v4 as uuid } from 'uuid';

class User {
  id: UserId;
  name: UserName;
  accounts: Accounts;

  constructor(name: UserName, accounts: Accounts) {
    this.id = uuid();
    this.name = name;
    this.accounts = accounts;
  }

  static create(name: UserName, accounts: Accounts): User {
    const user = new User(name, accounts);

    GlobalRegistry.addUser(user);
    return user;
  }

  getId() {
    return this.id;
  }
}

export default User;
