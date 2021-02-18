import { User } from "../models/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
  userRepository: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }
  createUser(user: User): void {
    //model valid mi şeklinde kontrol ediluserService.createUser(newUser);iecek
    this.userRepository.create(user);
    console.log(this.userRepository.getAll());
  }

  updateUser(user: User): void {
    //validation işlemleri
    this.userRepository.update(user);
  }

  deleteUser(user: User): void {
    this.userRepository.deletee(user);
  }

  getUserById(id: number): User {
    return this.userRepository.get(id);
  }

  getAllUser(): Array<User> {
    return this.userRepository.getAll();
  }

  login(username: string, password: string): boolean {
    //validation
    const loggedUser = this.userRepository.login(username, password);
    this.userRepository.setLoggedUser(loggedUser);
    if (loggedUser) {
      return true;
    } else {
      return false;
    }
  }

  logout():void{
    this.userRepository.setLoggedUser(undefined);
  }

  getLoggedUser():User{
    return this.userRepository.getLoggedUser();
  }
}
