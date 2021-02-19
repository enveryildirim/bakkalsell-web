import { IPage } from "./IPage";

export class UserCreatePage implements IPage{
  render():string{
    return `<h1>Kullanıcı Ekleme Sayfası</h1>`;;
  }
}