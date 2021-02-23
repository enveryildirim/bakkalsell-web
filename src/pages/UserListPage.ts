import { IPage } from "../routing/IPage";

export class UserListPage implements IPage {
  mount(): void { }

  render(): string {
    const result: string = `<div id="content" class="border box-shadow text-center"></div>`;
    return result;
  }
}
