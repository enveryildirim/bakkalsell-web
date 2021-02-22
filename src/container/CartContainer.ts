import { CartItem } from "../models/CartItem";
import { User } from "../models/User";
import { UserType } from "../models/UserType";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { CartService } from "../Services/CartService";
import { UserService } from "../Services/UserService";

export class CartContainer implements IPage {
  cartService: CartService;
  userService: UserService;
  constructor(crtService: CartService, usrService) {
    this.cartService = crtService;
    this.userService = usrService;
  }
  isRequiredAuth: boolean;
  mount(): void {
    const inputs_quantity = document.getElementsByName("input_quantity");
    inputs_quantity?.forEach(inputItem => {
      inputItem?.addEventListener("change", (e: Event,) => {
        const amount: number = Number(e.target.value);
        if (amount <= 0 || amount > 1000) {
          alert("1-1000 arası bir değer giriniz");
          e.target.value = 1;
          return;
        }
        const id: number = Number(e.target.getAttribute("cartItemID"));
        const cartItem: CartItem = this.cartService.getCartItemByID(id);
        cartItem.amount = amount;
        this.cartService.updateCart(cartItem);
        Router.render("home");

      });
    });

  };

  render(): string {

    let result: string = ``;
    let totalPrice: number = 0;
    let countProduct: number = 0;

    const cartItems: Array<CartItem> = this.cartService.getCart();
    cartItems.map(item => {
      result += `<li class="cart-list-item border">
                    <i class="fas fa-carrot" style="font-size: 100px;"></i>
                    <span>${item.product.name}</span>
                    <br>
                    <span>${item.product.price} X </span>
                    <input type="number" id="quantity" name="input_quantity" cartItemID=${item.id} style="width:auto" min="1" max="500" value="${item.amount}">
                    <span>Tutar:${item.amount * item.product.price} tl</span>
                </li>`;
      totalPrice += item.amount * item.product.price;
      countProduct++;
    });

    const loggedUser: User = this.userService.getLoggedUser();
    let btn_action = '<h3>Sipariş vermek için giriş yapınız</h3>';
    if (loggedUser) {
      if (loggedUser.userType === UserType.CUSTOMER) {
        btn_action = `<button id="btn-order" class="btn btn-block btn-danger">Sipariş Ver</button>`;
      } else {
        btn_action = `<button id="btn-sale" class="btn btn-block btn-danger">Satış Yap</button>`;
      }
    }
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
           ${btn_action}
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