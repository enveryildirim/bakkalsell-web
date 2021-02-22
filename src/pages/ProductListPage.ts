import { CartContainer } from "../container/CartContainer";
import { LoginContainer } from "../container/LoginContainer";
import { UserActionsContainer } from "../container/UserActionsContainer";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";

export class ProductListPage implements IPage {
  isRequiredAuth: boolean;
  mount(): void {}

  render(): string {
    const loginContainer: IPage = Router.get("con_login");
    const userActionsContainer: IPage = Router.get("con_useractions");
    const productEditListContainer:IPage = Router.get("con_product_edit_list");
    const productActionsContainer:IPage = Router.get("con_product_actions");

    const result: string =
      `<div id="user-actions">`+
      loginContainer.render() +
      userActionsContainer.render() +
     `</div>
      <div id="content" class="border box-shadow text-center">
      `+ productEditListContainer.render()
      +`</div><div id="cart">`+
      productActionsContainer.render()+`</div>`;
   

    return result;
  }
}
