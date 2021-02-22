import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import { CartRepository } from "../repository/CartRepository";
import { ProductRepository } from "../repository/ProductRepository";


export class CartService {
  cartRepository: CartRepository;
  productRepository: ProductRepository;
  constructor(crtRepository: CartRepository,prdctRepository:ProductRepository) {
    this.cartRepository = crtRepository;
    this.productRepository=prdctRepository;
  }

  addProductToCart(product: Product, amount: number): void {
 
   const result = this.cartRepository.getCartItemByProductID(product.id);
    let sumAmount = result ? result.amount : 0;
    sumAmount = sumAmount + amount;
    if (sumAmount > product.amount) {
      console.log("istenilen miktar kadar stok yok");
      return;
    }
    if (result) {
      result.amount = result.amount + amount;
      this.cartRepository.update(result);
    } else {
      const newCartItem = { product: product, amount: amount };
      this.cartRepository.create(newCartItem);
    }
  }

  deleteProductFromCart(cartItem: CartItem): void {
    this.cartRepository.deletee(cartItem);
  }

  saleCart(){
    const liste=this.getCart();
    liste.map(cartItem=>{
      cartItem.product.amount=cartItem.product.amount-cartItem.amount;
      this.productRepository.update(cartItem.product);
    });

   this.cartRepository.clearCart();
  }
  clearCart(): void {
    this.cartRepository.clearCart();
  }
  updateCart(cartItem:CartItem):void{
    this.cartRepository.update(cartItem);
  }
  getCartItemByID(id:number):CartItem{
    return this.cartRepository.get(id);
  }

  getCart(): Array<CartItem> {
    return this.cartRepository.getAll();
  }


}
