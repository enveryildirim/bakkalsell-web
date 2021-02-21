import { IPage } from "./IPage";

export class Router {
  //static pages: Array<IPage> = [];
   static pages: { [id: string]: IPage; } = {};
  static insertPage(page: IPage,name:string): void {
    this.pages[name]=page;
  }

  static render(id: string): void {
    const appDiv: HTMLElement = document.getElementById("app");

    appDiv.innerHTML = this.pages[id].render();
    this.pages[id].mount();


for (const [key, value] of Object.entries(this.pages)) {
 value.mount();
}
  }


}
