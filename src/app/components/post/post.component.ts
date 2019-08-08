import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {



  imgs:string[]=['/assets/perro-1.jpg','/assets/perro-2.jpg','/assets/perro-3.jpg'];
  @Input() post:Post={};
  constructor() { }

  ngOnInit() {
    
  }

}
