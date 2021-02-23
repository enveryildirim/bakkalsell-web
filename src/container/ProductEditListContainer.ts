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

  mount(): void {

    const btn_product_editLists = document.getElementsByName("btn_product_modal_edit");
    btn_product_editLists.forEach(btn_product_edit => {

      btn_product_edit?.addEventListener("click", (e: Event,) => {

        const id: number = Number((e.target as HTMLButtonElement).getAttribute("productID"));
        const product: Product = this.productService.getProductById(id);
        //ürün güncelleme modal' açar 
        document.getElementById('modal_update').style.display = 'block';

        const input_modal_product_update_name: HTMLInputElement = document.getElementById("modal_product_update_name") as HTMLInputElement;
        const input_modal_product_update_price: HTMLInputElement = document.getElementById("modal_product_update_price") as HTMLInputElement;
        const input_modal_product_update_amount: HTMLInputElement = document.getElementById("modal_product_update_amount") as HTMLInputElement;

        input_modal_product_update_name.value = product.name;
        input_modal_product_update_price.value = String(product.price);
        input_modal_product_update_amount.value = String(product.amount);

        const btn_product_update: HTMLButtonElement = document.getElementById("btn_update_product") as HTMLButtonElement;
        btn_product_update.setAttribute("productID", String(product.id));

      });

    });

    const btn_product_deleteLists = document.getElementsByName("btn_product_modal_delete");
    btn_product_deleteLists.forEach(btn_product_delete => {

      btn_product_delete?.addEventListener("click", (e: Event,) => {

        const id: number = Number((e.target as HTMLButtonElement).getAttribute("productID"));
        const product: Product = this.productService.getProductById(id);

        const result = confirm("Silmek İstiyor musuunuz");
        if (result) {

          this.productService.deleteProduct(product);
          Router.render("producteditlist");

        }

      });
    });

  }

  render(): string {

    let result: string = ``;

    const productItems: Array<Product> = this.productService.getAllProduct();
    productItems.map(item => {

      result +=
        `<div class="card product">
                <img src="https://cdn.jsdelivr.net/gh/enveryildirim/bakkalsell-web@learning-subjects/img/product.png" alt="" style="width: 100px;height: 100px;">
                <h3>${item.name}</h3>
                <p>Fiyat:${item.price} TL</p>
                <p>Stok:${item.amount}</p>
                <hr />
                <button type="button" name="btn_product_modal_edit" productID=${item.id}  class="btn-block btn-link btn"><i class="far fa-edit"></i> Düzenle</button>
                <button type="button" name="btn_product_modal_delete" productID=${item.id} class="btn-block btn-link btn"><i class="far fa-minus-square"></i></i> Sil</button>
        </div>`;

    });

    return result;

  }

}
