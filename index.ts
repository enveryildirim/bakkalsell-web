import { UserRepository } from './src/repository/UserRepository';
import {User} from './src/models/User';
// Import stylesheets
import './style.css';
import { UserType } from './src/models/UserType';
// Write TypeScript code!


const userRepository =new UserRepository();
const newUser = {id:1,name:"admin",username:"admin",password:"admin",userType:UserType.ADMIN};
const newUser2 = {id:1,name:"EMPLOYEE",username:"EMPLOYEE",password:"EMPLOYEE",userType:UserType.EMPLOYEE};
const newUser3 = {id:1,name:"CUSTOMER",username:"CUSTOMER",password:"CUSTOMER",userType:UserType.CUSTOMER};

userRepository.create(newUser);
userRepository.create(newUser2);
userRepository.create(newUser3);

newUser.name="güncellenmiş";
newUser.userType=UserType.CUSTOMER;
//userRepository.update(newUser);

//userRepository.deletee(newUser3);

console.log(userRepository.get(0));



const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;