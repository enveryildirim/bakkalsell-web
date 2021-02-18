import { UserRepository } from './src/repository/UserRepository';
import {User} from './src/models/User';
// Import stylesheets
import './style.css';
import { UserType } from './src/models/UserType';
import { UserService } from './src/Services/UserService';
import { ProductRepository } from './src/repository/ProductRepository';
import { ProductService } from './src/Services/ProductService';
// Write TypeScript code!


const userRepository =new UserRepository();
const userService = new UserService(userRepository);

const productRepository =new ProductRepository();
const productService=new ProductService(productRepository);

const prd={name:"elma",price:10,amount:600};
const prd2={name:"armut",price:0,amount:500};
const prd3={name:"gfhjghj",price:15,amount:100};

productService.createProduct(prd);
productService.createProduct(prd);
productService.createProduct(prd2);
productService.createProduct(prd3);




console.log(productService.getAllProduct());


/*
const newUser = {id:1,name:"admin",username:"admin",password:"admin",userType:UserType.ADMIN};
const newUser2 = {id:1,name:"EMPLOYEE",username:"EMPLOYEE",password:"EMPLOYEE",userType:UserType.EMPLOYEE};
const newUser3 = {id:1,name:"CUSTOMER",username:"CUSTOMER",password:"CUSTOMER",userType:UserType.CUSTOMER};

//userRepository.create(newUser);
//userRepository.create(newUser2);
//userRepository.create(newUser3);
userService.createUser(newUser);
userService.createUser(newUser2);
userService.createUser(newUser3);

newUser.name="güncellenmiş";
newUser.userType=UserType.CUSTOMER;
//userRepository.update(newUser);

//userRepository.deletee(newUser3);

console.log(userRepository.getAll());

*/

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;