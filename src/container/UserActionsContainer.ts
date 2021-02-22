import { IPage } from "../routing/IPage";

export class UserActionsContainer implements IPage {
  isRequiredAuth: boolean;
  mount(): void {
    let txt: HTMLInputElement = document.getElementById("txt");
    txt?.addEventListener("change", (e: Event) => {
      console.log(e.target.value);
    });

    let btn: HTMLButtonElement = document.getElementById("btn");
    btn?.addEventListener("click", (e: Event) => {
      console.log("Tıklandı");

      //Router.render('home');
    });
  };

  render(): string {
    let result: string = ``
    const isLogged:boolean = true;
    const userType:number=2

    if(isLogged){
      if(userType===0){
        result = `<h1>Admin İşlemler</h1>` +
      `  <div class="border box-shadow text-center" style="margin-top: 10px;">
                <h3>İşlemler</h3>
                <hr style="margin: 0 auto; width:50%;border:2px solid black;opacity: 0.4;" class="w3-round">
                <ul id="actions" class="list-style-none">
                    <li class="btn btn-default btn-block" style="text-align: left;">
                    <button 
                            style="text-decoration: none;"><i class="fas fa-user-plus"
                                style="margin-right: 0.4rem;"></i>User Ekleme</button></li>

                    <li class="btn btn-default btn-block" style="text-align: left;">
                    <button
                            style="text-decoration: none;"><i class="fas fa-user-minus"
                                style="margin-right: 0.4rem;"></i>User Silme</button></li>

                    <li class="btn btn-default btn-block" style="text-align: left;">
                    <button
                            style="text-decoration: none;"><i class="fas fa-user-edit"
                                style="margin-right: 0.4rem;"></i>User Düzenleme</button></li>
                </ul>
            </div>
`;
      }

      else if(userType===1){
        result = `<h1>Kasiyer işlemleri</h1>`;
      }
    
    else{
      result = `<h1>Müşteri işlemleri</h1>`;
    }
    }

    return result;
  }
}
