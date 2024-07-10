import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AutoDevApiResponse} from "../models/auto-dev.api-response.model";
import {environment} from "../../environments/environment";

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

    const url = `${this.base_url}?${params.toString()}`; // Constructing the URL
    console.log('Request URL:', url); // Logging the URL before making the request


    return this.http.get<AutoDevApiResponse>(this.base_url, { params })
      .pipe(
        tap(data => console.log('Received data: ', data))
      );
  }


}
