import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { PostsService } from './posts.service';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  token:string=null;
  private usuario:Usuario={};


  constructor(
    private http:HttpClient,
    private storage:Storage,
    private navCtrl:NavController) { }


    login(email:string,password:string){


      return new Promise((resolve,reject)=>{
        const data = {email,password};
    
        this.http.post(`${URL}/user/login`,data).subscribe(async resp=>{
         console.log(resp);
  
         if(resp['ok']){
              await this.guardarToken(resp['token']);
             resolve(true);
         }else{
           this.token = null;
           this.storage.clear();
           resolve(false);
         }
       });
  

      });
    }

    logout(){

      this.usuario= null;
      this.token = null;
      this.storage.clear();

      this.navCtrl.navigateRoot('/login');



    }

    registro(usuario:Usuario){



      return new Promise((resolve,reject)=>{
        this.http.post(`${URL}/user/create`,usuario).subscribe(async resp=>{
   
          if(resp['ok']){
              await this.guardarToken(resp['token']);
              resolve(true);
          }else{
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });

      });


    }




    async guardarToken(token:string){

      this.token = token;
      await this.storage.set('token',token);

     await  this.validarToken();

    }



   async validarToken():Promise<boolean>{


     await  this.cargarToken();
     if(this.token==null){
       this.navCtrl.navigateRoot('/login');
       return Promise.resolve(false);
     }
      return new Promise<boolean>(resolve=>{
          const headers = new HttpHeaders({'x-token':this.token});
          this.http.get(`${URL}/user/`,{headers}).subscribe(resp=>{
            if(resp['ok']){
             this.usuario = resp['usuario'];
             
             resolve(true);
          }else{
              this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
          });
      });

      
    }

   async cargarToken(){


       this.token = await this.storage.get('token') || null;
    }


    getUsuario(){

      if(!this.usuario._id){
        this.validarToken();
      }


      return {...this.usuario};

    }


    actualizarUsuario(usuario:Usuario):Promise<boolean>{

      const headers = new HttpHeaders({'x-token':this.token});


      return new Promise<boolean>(resolve=>{
        this.http.post(`${URL}/user/update`,usuario,{headers}).subscribe(resp=>{
          if(resp['ok']){
            this.guardarToken(resp['token']);
            resolve(true);
          }else{
            resolve(false);
          }
    });
      });
      

    }
}
