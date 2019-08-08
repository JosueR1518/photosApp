import { Component, OnInit, Input, ViewChild } from '@angular/core';



declare var mapboxgl:any ;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {



  @ViewChild ('mapa') mapa;
  @Input() coords:string;
  constructor() { }

  ngOnInit() {

    const coordenadas = this.coords.split(',');

    const ltd = Number(coordenadas[0]);
    const lgt = Number(coordenadas[1]);


    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zdWUxNTE4IiwiYSI6ImNqdm4yMnl5azEydWk0OHFqNmk2NnhxanEifQ.fB-RRU8DVy2_wgxcJJPfdA';
    const map = new mapboxgl.Map({
    container: this.mapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[lgt,ltd],
    zoom:15
    });


  const marker = new mapboxgl.Marker()
  .setLngLat([lgt,ltd])
  .addTo(map);
  }

}
