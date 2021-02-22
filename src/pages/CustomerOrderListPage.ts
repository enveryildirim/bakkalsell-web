
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";

export class CustomerOrderListPage implements IPage {
  isRequiredAuth: boolean;
  mount(): void {}

  render(): string {
    const customerOrderContainer: IPage = Router.get("con_customer_order");
  
    const result: string =
      `<div id="user-actions">
      `+
      customerOrderContainer.render();
      +`
      </div>`;
   
    return result;
  }
}
