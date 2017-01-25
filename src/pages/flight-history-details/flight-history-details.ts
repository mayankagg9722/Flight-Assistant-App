import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FlightData } from '../../providers/flight-data';
import { ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { FlightHistoryPage } from '../flight-history/flight-history';
declare var google: any;
/*
  Generated class for the FlightHistoryDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-flight-history-details',
  templateUrl: 'flight-history-details.html',
  providers: [FlightData]
})

export class FlightHistoryDetailsPage {
  @ViewChild('map') mapElement: ElementRef;


  map: any;
  latitude: String;
  longitude: String;
  querry:Array<any>=['store'];
  constructor(public navCtrl: NavController, public navParams: NavParams, private flightData: FlightData,
    public toastCtrl: ToastController) {

    this.geoCodeAirport(this.navParams.get("airport") + " Airtport,India");

  }

  geoCodeAirport(airport) {
    this.flightData.geoCodeAirport(airport).subscribe(res => {
      if (res.status = "OK") {
        this.latitude = res.results["0"].geometry.location.lat.toString();
        this.longitude = res.results["0"].geometry.location.lng.toString();
        this.initMap(this.latitude, this.longitude);
      }
      else {
        let toast = this.toastCtrl.create({
          message: "Not able to detect Arrival location",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.push(FlightHistoryPage);
      }
    });
  }


  initMap(lat, lng) {
    const latLng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      center: latLng,
      zoom: 7,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.startService(latLng, this.map);
  }

  startService(latLng, map) {
    var infoWindow = new google.maps.InfoWindow();
    console.log("querry",this.querry);
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: latLng,
      radius: 500,
      type: this.querry
    }, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      } else {
        var bounds = new google.maps.LatLngBounds();
        // var placesList = document.getElementById('places');

        for (var i = 0, place; place = results[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // console.log(place);

          this.createMarker(results[i], map, image,infoWindow);

          // placesList.innerHTML += '<li>' + place.name + '</li>';

          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);

      }
    });
  }

  createMarker(place, map, image,infoWindow) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    this.createInfoWindow(place,map,marker,infoWindow);
  }

  createInfoWindow(place,map,marker,infoWindow){
      google.maps.event.addListener(marker, 'click', function () {

      infoWindow.setContent(place.name);
      infoWindow.open(map, marker);

    });
  }

  beerIcon(){
    this.querry=['night_club','liquor_store','casino','bar','cafe'];
    this.geoCodeAirport(this.navParams.get("airport") + " Airtport,India");
  }

  sportIcon(){
    this.querry=['stadium','atm'];
    this.geoCodeAirport(this.navParams.get("airport") + " Airtport,India");
  }

  foodIcon(){
    this.querry=['restaurant'];
    this.geoCodeAirport(this.navParams.get("airport") + " Airtport,India");
  }
  trainIcon(){
    this.querry=['train_station'];
    this.geoCodeAirport(this.navParams.get("airport") + " Airtport,India");
  }
  restIcon(){
    this.querry=['lodging'];
    this.geoCodeAirport(this.navParams.get("airport") + " Airtport,India");
  }


}