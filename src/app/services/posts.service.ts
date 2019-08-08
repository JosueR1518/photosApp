import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';




const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class PostsService {


  pagePosts:number=0;
  nuevoPost = new EventEmitter<Post>();

  constructor(private http:HttpClient,
    private usuarioService:UsuarioService,
    private fileTransfer:FileTransfer) { }




  getPosts(pullRefresh:boolean=false){


    if(pullRefresh){
      this.pagePosts=0;
    }
    
     this.pagePosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.pagePosts}`);
  }



  createPost(post:any){


    const headers = new HttpHeaders({ 
      'x-token':this.usuarioService.token
    });

    return new Promise(resolve=>{
      this.http.post(`${URL}/posts`,post,{headers}).subscribe(resp=>{


        this.nuevoPost.emit(resp['post']);

        resolve(true);

      });
    });

    

  }


  subirImagen(img:string){

    const options:FileUploadOptions = {
      fileKey:'image',
      headers:{
        'x-token':this.usuarioService.token
      }
    };


    const fileTransfer:FileTransferObject = this.fileTransfer.create();


    fileTransfer.upload(img,`${URL}/posts/upload`,options).then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);


    });

  }
  
}
