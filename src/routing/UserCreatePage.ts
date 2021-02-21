import { IPage } from "./IPage";

export class UserCreatePage implements IPage{
isRequiredAuth: boolean;
mount(): void{
let txt:HTMLInputElement = document.getElementById("txt");
txt?.addEventListener("change",(e:Event)=>{
console.log(e.target.value);
});

let btn:HTMLButtonElement = document.getElementById("btn");
 btn?.addEventListener("click", (e:Event) => {
    console.log("Tıklandı");
   
    //Router.render('home');
  });
};
  render():string{
    return `<h1>Kullanıcı Ekleme Sayfası</h1>
     <div class="form-group">
                    <label for="password">Şifre</label>
                    <input type="password" id="txt" class="input" placeholder="Şifre">
                    <button id="btn">Giriş
                        Yap</button>
                </div>`;;
  }
}