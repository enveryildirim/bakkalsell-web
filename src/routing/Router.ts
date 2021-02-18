import { IPage } from "./IPage";

export class Router {
  static pages: Array<IPage> = [];
  static insertPage(page: IPage): void {
    this.pages.push(page);
  }

  static render(index: number): void {
    const appDiv: HTMLElement = document.getElementById("app");

    appDiv.innerHTML = this.pages[index].render();
  }
}
