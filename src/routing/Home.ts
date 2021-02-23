import { IPage } from "./IPage";
import { Login } from "./Login";
import { UserCreatePage } from "./UserCreatePage";

export class Home implements IPage{
isRequiredAuth: boolean;
mount ():void{

}
 
  render():string{
    const login:IPage =new Login();
    const userCreate:IPage= new UserCreatePage();
    const result:string=`<h1>Home Sayfası</h1>`+login.render()+userCreate.render();
    
    return result;
  }
}