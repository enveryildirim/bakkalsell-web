import { CartItem } from "../models/CartItem";
import { IRepository } from "./IRepository";

const cartList: Array<CartItem> = [];

export class CartRepository implements IRepository<CartItem> {
  create(cartItem: CartItem): void {
    const newID = cartList[cartList.length - 1]
      ? cartList[cartList.length - 1].id + 1
      : 0;
    cartItem.id = newID;
    cartList.push(cartItem);
  }

  update(cartItem: CartItem): void {
    const index = cartList.findIndex(crtItem => crtItem.id == cartItem.id);
    cartList[index] = { ...cartItem };
  }
  deletee(cartItem: CartItem): void {
    const index = cartList.findIndex(crtItem => crtItem.id == cartItem.id);
    cartList.splice(index, 1);
  }
  get(id: number): CartItem {
    const result = cartList.filter(crtItem => crtItem.id == id);
    return result.length > 0 ? result[0] : undefined;
  }
  getAll(): Array<CartItem> {
    return cartList;
  }
  getCartItemByProductID(id: number): CartItem {
    const result = cartList.filter(crtItem => crtItem.product.id == id);
    return result.length > 0 ? result[0] : undefined;
  }
  clearCart():void{
    cartList.splice(0,cartList.length);
  }
}
