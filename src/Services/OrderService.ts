import { CartItem } from "../models/CartItem";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { OrderRepository } from "../repository/OrderRepository";
import { ProductRepository } from "../repository/ProductRepository";

export class OrderService {
  orderRepository: OrderRepository;
  productRepository: ProductRepository;

  constructor(
    ordrRepository: OrderRepository,
    prdctRepository: ProductRepository
  ) {
    this.orderRepository = ordrRepository;
    this.productRepository = prdctRepository;
  }

  addProductToOrder(user: User, product: Product, amount: number): void {
    const result = this.orderRepository.getByUserID(user.id);

    if (result) {
      //sipariş var ürün eklenecek
      const rslt = result.cart.filter(
        cartItem => cartItem.product.id === product.id
      );

      let sumAmount = rslt.length > 0 ? rslt[0].amount : 0;
      sumAmount = sumAmount + amount;
      if (sumAmount > product.amount) {
        console.log("istenilen miktar kadar stok yok");
        return;
      }

      if (rslt.length > 0) {
        //ürün güncelenecek
        rslt[0].amount = rslt[0].amount + amount;
      } else {
        //yeni eklenecek ürün
        result.cart.push({ product: product, amount: amount });
      }
    } else {
      if (amount > product.amount) {
        console.log("istenilen miktar kadar stok yok");
        return;
      }
      const newOrder = {
        owner: user,
        name: "denemne",
        cart: [{ product, amount }]
      };
      this.orderRepository.create(newOrder);
    }
  }

  updateOrderProductAmount(orderID: number, productID: number, amount: number) {
    const orders = this.orderRepository.get(orderID);
    orders.cart.filter(item => item.product.id === productID)[0].amount = amount;
  }

deleteOrder(orderID:number){
  const order=this.orderRepository.get(orderID);
  this.orderRepository.deletee(order);
}
  deleteProductFromOrder(id: number, crtItem: CartItem) {
    //userid ile yapılabilir 
    const orders = this.orderRepository.get(id);
    const index = orders.cart.findIndex(
      cartItem => cartItem.product.id === crtItem.product.id
    );
    orders.cart.splice(index, 1);
  }

  deleteProductFromOrder2(id: number, productID: number) {

    const orders = this.orderRepository.get(id);
    const index = orders.cart.findIndex(
      cartItem => cartItem.product.id === productID
    );
    orders.cart.splice(index, 1);
  }

  saleOrder(id: number): void {
    const orders = this.orderRepository.get(id);
    orders.cart.map(cartItem => {
      cartItem.product.amount = cartItem.product.amount - cartItem.amount;
      this.productRepository.update(cartItem.product);
    });
  }
  getAllOrder(): Array<Order> {
    return this.orderRepository.getAll();
  }

  getOrderByUserID(id: number): Order {
    return this.orderRepository.getByUserID(id);
  }
}
