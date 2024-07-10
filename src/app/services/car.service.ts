import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AutoDevApiResponse} from "../models/auto-dev.api-response.model";
import {environment} from "../../environments/environment";
import {AutoDevApiCarDetailed} from "../models/auto-dev.api-car-detailed.model";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  readonly base_url: string = environment.autoDevApiUrl;

  constructor(private http: HttpClient) { }

  getCars(searchParams: any): Observable<AutoDevApiResponse> {
    let params = new HttpParams();

    for (const key in searchParams) {
      if (searchParams.hasOwnProperty(key)) {
        params = params.set(key, searchParams[key]);
      }
    }

    const url = `${this.base_url}/listings?${params.toString()}`; // Constructing the URL
    console.log('Request URL:', url); // Logging the URL before making the request


    return this.http.get<AutoDevApiResponse>(`${this.base_url}/listings`, { params })
      .pipe(
        tap(data => console.log('Received data: ', data))
      );
  }

  getCarByVin(vin: string): Observable<AutoDevApiCarDetailed> {
    const url = `${this.base_url}/vin/${vin.toString()}`;
    console.log('Request URL:', url);

    return this.http.get<AutoDevApiCarDetailed>(url)
      .pipe(
        tap(data => console.log('Received data: ', data))
      );
  }


}
