import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  posts:Post[]=[];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild(IonRefresher) ionRefresher: IonRefresher;
  constructor(private postService:PostsService){



  }





  ngOnInit(): void {

    this.cargarPost()

    this.postService.nuevoPost.subscribe(post=>{

      this.posts.unshift(post);

            
    });
  }

  loadData(eventInfiniteScroll){
        this.cargarPost();


  }


  doRefresh(event){

    this.posts =[];

    this.cargarPost(true);
  }




  private cargarPost(pull?:boolean){


    this.postService.getPosts(pull).subscribe(data=>{

      if(data.posts.length > 0){
        this.posts.push(...data.posts);
        this.infiniteScroll.complete();
      }else{
          this.infiniteScroll.disabled=true;

      }


      if(pull){
        this.ionRefresher.complete();
        this.infiniteScroll.disabled= false;
      }
     

  });
  }
}
