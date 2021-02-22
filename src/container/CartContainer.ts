import { CartItem } from "../models/CartItem";
import { IPage } from "../routing/IPage";
import { CartService } from "../Services/CartService";

export class CartContainer implements IPage {
  cartService:CartService;
  constructor(crtService:CartService){
    this.cartService=crtService;
  }
  isRequiredAuth: boolean;
  mount(): void{

  };
  
  render(): string {

    let result: string = ``;
    let totalPrice:number=0;
    let countProduct:number=0;

    const cartItems:Array<CartItem> =this.cartService.getCart();
    cartItems.map(item=>{
      result+=`<li class="cart-list-item border">
                    <i class="fas fa-carrot" style="font-size: 100px;"></i>
                    <span>${item.product.name}</span>
                    <br>
                    <span>${item.product.price} X </span>
                    <input type="number" id="quantity" name="quantity" style="width:auto" min="1" max="500" value="${item.amount}">
                    <span>Tutar:${item.amount*item.product.price} tl</span>
                </li>`;
                totalPrice+=item.amount*item.product.price;
                countProduct++;
    })
    return `
     <div id="cart" class="text-center box-shadow">
            <h3>Sepetim</h3>
            <hr>
            <ul id="cart-product-list" class="list-style-none">
               ${result}
            </ul>
            <hr>
            <div>
                <span>${countProduct} adet ürün</span>
                <span>Toplam Tutar: ${totalPrice}--TL</span>
            </div>
            <hr>
            <button class="btn btn-block btn-danger">Satış Yap</button>
        </div>
    `;
  }
}

/*

 <div id="cart" class="text-center box-shadow">
            <h3>Sepetim</h3>
            <hr>
            <ul id="cart-product-list" class="list-style-none">
                <li class="cart-list-item border">
                    <i class="fas fa-carrot" style="font-size: 100px;"></i>
                    <span>Elma</span>
                    <br>
                    <span>10TL X </span>
                    <input type="number" id="quantity" name="quantity" style="width:2rem" min="1" max="500" value="1">
                    <span>Tutar:10 tl</span>
                </li>
                <li class="cart-list-item border">
                    <i class="fas fa-carrot" style="font-size: 100px;"></i>
                    <span>Elma</span>
                    <br>
                    <span>10TL X </span>
                    <input type="number" id="quantity" name="quantity" style="width:2rem" min="1" max="500" value="1">
                    <span>Tutar:10 tl</span>
                </li>

            </ul>
            <hr>
            <div>
                <span>1 adet ürün</span>
                <span>Toplam Tutar: 10--TL</span>
            </div>
            <hr>
            <button class="btn btn-block btn-danger">Satış Yap</button>
        </div>
 */