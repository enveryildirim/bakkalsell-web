
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { OrderService } from "../Services/OrderService";
import { UserService } from "../Services/UserService";


export class CustomerOrderContainer implements IPage {

  orderService: OrderService;
  userService: UserService;

  constructor(ordrService: OrderService, usrService: UserService) {

    this.orderService = ordrService;
    this.userService = usrService;

  }

  mount(): void {

    const inputs_quantity = document.getElementsByName("input_quantity_customer");
    inputs_quantity?.forEach(inputItem => {

      inputItem?.addEventListener("change", (e: Event,) => {

        const amount: number = Number((e.target as HTMLInputElement).value);
        const productID: number = Number((e.target as HTMLInputElement).getAttribute("productID"));
        const orderID: number = Number((e.target as HTMLInputElement).getAttribute("orderID"));

        if (amount <= 0 || amount > 1000) {

          alert("1-1000 arası bir değer giriniz");
          (e.target as HTMLInputElement).value = "1";

          return;
        }

        this.orderService.updateOrderProductAmount(orderID, productID, amount);
        Router.render("customerorderlist");

      });

    });

    //product remove buttons

    const buttons_remove = document.getElementsByName("btn_customer_order_remove_product");
    buttons_remove?.forEach(btnRemove => {

      btnRemove?.addEventListener("click", (e: Event,) => {

        const productID: number = Number((e.target as HTMLButtonElement).getAttribute("productID"));
        const orderID: number = Number((e.target as HTMLButtonElement).getAttribute("orderID"));
        this.orderService.deleteProductFromOrder(orderID, productID);

        Router.render("customerorderlist");

      });

    });

    //remove order
    const btn_remove_order: HTMLButtonElement = document.getElementById("btn-order-cancel") as HTMLButtonElement;
    btn_remove_order?.addEventListener("click", (e: Event) => {

      const orderID: number = Number((e.target as HTMLButtonElement).getAttribute("orderID"));
      this.orderService.deleteOrder(orderID);

      Router.render("customerorderlist");

    });

  };

  render(): string {

    const loggedUser = this.userService.getLoggedUser();
    const userOrder = this.orderService.getOrderByUserID(loggedUser.id);
    if (!userOrder) {
      return `<h1>Siparişiniz bulunmamaktadır!!!!</h1>`;
    }

    let result: string = ``;
    let totalPrice: number = 0;
    let countProduct: number = 0;

    userOrder.cart.map(item => {

      result += `<li class="cart-list-item border">
                    <img src="https://cdn.jsdelivr.net/gh/enveryildirim/bakkalsell-web@learning-subjects/img/product.png" alt="" style="width: 100px;height: 100px;">
                    <span>${item.product.name}</span>
                    <br>
                    <span>${item.product.price} X </span>
                    <input type="number" id="quantity" name="input_quantity_customer" orderID=${userOrder.id} productID=${item.product.id} style="width:auto;text-align:center;" min="1" max="500" value="${item.amount}">
                    <span>Tutar:${item.amount * item.product.price} tl</span>
                    <button type="button" name="btn_customer_order_remove_product" orderID=${userOrder.id} productID=${item.product.id} class="btn btn-danger"><i class="fas fa-times"></i></button>
                   
                </li>`;

      totalPrice += item.amount * item.product.price;
      countProduct++;

    });

    return `
     <div id="cart" class="text-center box-shadow">
            <h3>Siparişlerim</h3>
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
        <button id="btn-order-cancel" orderID=${userOrder.id} class="btn btn-block btn-danger">İptal Et</button>
        </div>
    `;

  }

}
