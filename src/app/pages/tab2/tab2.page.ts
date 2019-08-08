import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';




declare var window:any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
 


  tempImages:any[]=[];
  cargandoGeo=false;
  post:any = {
    mensaje:'',
    coords:null,
    posicion:false
  };
  constructor(
    private postService:PostsService,
    private route:Router,
    private geo:Geolocation,
    private camera:Camera){



  }

  ngOnInit(): void {

  }


  async crearPost(){

        const nuevo= await this.postService.createPost(this.post);



        this.post = {
          mensaje:'',
          coords:null,
          posicion:false
        };


        this.tempImages=[];
        this.route.navigateByUrl('/main/tabs/tab1');



  }


  getGeo(){



    if(!this.post.posicion){
      this.post.coords = null;
      return;
    }

    this.cargandoGeo= true;


    this.geo.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude


      const coords= `${resp.coords.latitude},${resp.coords.longitude}`;

      this.post.coords = coords;
      this.cargandoGeo=false; 
     }).catch((error) => {
       console.log('Error getting location', error);

       this.cargandoGeo=false;
     });
     


  }



  camara(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.procesarImagen(options);
  }


  libreria(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.procesarImagen(options);
  }




  procesarImagen(options:CameraOptions){

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
 
 
 
      /**
       * se omite trabajar con toBase64String, al ser varias imagenes puede ser pesado para la App
       * 
       * let base64Image = 'data:image/jpeg;base64,' + imageData;
       *
       */
 
 
       const img = window.Ionic.WebView.convertFileSrc(imageData);
 
 
       this.tempImages.push(img);
       this.postService.subirImagen(imageData);
 
 
     }, (err) => {
      // Handle error
     });

  }
}
