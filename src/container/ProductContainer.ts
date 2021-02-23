import { Product } from "../models/Product";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { CartService } from "../Services/CartService";
import { ProductService } from "../Services/ProductService";

export class ProductContainer implements IPage {

  productService: ProductService;
  cartService: CartService;

  constructor(prdctService: ProductService, crtService: CartService) {
    this.productService = prdctService;
    this.cartService = crtService;
  }

  mount(): void {

    const btn_addToCart = document.getElementsByName("btn_addToCart");
    btn_addToCart?.forEach(btnItem => {

      btnItem?.addEventListener("click", (e: Event,) => {

        const id: number = Number((e.target as HTMLButtonElement).getAttribute("productID"));
        const product: Product = this.productService.getProductById(id);

        const amountElement: HTMLInputElement = document.getElementById(`input_amount${id}`) as HTMLInputElement;
        const amount: number = Number(amountElement.value);

        if (amount <= 0 || amount > 1000) {

          alert("1-1000 arası bir değer giriniz");
          amountElement.value = "1";

          return;
        }

        this.cartService.addProductToCart(product, amount);
        Router.render("home");

      });

    });

  }

  render(): string {

    let productString: string = ``;

    const productItems: Array<Product> = this.productService.getAllProduct();
    productItems.map(item => {

      productString += `<div class="card product">
                 <img src="https://cdn.jsdelivr.net/gh/enveryildirim/bakkalsell-web@learning-subjects/img/product.png" alt="" style="width: 100px;height: 100px;">
                <h3>${item.name}</h3>
                <p>Fiyat:${item.price} TL</p>
                <p>Stok:${item.amount}</p>
                <hr />
                 <input type="number" class="input" id="input_amount${item.id}" name="amount" style="text-align:center;" min="1" max="500" value="1">
                
                <button type="button" name="btn_addToCart" productID=${item.id} class="btn-block btn-link btn"><i class="fas fa-cart-plus"></i> Sepete Ekle</button>
            </div>`;

    });

    const result: string =
      ` <div id="content" class="border box-shadow text-center">
            ${productString}
        </div>`;

    return result;

  }

}
