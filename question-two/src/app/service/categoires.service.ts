import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoiresService {
  constructor(private http: HttpClient) {}

  getCategoriesData() {
    return this.http.get('https://api.publicapis.org/categories');
  }
}
