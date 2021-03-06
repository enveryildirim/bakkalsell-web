import { IPage } from "./IPage";
import { Router } from "./Router";

export class Login implements IPage{
isRequiredAuth: boolean;

mount():void{
let btn:HTMLButtonElement = document.getElementById("btn-login");

let txt_username:HTMLInputElement = document.getElementById("username");
let txt_password:HTMLInputElement = document.getElementById("password");

txt_username?.addEventListener('change', (e:Event) =>{
  console.log(e.target.value+"-"+txt_password.value);
});

  btn?.addEventListener("click", (e:Event) => {
    e.preventDefault();
    console.log(txt_username.value+"--"+txt_password.value);
   
    //Router.render('home');
  });

} 


  render():string{
    return `<h1>Login Sayfası</h1>
     <form id="login-form" class="border box-shadow"  style="text-align: center;">

                <div class="form-group">
                    <h3>Login Form</h3>
                    <hr style="margin: 0 auto; width:50%;border:2px solid black;opacity: 0.4;" class="w3-round">
                </div>
                <div class="form-group">
                    <label for="username">Kullanıcı Adı</label>
                    <input type="text" id="username" class="input" placeholder="Kullanıcı Adı">
                </div>

                <div class="form-group">
                    <label for="password">Şifre</label>
                    <input type="password" id="password" class="input" placeholder="Şifre">
                </div>

                <div class="form-group">
                    <button id="btn-login" class="btn btn-block btn-primary"> <i class="fas fa-sign-in-alt"></i> Giriş
                        Yap</button>
                </div>
            </form>

    `;
  }
  
}