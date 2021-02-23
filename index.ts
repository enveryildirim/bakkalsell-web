import './style.css';
import './css/global.css';
import './css/main.css';
import './css/mobile.css';

import { UserType } from './src/models/UserType';
import { UserRepository } from './src/repository/UserRepository';
import { UserService } from './src/Services/UserService';
import { ProductRepository } from './src/repository/ProductRepository';
import { ProductService } from './src/Services/ProductService';
import { CartRepository } from './src/repository/CartRepository';
import { OrderRepository } from './src/repository/OrderRepository';
import { CartItem } from './src/models/CartItem';
import { CartService } from './src/Services/CartService';
import { OrderService } from './src/Services/OrderService';
import { Router } from './src/routing/Router';
import { IPage } from './src/routing/IPage';
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



const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

const cartRepository = new CartRepository();
const orderRepository = new OrderRepository();

const cartService = new CartService(cartRepository, productRepository);
const orderService = new OrderService(orderRepository,productRepository);


//Geliştime içiçn kullanılan Test Verileri eklenmesi
const adminUser = { id: 1, name: "admin", username: "adminadmin", password: "adminadmin", userType: UserType.ADMIN };
const employeeUser = { id: 2, name: "kasiyer", username: "useruser", password: "useruser", userType: UserType.EMPLOYEE };
const customerUser = { id: 3, name: "customer", username: "customer", password: "customer", userType: UserType.CUSTOMER };

userService.createUser(adminUser);
userService.createUser(employeeUser);
userService.createUser(customerUser);

const prdct = { id: 0, name: "elma", price: 10, amount: 600 };
const prdct2 = { id: 1, name: "armut", price: 10, amount: 500 };
const prdct3 = { id: 2, name: "portakal", price: 15, amount: 100 };

productService.createProduct(prdct);
productService.createProduct(prdct2);
productService.createProduct(prdct3);


const crt1 = { id: 0, product: prdct, amount: 20 }
const crt2 = { id: 1, product: prdct2, amount: 20 }
const crt3 = { id: 2, product: prdct3, amount: 20 }
//sepet verisi eklenmesi
cartService.addProductToCart(prdct, 12);

//sipariş veri eklenmesi
orderService.addProductToOrder(customerUser, prdct, 10);
orderService.addProductToOrder(customerUser, prdct, 111);
orderService.addProductToOrder(customerUser, prdct2, 21);
orderService.addProductToOrder(customerUser, prdct3, 51);


/*Routin Ayarlamalrı */
/*Page sınıflarının  Routera eklenmesi */
const homePage: IPage = new HomePage();
const customerOrderList: IPage = new CustomerOrderListPage();
const productListPage: IPage = new ProductListPage();

Router.insertPage(homePage, 'home');
Router.insertPage(customerOrderList, "customerorderlist");
Router.insertPage(productListPage, "producteditlist")

/*Containerlar sınıflarının Router'a eklenmesi */
const loginContainer: IPage = new LoginContainer(userService);
const userActionsContainer: IPage = new UserActionsContainer(userService);
const cartContainer: IPage = new CartContainer(cartService, userService, orderService);
const productContainer: IPage = new ProductContainer(productService, cartService);
const customerOrderContainer: IPage = new CustomerOrderContainer(orderService, userService);
const productEditListContainer: IPage = new ProductEditListContainer(productService);
const productActionContainer: IPage = new ProductActionsContainer(productService);

Router.insertPage(loginContainer, 'con_login');
Router.insertPage(userActionsContainer, "con_useractions");
Router.insertPage(cartContainer, "con_cart")
Router.insertPage(productContainer, "con_product");
Router.insertPage(customerOrderContainer, "con_customer_order");
Router.insertPage(productEditListContainer, "con_product_edit_list");
Router.insertPage(productActionContainer, "con_product_actions");

Router.render("home");
