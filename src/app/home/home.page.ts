import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: google.maps.Map;
  minhaPosicao: google.maps.LatLng;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  constructor(private geolocation: Geolocation) {}

  ionViewWillEnter() {
    this.exibirMapa();
  }


  exibirMapa() {
    const posicao = new google.maps.LatLng(-22.604148231170356, -48.79615534372957);
    
    const opcoes = {

      center: posicao,
      zoom: 1,
      disableDefaultUI: true
    };


    this.map = new google.maps.Map(this.mapRef.nativeElement, opcoes);

    this.buscarPosicao();
  }


  buscarPosicao() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      this.minhaPosicao = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      this.irParaMinhaPosicao();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  irParaMinhaPosicao() {
    this.map.setCenter(this.minhaPosicao);
    this.map.setZoom(15);

    const marker = new google.maps.Marker({
      position: this.minhaPosicao,
      title: 'Minha Posição!',
      animation: google.maps.Animation.BOUNCE,
      map: this.map
    });
  }

}
