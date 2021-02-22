import { User } from "../models/User";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { UserService } from "../Services/UserService";

export class UserActionsContainer implements IPage {
  userService:UserService;
  constructor(usrService:UserService){
    this.userService=usrService;
  }

  isRequiredAuth: boolean;
  mount(): void {
    let txt: HTMLInputElement = document.getElementById("txt");
    txt?.addEventListener("change", (e: Event) => {
      console.log(e.target.value);
    });

    let btn_customer_home: HTMLButtonElement = document.getElementById("btn-customer-home");
    btn_customer_home?.addEventListener("click", (e: Event) => {
      console.log("home");
      Router.render('home');
    });

    let btn_customer_myorders: HTMLButtonElement = document.getElementById("btn-customer-myorder");
    btn_customer_myorders?.addEventListener("click", (e: Event) => {
      console.log("siparişlerim");
      Router.render('customerorderlist');
    });

    let btn_product_list: HTMLButtonElement = document.getElementById("btn-product-list");
    btn_product_list?.addEventListener("click", (e: Event) => {
      console.log("Ürünlerim");
      Router.render('producteditlist');
    });

  


  };

  render(): string {
    let result: string = ``
    const isLogged:boolean = true;
    const userType:number=2
    const loggedUser:User=this.userService.getLoggedUser();
    if(loggedUser){
      if(loggedUser.userType===0){
        result = 
      `   <div class="border box-shadow text-center" style="margin-top: 10px;">
                <h3>İşlemler</h3>
                <hr style="margin: 0 auto; width:50%;border:2px solid black;opacity: 0.4;" class="w3-round">
                <ul id="actions" class="list-style-none">
                    <li class="btn btn-default btn-block" style="text-align: left;"><a href="#"
                            style="text-decoration: none;"><i class="fas fa-user-plus"
                                style="margin-right: 0.4rem;"></i>User Ekleme</a></li>
                    <li class="btn btn-default btn-block" style="text-align: left;"><a href="#"
                            style="text-decoration: none;"><i class="fas fa-user-minus"
                                style="margin-right: 0.4rem;"></i>User Silme</a></li>
                    <li class="btn btn-default btn-block" style="text-align: left;"><a href="#"
                            style="text-decoration: none;"><i class="fas fa-user-edit"
                                style="margin-right: 0.4rem;"></i>User Düzenleme</a></li>

                                 <button id="btn-customer-home" class="btn btn-primary btn-block"> <i class="fas fa-sign-out-alt"></i> Home </button>
                                 <button id="btn-product-list" class="btn btn-primary btn-block"> <i class="fas fa-sign-out-alt"></i> Ürünler </button>
                </ul>
            </div>
`;
      }

      else if(loggedUser.userType===1){
        result = `
        <div class="border box-shadow text-center" style="margin-top: 10px;">
        <h1>Kasiyer işlemleri</h1>
        </div>`;
      }
    
    else{
      result = `
        <div class="border box-shadow text-center" style="margin-top: 10px;">
        <h1>Müşteri işlemleri</h1>
        <button id="btn-customer-home" class="btn btn-primary btn-block"> <i class="fas fa-sign-out-alt"></i> Home </button>
        <button id="btn-customer-myorder" class="btn btn-primary btn-block"> <i class="fas fa-sign-out-alt"></i> Siparişlerim </button>
        </div>`;
    }
    }

    return result;
  }
}
