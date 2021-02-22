import { Product } from "../models/Product";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { CartService } from "../Services/CartService";
import { ProductService } from "../Services/ProductService";

export class ProductEditListContainer implements IPage {
  productService: ProductService;

  constructor(prdctService: ProductService) {
    this.productService = prdctService;

  }
  isRequiredAuth: boolean;
  mount(): void {
    const btn_product_editLists = document.getElementsByName("btn_product_modal_edit");
    btn_product_editLists.forEach(btn_product_edit => {
      btn_product_edit?.addEventListener("click", (e: Event,) => {
        const id: number = Number(e.target.getAttribute("productID"));
        const product: Product = this.productService.getProductById(id);

        document.getElementById('modal_update').style.display = 'block';

        const input_modal_product_update_name: HTMLInputElement = document.getElementById("modal_product_update_name");
        const input_modal_product_update_price: HTMLInputElement = document.getElementById("modal_product_update_price");
        const input_modal_product_update_amount: HTMLInputElement = document.getElementById("modal_product_update_amount");
        input_modal_product_update_name.value = product.name;
        input_modal_product_update_price.value = product.price;
        input_modal_product_update_amount.value = product.amount;

        const btn_product_update: HTMLButtonElement = document.getElementById("btn_update_product");
        btn_product_update.setAttribute("productID", String(product.id));
        console.log(product, "edit");

      });
    });

    const btn_product_deleteLists = document.getElementsByName("btn_product_modal_delete");
    btn_product_deleteLists.forEach(btn_product_delete => {
      btn_product_delete?.addEventListener("click", (e: Event,) => {
        const id: number = Number(e.target.getAttribute("productID"));
        const product: Product = this.productService.getProductById(id);
        const result=confirm("Silmek İstiyor musuunuz");
        if(result){
            this.productService.deleteProduct(product);
            Router.render("producteditlist");
        }
       

      });
    });







  }

  render(): string {
    let productString: string = ``;
    const productItems: Array<Product> = this.productService.getAllProduct();
    productItems.map(item => {
      productString += `<div class="card product">
                <i class="fas fa-gift" style="font-size:200px"></i>
                <h3>${item.name}</h3>
                <p>Fiyat:${item.price} TL</p>
                <p>Stok:${item.amount}</p>
                <hr />
                 <input type="number" id="input_amount${item.id}" name="amount" style="width:auto;text-align:center;" min="1" max="500" value="1">
                
                 <button type="button" name="btn_product_modal_edit" productID=${item.id} class="btn-block btn"><i class="fas fa-cart-plus"></i> Düzenle</button>
                 <button type="button" name="btn_product_modal_delete" productID=${item.id} class="btn-block btn"><i class="fas fa-cart-plus"></i> Sil</button>
            </div>`;
    });


    const result: string = productString;



    return result;
  }
}
