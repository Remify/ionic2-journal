import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { keys } from '../app/keys';
import { Observable } from "rxjs";

/**
 * Service pour attaque l'API de Google Maps
 */
@Injectable()
export class GeoService {


  constructor(public http: Http) {

  }

  // Genere l'URL pour récupèrer les info sur une position 
  generateUrl(latitude: number, longitude: number) {
    return 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + keys.maps
  }

  /**
   * Retourne la réponse au format Json de l'api google maps pour une position donnée
   * @param latitude
   * @param longitude
   * @returns {Observable<R>}
   */
  getLocation(latitude: number, longitude: number): Observable<Response> {
    return this.http
      .get(this.generateUrl(latitude, longitude))
      .map(res => res.json())
  }

}
