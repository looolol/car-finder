import { Injectable } from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AutoDevApiResponse} from "../models/auto-dev.api-response.model";
import {AutoDevApiCar} from "../models/auto-dev.api-car.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  readonly base_url: string = environment.autoDevApiUrl;
  auth_token: string = environment.autoDevApiKey;

  constructor(private http: HttpClient) { }

  getCars(searchParams: any): Observable<AutoDevApiCar[]> {
    let params = new HttpParams();

    for (const key in searchParams) {
      if (searchParams.hasOwnProperty(key)) {
        params = params.set(key, searchParams[key]);
      }
    }

    const url = `${this.base_url}?${params.toString()}`; // Constructing the URL
    console.log('Request URL:', url); // Logging the URL before making the request


    return this.http.get<AutoDevApiResponse>(this.base_url, { params })
      .pipe(
        tap(data => console.log('Received data: ', data)),
        map(response => response.records)
      );
  }


}
