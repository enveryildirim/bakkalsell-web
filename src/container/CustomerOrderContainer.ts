
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { OrderService } from "../Services/OrderService";
import { UserService } from "../Services/UserService";


export class CustomerOrderContainer implements IPage {
  orderService:OrderService;
  userService:UserService;
  constructor(ordrService:OrderService,usrService:UserService){
    this.orderService=ordrService;
    this.userService=usrService;
  }

  isRequiredAuth: boolean;
  mount(): void {
    //input amunt
   const inputs_quantity = document.getElementsByName("input_quantity_customer");
    inputs_quantity?.forEach(inputItem => {
      inputItem?.addEventListener("change", (e: Event,) => {
        const amount: number = Number(e.target.value);
        const productID:number=Number(e.target.getAttribute("productID"));
        const orderID:number=Number(e.target.getAttribute("orderID"));
        if (amount <= 0 || amount > 1000) {
          alert("1-1000 arası bir değer giriniz");
          e.target.value = 1;
          return;
        }

        this.orderService.updateOrderProductAmount(orderID,productID,amount);
        Router.render("customerorderlist");
      });
    });

    //product remove buttons

const buttons_remove = document.getElementsByName("btn_customer_order_remove_product");
    buttons_remove?.forEach(btnRemove => {
      btnRemove?.addEventListener("click", (e: Event,) => {
        const productID:number=Number(e.target.getAttribute("productID"));
        const orderID:number=Number(e.target.getAttribute("orderID"));
        this.orderService.deleteProductFromOrder2(orderID,productID);
        const userOrder=this.orderService.getOrderByUserID(2);
        Router.render("customerorderlist");
      });
    });

    //remove order
    let btn_remove_order:HTMLButtonElement = document.getElementById("btn-order-cancel");
    btn_remove_order?.addEventListener("click",(e:Event)=>{
      console.log("sipariş iptal edilecek");
      const orderID:number=Number(e.target.getAttribute("orderID"));
      this.orderService.deleteOrder(orderID);
      Router.render("customerorderlist");
      console.log(this.orderService.getAllOrder());
    })

  };

  render(): string {
    //test amaçlı kaldırılacak
   
    const loggedUser=this.userService.getLoggedUser();
    const userOrder=this.orderService.getOrderByUserID(loggedUser.id);
    console.log(userOrder);
    if(!userOrder){
      return `<h1>Siparişiniz bulunmamaktadır!!!!</h1>`;
    }

    let result: string = ``;
    let totalPrice: number = 0;
    let countProduct: number = 0;


    userOrder.cart.map(item => {
      result += `<li class="cart-list-item border">
                    <i class="fas fa-carrot" style="font-size: 100px;"></i>
                    <span>${item.product.name}</span>
                    <br>
                    <span>${item.product.price} X </span>
                    <input type="number" id="quantity" name="input_quantity_customer" orderID=${userOrder.id} productID=${item.product.id} style="width:auto;text-align:center;" min="1" max="500" value="${item.amount}">
                    <span>Tutar:${item.amount * item.product.price} tl</span>
                    <button type="button" name="btn_customer_order_remove_product" orderID=${userOrder.id} productID=${item.product.id} class="btn btn-danger">Kaldır</button>
                   
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
