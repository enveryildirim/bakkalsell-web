import { Product } from "../models/Product";
import { User } from "../models/User";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { ProductService } from "../Services/ProductService";
import { UserService } from "../Services/UserService";

export class ProductActionsContainer implements IPage {
  productService: ProductService;
  constructor(prdService: ProductService) {
    this.productService = prdService;
  }

  isRequiredAuth: boolean;
  mount(): void {
    let txt: HTMLInputElement = document.getElementById("txt");
    txt?.addEventListener("change", (e: Event) => {
      console.log(e.target.value);
    });

    let btn_new_product: HTMLButtonElement = document.getElementById("btn_new_product");
    btn_new_product?.addEventListener("click", (e: Event) => {


      const input_modal_product_new_name: HTMLInputElement = document.getElementById("modal_product_new_name");
      const input_modal_product_new_price: HTMLInputElement = document.getElementById("modal_product_new_price");
      const input_modal_product_new_amount: HTMLInputElement = document.getElementById("modal_product_new_amount");
      const name: string = input_modal_product_new_name.value;
      const price: number = Number(input_modal_product_new_price.value);
      const amount: number = Number(input_modal_product_new_amount.value);

      const prd: Product = {
        id: 0,
        name,
        price, amount
      };
      this.porductService.createProduct(prd);
      console.log(this.porductService.getAllProduct());
      document.getElementById('modal_new').style.display = 'none';
      Router.render("producteditlist");

    });

    let btn_update_product: HTMLButtonElement = document.getElementById("btn_update_product");
    btn_update_product?.addEventListener("click", (e: Event) => {
      const id: number = Number(e.target.getAttribute("productID"));
      const product: Product = this.productService.getProductById(id);

      const input_modal_product_update_name: HTMLInputElement = document.getElementById("modal_product_update_name");
      const input_modal_product_update_price: HTMLInputElement = document.getElementById("modal_product_update_price");
      const input_modal_product_update_amount: HTMLInputElement = document.getElementById("modal_product_update_amount");
      product.name = input_modal_product_update_name.value
      product.price = Number(input_modal_product_update_price.value);
      product.amount = Number(input_modal_product_update_amount.value);

      this.productService.updateProduct(product);
      Router.render("producteditlist");
    });


  };

  render(): string {
    let result: string = ``

    result =
      `   <div class="border box-shadow text-center"">
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
                
                
                <button type="button" style="display: block;"
                            onclick="document.getElementById('modal_new').style.display='block'"> Ürün Ekleme Modal
                            Aç</button></li>
                </ul>

                            <!-- Modal that pops up when you click on "New Message" -->
            <div id="modal_new" class="modal" style="z-index:4">
                <div class="modal-content animate-zoom">
                    <div class="container padding">

                        <h2>Ürün Ekleme</h2>
                    </div>
                    <div>
                        <label>Ürün Adı</label>
                        <input class="modal_input" id="modal_product_new_name" type="text">
                        <label>Fiyat</label>
                        <input class="modal_input" id="modal_product_new_price" type="number">
                        <label>Stok </label>
                        <input class="modal_input" id="modal_product_new_amount" type="number">
                        <div>
                            <button type="button"
                                onclick="document.getElementById('modal_new').style.display='none'">İptal</button>
                            <button type="button" id="btn_new_product"
                                >Kaydet</button>

                        </div>
                    </div>
                </div>
            </div>

            <div id="modal_update" class="modal" style="z-index:4">
                <div class="modal-content animate-zoom">
                    <div class="container padding">

                        <h2>Ürün Ekleme</h2>
                    </div>
                    <div>
                        <label>Ürün Adı</label>
                        <input class="modal_input" id="modal_product_update_name" type="text">
                        <label>Fiyat</label>
                        <input class="modal_input" id="modal_product_update_price" type="number">
                        <label>Stok </label>
                        <input class="modal_input" id="modal_product_update_amount" type="number">
                        <div>
                            <button type="button"
                                onclick="document.getElementById('modal_update').style.display='none'">İptal</button>
                            <button type="button"
                                id="btn_update_product">Güncelle</button>

                        </div>
                    </div>
                </div>
            </div>
            </div>
`;

    return result;
  }
}
