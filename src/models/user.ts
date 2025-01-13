import { v4 as uuid } from 'uuid';

class User {
  private id: string;
  private name: string;
  private accounts: string[];

  constructor(name: string, accounts: string[]) {
    this.id = uuid();
    this.name = name;
    this.accounts = accounts;
  }

  static create(name: string, accounts: string[]) {
    const user = new User(name, accounts);
    return user;
  }
}

export default User;
