import { User } from "./User";
import { CartItem } from "./CartItem";

export interface Order {
  id: number;
  name: string;
  cart: Array<CartItem>;
  owner: User;
  isSold: boolean;
}
