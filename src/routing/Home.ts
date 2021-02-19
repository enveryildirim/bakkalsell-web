import { IPage } from "./IPage";

export class Home implements IPage{
  render():string{
    return `<h1>Home Sayfası</h1>`;;
  }
}