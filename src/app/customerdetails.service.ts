import { Injectable } from '@angular/core';
import { newCustomer } from './app.component';
import { API } from './API';

@Injectable({
  providedIn: 'root',
})
export class CustomerdetailsService {
  constructor() {}
  newCustomer_details(newCustomer: newCustomer) {
    // Post
    // 1. method
    // 2. body - Data & JSON
    // 3. Header - JSON

    return fetch(`${API}/enquiry/details`, {
      method: 'POST',
      body: JSON.stringify(newCustomer),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
