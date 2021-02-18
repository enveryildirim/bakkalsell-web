import { UserRepository } from './src/repository/UserRepository';
import {User} from './src/models/User';
// Import stylesheets
import './style.css';
import { UserType } from './src/models/UserType';
import { UserService } from './src/Services/UserService';
import { ProductRepository } from './src/repository/ProductRepository';
import { ProductService } from './src/Services/ProductService';
import { CartRepository } from './src/repository/CartRepository';
import { OrderRepository } from './src/repository/OrderRepository';
import { CartItem } from './src/models/CartItem';
import { CartService } from './src/Services/CartService';
// Write TypeScript code!


const userRepository =new UserRepository();
const userService = new UserService(userRepository);

const productRepository =new ProductRepository();
const productService=new ProductService(productRepository);

const cartRepository=new CartRepository();
const orderRepository =new OrderRepository();

const cartService = new CartService(cartRepository,productRepository);

const newUser = {id:1,name:"admin",username:"admin",password:"admin",userType:UserType.ADMIN};

const prd={id:0,name:"elma",price:10,amount:600};
const prd2={id:1,name:"armut",price:10,amount:500};
const prd3={id:2,name:"portakal",price:15,amount:100};

productService.createProduct(prd);
productService.createProduct(prd2);
productService.createProduct(prd3);

const crt1={id:0,product:prd,amount:20}
const crt2={product:prd2,amount:20}
const crt3={product:prd3,amount:20}

cartService.addProductToCart(prd,20);
cartService.addProductToCart(prd2,20);
cartService.addProductToCart(prd3,20);


//cartService.deleteProductFromCart(crt1);
//cartRepository.create(crt2);
//cartRepository.create(crt3);

const ordr={name:"sipariş 1",isSold:false,cart:cartRepository.getAll(),owner:newUser};

//orderRepository.create(ordr);

//console.log(cartService.getCart());
cartService.salecartListCart();
console.log(productService.getAllProduct());
console.log(cartService.getCart());

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