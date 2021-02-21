import { IPage } from "./IPage";

export class Home implements IPage{
isRequiredAuth: boolean;
mount ():void{

}
 
  render():string{
    return `<h1>Home Sayfası</h1>`;;
  }
}