import { User } from "../models/User";
import { IPage } from "../routing/IPage";
import { Router } from "../routing/Router";
import { UserService } from "../Services/UserService";

export class LoginContainer implements IPage {

  userService:UserService;
  constructor(usrService:UserService){
    this.userService=usrService;
  }
  isRequiredAuth: boolean;
  isLogged: boolean = false;
  mount(): void {
    let btn_login: HTMLButtonElement = document.getElementById("btn-login");
    let btn_logout: HTMLButtonElement = document.getElementById("btn-logout");
    
    let txt_username: HTMLInputElement = document.getElementById("username");
    let txt_password: HTMLInputElement = document.getElementById("password");



    btn_login?.addEventListener("click", (e: Event) => {
      e.preventDefault();
      //login Db bağlanacak
      const username:string=txt_username.value;
      const password:string=txt_password.value;
      const isLogged:boolean=this.userService.login(username,password);
      if(isLogged){
        Router.render("home");
        //Router.render("customerorderlist");
      }else{
        alert("Bilgiler yanlış");
      }
    });

     btn_logout?.addEventListener("click", (e: Event) => {
      e.preventDefault();
      //login Db bağlanacak
        this.userService.logout();
        alert("Çıkış Yapıldı");
        Router.render("home");
      
    });

  }


  render(): string {
    //db kontrol edilece
   
    const loggedUser:User=this.userService.getLoggedUser();
    if (loggedUser) {
      return`
    <div id="user-info" class="border box-shadow text-center" style="margin-bottom: 10px;">
      <h1>Kullanıcı Bilgileri</h1>
                <i class="fas fa-user" style="font-size: 100px; width: 100%;"></i>
                <p>Kullanıcı Adı: ${loggedUser.username}</p>
                <p>Bilgiler: ${loggedUser.name}</p>
         <button id="btn-logout" class="btn btn-block btn-danger"> <i class="fas fa-sign-out-alt"></i> Çıkış
                        Yap</button>
        </div>
    
      
                      
      `;

    } else {
      return ` 
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