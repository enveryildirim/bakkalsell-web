import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";

export class UserListPage implements IPage {
  isRequiredAuth: boolean;
  mount(): void {}

  render(): string {
   

    const result: string =
      `<div id="content" class="border box-shadow text-center">
      </div>`;
   
    return result;
  }
}
