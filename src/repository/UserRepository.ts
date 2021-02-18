import { User } from '../models/User';
import { IRepository } from './IRepository';

const userList: Array<User> = [];

export class UserRepository implements IRepository<User>{

    create(user: User): void {
        userList.push(user);
    }

    update(user: User): void {
        const index = userList.findIndex(userItem => userItem.id == user.id)
        userList[index] = { ...user };
    }
    deletee(user: User): void {
        const index = userList.findIndex(userItem => userItem.id == user.id)
        userList.splice(index, 1);
    }
    get(id: number): User {
        return userList.filter(userItem => userItem.id == id)[0]
    }
    getAll(): Array<User>{
        return userList;
    }

    test():void{
      console.log("Denmee");
    }

}
