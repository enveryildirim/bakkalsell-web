import { CartContainer } from "../container/CartContainer";
import { LoginContainer } from "../container/LoginContainer";
import { UserActionsContainer } from "../container/UserActionsContainer";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";

export class HomePage implements IPage {
  isRequiredAuth: boolean;
  mount(): void {}

  render(): string {
    const loginContainer: IPage = Router.get("con_login");
    const userActionsContainer: IPage = Router.get("con_useractions");
    const cartContainer: IPage = Router.get("con_cart");
    const productContainer: IPage = Router.get("con_product");

    const result: string =
      `<h1>Home Sayfası</h1>` +
      loginContainer.render() +
      `<hr/>` +
      userActionsContainer.render() +
      `<hr/>` +
      productContainer.render() +
      `<hr/>` +
      cartContainer.render();

    return result;
  }
}
