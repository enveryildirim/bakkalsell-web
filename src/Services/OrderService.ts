import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";
import { OrderRepository } from "../repository/OrderRepository";


export class OrderService {
  orderRepository: OrderRepository;
  constructor(ordrRepository: OrderRepository) {
    this.orderRepository = ordrRepository;
  }

  addProductToOrder(user: User, product: Product, amount: number): void {
    const result = this.orderRepository.getByUserID(user.id);
   
    if (result) {
      //sipariş var ürün eklenecek
      const rslt = result.cart.filter(
        cartItem => cartItem.product.id === product.id
      );
     
      let sumAmount = rslt.length>0 ? rslt[0].amount : 0;
      sumAmount = sumAmount + amount;
      if (sumAmount > product.amount) {
        console.log("istenilen miktar kadar stok yok");
        return;
      }

      if (rslt.length>0) {
        //ürün güncelenecek
        rslt[0].amount = rslt[0].amount + amount;
       
        
      } else {
        //yeni eklenecek ürün
        result.cart.push({product:product,amount:amount});
      }
    }
    else{
        if(amount>product.amount){
          console.log("istenilen miktar kadar stok yok");
          return;
        }
        const newOrder={owner:user,name:"denemne",cart:[{product,amount}]};
        this.orderRepository.create(newOrder);
    }
  }

  getAllOrder():Array<Order>{
  return this.orderRepository.getAll();
  }
}
