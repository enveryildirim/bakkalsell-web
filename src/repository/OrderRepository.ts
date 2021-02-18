import { Order } from "../models/Order";
import { IRepository } from "./IRepository";

const orderList: Array<Order> = [];

export class OrderRepository implements IRepository<Order> {
  create(order: Order): void {
    const newID = orderList[orderList.length - 1]
      ? orderList[orderList.length - 1].id + 1
      : 0;
    order.id = newID;
    orderList.push(order);
  }

  update(order: Order): void {
    const index = orderList.findIndex(ordrItem => ordrItem.id == order.id);
    orderList[index] = { ...order };
  }
  deletee(order: Order): void {
    const index = orderList.findIndex(ordrItem => ordrItem.id == order.id);
    orderList.splice(index, 1);
  }
  get(id: number): Order {
    const result = orderList.filter(ordrItem => ordrItem.id == id);
    return result.length > 0 ? result[0] : undefined;
  }
  getAll(): Array<Order> {
    return orderList;
  }
}
