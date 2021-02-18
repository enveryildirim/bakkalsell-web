import { UserRepository } from './src/repository/UserRepository';
import {User} from './src/models/User';
// Import stylesheets
import './style.css';
import { UserType } from './src/models/UserType';
// Write TypeScript code!


const userRepository =new UserRepository();
const newUser = {id:1,name:"admin",username:"admin",password:"admin",userType:UserType.ADMIN}
userRepository.create(newUser);
newUser.name="güncellenmiş";
newUser.userType=UserType.CUSTOMER;
userRepository.update(newUser);

console.log(userRepository.getAll());



const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;