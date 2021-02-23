import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";

export class CustomerOrderListPage implements IPage {

  mount(): void {}

  render(): string {

    const customerOrderContainer: IPage = Router.get("con_customer_order");
    const loginContainer: IPage = Router.get("con_login");
    const userActionsContainer: IPage = Router.get("con_useractions");

    const result: string =
      `<div id="user-actions">
        ${loginContainer.render()} 
        ${userActionsContainer.render()}
      </div>
      <div id="content" class="border box-shadow text-center">
        ${customerOrderContainer.render()}
      </div>`;

    return result;
  }
}
