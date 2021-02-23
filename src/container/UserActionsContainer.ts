import { User } from "../models/User";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { UserService } from "../Services/UserService";

export class UserActionsContainer implements IPage {

  userService: UserService;

  constructor(usrService: UserService) {
    this.userService = usrService;
  }

  mount(): void {

    const btn_customer_home: HTMLButtonElement = document.getElementById("btn-customer-home") as HTMLButtonElement;
    btn_customer_home?.addEventListener("click", (e: Event) => Router.render('home'));

    const btn_customer_myorders: HTMLButtonElement = document.getElementById("btn-customer-myorder") as HTMLButtonElement;
    btn_customer_myorders?.addEventListener("click", (e: Event) => Router.render('customerorderlist'));

    const btn_product_list: HTMLButtonElement = document.getElementById("btn-product-list") as HTMLButtonElement;
    btn_product_list?.addEventListener("click", (e: Event) => Router.render('producteditlist'));

  };

  render(): string {
    let result: string = ``

    const loggedUser: User = this.userService.getLoggedUser();
    if (loggedUser) {
      if (loggedUser.userType === 0) {
        result =
          `<div class="border box-shadow text-center" style="margin-top: 10px;">
                <h3>Sayfaları</h3>
                <hr style="margin: 0 auto; width:50%;border:2px solid black;opacity: 0.4;" class="w3-round">
                <ul id="actions" class="list-style-none">
                    <button id="btn-customer-home" class="btn btn-default btn-block"><i class="fas fa-store-alt"></i> Home </button>
                    <button id="btn-product-list" class="btn btn-default btn-block"> <i class="fas fa-gift"></i> Ürünler </button>
                </ul>
            </div>`;
      }

      else if (loggedUser.userType === 1) {
        result = `
        <div class="border box-shadow text-center" style="margin-top: 10px;">
          <h1>Kasiyer Sayfaları</h1>
        </div>`;
      }

      else {
        result = `
        <div class="border box-shadow text-center" style="margin-top: 10px;">
          <h1>Müşteri Sayfaları</h1>
          <button id="btn-customer-home" class="btn btn-default btn-block"><i class="fas fa-store-alt"></i>  Home </button>
          <button id="btn-customer-myorder" class="btn btn-default btn-block"> <i class="fas fa-shopping-basket"></i> Siparişlerim </button>
        </div>`;
      }
    }

    return result;
  }
}
