import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { MessageAlertService } from '../../services/message-alert.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  @ViewChild ('slideLogin')  slideLogin:IonSlides;
 
loginUser:any={
    email:'test@ejemplo.com',
    password:'123456'
};

registroUser:Usuario={
    nombre:'test',
    email:'test@test.com',
    password:'123456',
    avatar:'av-1.png'

};

  constructor(
    private usuarioService:UsuarioService,
    private navCtrl:NavController,
    private messageAlert:MessageAlertService) { }

  ngOnInit() {


    this.slideLogin.lockSwipes(true);
  }



  async login(fLogin:NgForm){


    if(!fLogin.valid)
      {return;
      }
      

     const valido = await  this.usuarioService.login(this.loginUser.email,this.loginUser.password);

     if(valido){
        this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});

     }else{

   this.messageAlert.presentAlert('Usuario/contraseña invalidos');

     }
    
  }

  async registrar(fregistro:NgForm){

    if(!fregistro.valid){
      return;
    }

   const creado = await this.usuarioService.registro(this.registroUser);
   if(creado){
        this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});

    }else{

    this.messageAlert.presentAlert('Correo ya existe');

    }
    
  }






  mostrarLogin(){

    this.slideLogin.lockSwipes(false);
    this.slideLogin.slideTo(0);

    this.slideLogin.lockSwipes(true);
  }


  mostrarRegistro(){

    this.slideLogin.lockSwipes(false);
    this.slideLogin.slideTo(1);

    this.slideLogin.lockSwipes(true);
  }
}
