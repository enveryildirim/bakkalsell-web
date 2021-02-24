import { CartItem } from "../models/CartItem";
import { User } from "../models/User";
import { UserType } from "../models/UserType";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { CartService } from "../Services/CartService";
import { OrderService } from "../Services/OrderService";
import { UserService } from "../Services/UserService";

export class CartContainer implements IPage {

  cartService: CartService;
  userService: UserService;
  orderService: OrderService;

  constructor(crtService: CartService, usrService: UserService, ordrService: OrderService) {

    this.cartService = crtService;
    this.userService = usrService;
    this.orderService = ordrService;

  }

  mount(): void {

    const inputs_quantity = document.getElementsByName("input_quantity");
    inputs_quantity?.forEach(inputItem => {

      inputItem?.addEventListener("change", (e: Event,) => {

        const amount: number = Number((e.target as HTMLInputElement).value);
        if (amount <= 0 || amount > 1000) {

          alert("1-1000 arası bir değer giriniz");
          (e.target as HTMLInputElement).value = "1";
          return;

        }

        const id: number = Number((e.target as HTMLInputElement).getAttribute("cartItemID"));
        const cartItem: CartItem = this.cartService.getCartItemByID(id);
        cartItem.amount = amount;
        this.cartService.updateCart(cartItem);

        Router.render("home");

      });

    });

    const btn_cart_product_removesList = document.getElementsByName("btn-cart-product-remove");
    btn_cart_product_removesList?.forEach(btn_cart_product_remove => {

      btn_cart_product_remove?.addEventListener("click", (e: Event,) => {

        const id: number = Number((e.target as HTMLButtonElement).getAttribute("cartItemID"));
        const cartItem: CartItem = this.cartService.getCartItemByID(id);

        this.cartService.deleteProductFromCart(cartItem);
        Router.render("home");

      });

    });

    const btn_sale: HTMLButtonElement = document.getElementById("btn-sale") as HTMLButtonElement;
    btn_sale?.addEventListener("click", (e: Event) => {

      if (this.cartService.getCart().length <= 0) {

        alert("Sepet boş Ürün Ekleyin!!!");
        return;

      }

      const result: boolean = confirm("Satış yapılsın mı");
      if (result) {

        this.cartService.saleCart();
        Router.render("home");

      }

    });

    const btn_order: HTMLButtonElement = document.getElementById("btn-order") as HTMLButtonElement;
    btn_order?.addEventListener("click", (e: Event) => {

      if (this.cartService.getCart().length <= 0) {

        alert("Sepet boş Ürün Ekleyin!!!");
        return;

      }

      const result: boolean = confirm("Sipariş verilsin mi");
      if (result) {

        const loggedUser: User = this.userService.getLoggedUser();

        const cartItemList: Array<CartItem> = this.cartService.getCart();
        cartItemList.map(crtItem => {
          this.orderService.addProductToOrder(loggedUser, crtItem.product, crtItem.amount);
        });
        this.cartService.clearCart();

        Router.render("home");
      }

    });

  };

  render(): string {

    let result: string = ``;
    let totalPrice: number = 0;
    let countProduct: number = 0;

    const cartItems: Array<CartItem> = this.cartService.getCart();
    cartItems.map(item => {
      //Test edildikten sonra kaldırılacak
     /* result += `<li class="cart-list-item border">
                    <i class="fas fa-carrot" style="font-size: 100px;"></i>
                    <span>${item.product.name}</span>
                    <br>
                    <span>${item.product.price} X </span>
                    <input type="number" id="quantity" name="input_quantity" cartItemID=${item.id} style="width:auto;text-align:center;" min="1" max="500" value="${item.amount}">
                    <span>Tutar:${item.amount * item.product.price} tl</span>
                    <button class="btn btn-danger" name="btn-cart-product-remove" cartItemID=${item.id}>Kaldır</button>
                </li>`;*/

        result += `
         <div style="display: flex; align-items: center;justify-content: center;flex-wrap: wrap;">
              <img src="https://cdn.jsdelivr.net/gh/enveryildirim/bakkalsell-web@learning-subjects/img/product.png" style="width: 50px; height: 50px;">
              <p>${item.product.name}  </p>
              
              <p>${item.product.price} TL X  <input type="number" id="quantity" name="input_quantity" cartItemID=${item.id} style="width:auto;text-align:center;" min="1" max="500" value="${item.amount}"> =
               ${item.amount * item.product.price} TL   <p>
                  
                        <button class="btn btn-danger" name="btn-cart-product-remove" cartItemID=${item.id}>  <i class="fas fa-times"></i></button>
          </div>
        `;
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
