import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";

export class LoginContainer implements IPage {
  isRequiredAuth: boolean;
  isLogged: boolean = false;
  mount(): void {
    let btn: HTMLButtonElement = document.getElementById("btn-login");

    let txt_username: HTMLInputElement = document.getElementById("username");
    let txt_password: HTMLInputElement = document.getElementById("password");



    btn?.addEventListener("click", (e: Event) => {
      e.preventDefault();
      //login Db bağlanacak
      console.log(txt_username.value + "--" + txt_password.value);
      this.isLogged=true;
      //Router.render('home');
    });

  }


  render(): string {
    //db kontrol edilece
   

    if (this.isLogged) {
      return`
      <h1>Kullanıcı Bilgileri</h1>
      `;

    } else {
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
}