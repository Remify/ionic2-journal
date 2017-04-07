import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {keys} from '../app/keys';
import {Observable} from "rxjs";

/*
 Generated class for the GeoService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GeoService {


  constructor(public http: Http) {

  }

  generateUrl(latitude: number, longitude: number) {
    return 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude+ ','+ longitude +'&key=' + keys.maps
  }

  /**
   * Retourne la réponse au format Json de l'api google maps pour une position donnée
   * @param latitude
   * @param longitude
   * @returns {Observable<R>}
   */
  getLocation(latitude: number, longitude: number) :Observable<Response>{
    return this.http
                .get(this.generateUrl(latitude, longitude))
                .map(res => res.json())
  }

}
