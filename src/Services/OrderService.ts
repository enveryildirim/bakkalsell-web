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
  //todo fonksiyon bölünecek.
  addProductToOrder(user: User, product: Product, amount: number): void {
    const order = this.orderRepository.getByUserID(user.id);

    if (order) {
      //sipariş var ürün eklenecek
      const cartItem = order.cart.filter(
        cartItem => cartItem.product.id === product.id
      );

      let sumAmount = cartItem.length > 0 ? cartItem[0].amount : 0;
      sumAmount = sumAmount + amount;

      if (sumAmount > product.amount) {
        console.log("istenilen miktar kadar stok yok");
        return;
      }

      if (cartItem.length > 0) {
        //ürün güncelenecek
        cartItem[0].amount = cartItem[0].amount + amount;
      } else {
        //yeni eklenecek ürün
        order.cart.push({ id: 0, product: product, amount: amount });
      }
    } else {
      if (amount > product.amount) {
        console.log("istenilen miktar kadar stok yok");
        return;
      }
      const newOrder = {
        id: 0,
        owner: user,
        name: "denemne",
        cart: [{ product, amount }],
        isSold: false
      };
      this.orderRepository.create(newOrder);
    }
  }

  updateOrderProductAmount(orderID: number, productID: number, amount: number) {
    const orders = this.orderRepository.get(orderID);
    const cartItem = orders.cart.filter(
      item => item.product.id === productID
    )[0];
    cartItem.amount = amount;
  }

  deleteOrder(orderID: number) {
    const order = this.orderRepository.get(orderID);
    this.orderRepository.deletee(order);
  }

  deleteProductFromOrder(id: number, productID: number) {
    const order = this.orderRepository.get(id);
    const index = order.cart.findIndex(
      cartItem => cartItem.product.id === productID
    );
    order.cart.splice(index, 1);
  }

  saleOrder(id: number): void {
    const order = this.orderRepository.get(id);
    order.cart.map(cartItem => {
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
