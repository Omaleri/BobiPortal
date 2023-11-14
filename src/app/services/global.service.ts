import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  /**
   * Sabit Url
   */
  public baseUrl='https://localhost:7152/api';

  constructor() { }
}
