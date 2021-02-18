import { User } from "../models/User";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
  userRepository: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo;
  }
  createUser(user: User): void {
    if (this.isValid(user)) {
      this.userRepository.create(user);
    } else {
      console.log("User tipi valid değil !!!");
    }
  }

  updateUser(user: User): void {
    if (this.isValid(user)) {
      this.userRepository.update(user);
    } else {
      console.log("User tipi valid değil !!!");
    }
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
    if (
      username.length < 5 ||
      password.length < 6 ||
      username === undefined ||
      password === undefined
    ) {
      return false;
    }
    const loggedUser = this.userRepository.login(username, password);
    this.userRepository.setLoggedUser(loggedUser);
    if (loggedUser) {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.userRepository.setLoggedUser(undefined);
  }

  getLoggedUser(): User {
    return this.userRepository.getLoggedUser();
  }

  isValid(user: User): boolean {
    let isValid: boolean = true;

    if (
      user.name === undefined ||
      user.username === undefined ||
      user.password === undefined ||
      user.userType === undefined
    ) {
      isValid = false;
    }

    if (
      user.username.length < 5 ||
      user.password.length < 6 ||
      user.name.length === 0
    ) {
      isValid = false;
    }

    return isValid;
  }
}
