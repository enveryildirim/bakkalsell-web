import { User } from '../models/User';
import { IRepository } from './IRepository';

const userList: Array<User> = [];
let loggedUser:User =undefined;
export class UserRepository implements IRepository<User>{

  create(user: User): void {
    const newID = userList[userList.length - 1] ? userList[userList.length - 1].id + 1 : 0;
    user.id = newID;
    userList.push(user);

  }

  update(user: User): void {
    const index = userList.findIndex(userItem => userItem.id == user.id)
    userList[index] = { ...user };
  }
  deletee(user: User): void {
    const index = userList.findIndex(userItem => userItem.id == user.id);
    userList.splice(index, 1);
  }
  get(id: number): User {
    const result = userList.filter(userItem => userItem.id == id);
    return result.length > 0 ? result[0] : undefined;
  }
  getAll(): Array<User> {
    return userList;
  }

  getLoggedUser(): User {
    return loggedUser;
  }

  setLoggedUser(user:User):void{
    loggedUser=user;
  }

}
