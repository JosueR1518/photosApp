import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { MessageAlertService } from '../../services/message-alert.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  
  
  usuario:Usuario={};
  

  constructor(
    private usuarioService:UsuarioService,
    private messageService:MessageAlertService,
    private postService:PostsService){


  }
  ngOnInit(): void {

    this.usuario= this.usuarioService.getUsuario();
  }



  logout(){
      this.postService.pagePosts=0;
      this.usuarioService.logout();


  }




  async actualizar(fActulizar:NgForm){

    

      if(fActulizar.invalid){
        return;
      }
      console.log("hola mundo");

      const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);

      if(actualizado){
         this.messageService.presentToast('Usuario actualizado correctamente');
      }else{
        this.messageService.presentToast('Falló actualización de usuario');

      }
  }
}
