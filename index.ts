import { UserRepository } from './src/repository/UserRepository';
import {User} from './src/models/User';
// Import stylesheets
import './style.css';
import './css/global.css';
import './css/main.css';
import './css/mobile.css';

import { UserType } from './src/models/UserType';
import { UserService } from './src/Services/UserService';
import { ProductRepository } from './src/repository/ProductRepository';
import { ProductService } from './src/Services/ProductService';
import { CartRepository } from './src/repository/CartRepository';
import { OrderRepository } from './src/repository/OrderRepository';
import { CartItem } from './src/models/CartItem';
import { CartService } from './src/Services/CartService';
import { OrderService } from './src/Services/OrderService';
import { Router } from './src/routing/Router';
import { Login } from './src/routing/Login';
import { Home } from './src/routing/Home';
import { IPage } from './src/routing/IPage';
import { UserCreatePage } from './src/routing/UserCreatePage';
import { HomePage } from './src/pages/HomePage';
import { LoginContainer } from './src/container/LoginContainer';
import { UserActionsContainer } from './src/container/UserActionsContainer';
import { CartContainer } from './src/container/CartContainer';
import { ProductContainer } from './src/container/ProductContainer';
import { CustomerOrderListPage } from './src/pages/CustomerOrderListPage';
import { CustomerOrderContainer } from './src/container/CustomerOrderContainer';
import { ProductListPage } from './src/pages/ProductListPage';
import { ProductEditListContainer } from './src/container/ProductEditListContainer';
import { ProductActionsContainer } from './src/container/ProductActionsContainer';



const userRepository =new UserRepository();
const userService = new UserService(userRepository);

const productRepository =new ProductRepository();
const productService=new ProductService(productRepository);

const cartRepository=new CartRepository();
const orderRepository =new OrderRepository();

const cartService = new CartService(cartRepository,productRepository);
const orderService = new OrderService(orderRepository);

const newUser = {id:1,name:"admin",username:"adminadmin",password:"adminadmin",userType:UserType.ADMIN};
const newUser2 = {id:2,name:"kasiyer",username:"useruser",password:"useruser",userType:UserType.EMPLOYEE};
const newUser3 = {id:3,name:"customer",username:"customer",password:"customer",userType:UserType.CUSTOMER};
userService.createUser(newUser);
userService.createUser(newUser2);
userService.createUser(newUser3);

//console.log(userService.getAllUser());

const prd={id:0,name:"elma",price:10,amount:600};
const prd2={id:1,name:"armut",price:10,amount:500};
const prd3={id:2,name:"portakal",price:15,amount:100};

productService.createProduct(prd);
productService.createProduct(prd2);
productService.createProduct(prd3);

//console.log(productService.getAllProduct());

const crt1={id:0,product:prd,amount:20}
const crt2={id:1,product:prd2,amount:20}
const crt3={id:2,product:prd3,amount:20}

cartService.addProductToCart(prd,12);
//console.log(cartService.getCart());`


orderService.addProductToOrder(newUser3,prd,10);
orderService.addProductToOrder(newUser3,prd,111);
orderService.addProductToOrder(newUser3,prd2,21);
orderService.addProductToOrder(newUser3,prd3,51);

//orderService.deleteProductFromOrder(0,{product:prd2,amount:10});



//console.log(orderService.getAllOrder());
/*
cartService.addProductToCart(prd,20);
cartService.addProductToCart(prd2,20);
cartService.addProductToCart(prd3,50);
cartService.addProductToCart(prd3,49);


//cartService.deleteProductFromCart(crt1);
//cartRepository.create(crt2);
//cartRepository.create(crt3);

const ordr={name:"sipariş 1",isSold:false,cart:cartRepository.getAll(),owner:newUser};

//orderRepository.create(ordr);

//console.log(cartService.getCart());
cartService.saleCart();
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

/*Routin Ayarlamalrı */


/*Page''ler */
const homePage:IPage = new HomePage();
const customerOrderList:IPage = new CustomerOrderListPage();
const productListPage:IPage = new ProductListPage();

Router.insertPage(homePage,'home');
Router.insertPage(customerOrderList,"customerorderlist");
Router.insertPage(productListPage,"producteditlist")

/*Containerlar */
const loginContainer:IPage =new LoginContainer(userService);
const userActionsContainer : IPage = new UserActionsContainer(userService);
const cartContainer :IPage = new CartContainer(cartService,userService,orderService);
const productContainer :IPage = new ProductContainer(productService,cartService);
const customerOrderContainer:IPage=new CustomerOrderContainer(orderService,userService);
const productEditListContainer:IPage = new ProductEditListContainer(productService);
const productActionContainer:IPage = new ProductActionsContainer(productService);

Router.insertPage(loginContainer,'con_login');
Router.insertPage(userActionsContainer,"con_useractions");
Router.insertPage(cartContainer,"con_cart")
Router.insertPage(productContainer,"con_product");
Router.insertPage(customerOrderContainer,"con_customer_order");
Router.insertPage(productEditListContainer,"con_product_edit_list");
Router.insertPage(productActionContainer,"con_product_actions");

//userService.login("adminadmin","adminadmin");

Router.render("home");
//Router.insertPage(usrr);
//userService.setPage(0);

/*
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>
 <button type="submit" id="button" class="btn btn-block btn-primary">Giriş Yap</button>
 <input type="button" value="Click" id="coolbutton"></input>`;

*/

/*
let btn:HTMLButtonElement = document.getElementById("enver");
    btn?.addEventListener("click", (e:Event) => console.log("asdasd"));

  const button = document.querySelector("button");
// optional chaining
button?.addEventListener("click", handleClick);

function handleClick() {
    console.log("Clicked!");
    Router.render(1)
    //this.removeEventListener("click", handleClick);
}*/

   let pusheditems: { [id: string]: any; } = {};    // dictionary with key of string, and values of type any
    pusheditems["a"] =10; 

//console.log(pusheditems["a"]);