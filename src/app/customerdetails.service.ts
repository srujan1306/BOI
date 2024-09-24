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
  updateCustomer_details(newCustomer: newCustomer) {
    // Post
    // 1. method
    // 2. body - Data & JSON
    // 3. Header - JSON
    const userId = localStorage.getItem('id');
    return fetch(`${API}/enquiry/details/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(newCustomer),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  loadCountries(): Promise<string[]> {
    return fetch('country-state-city.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const usa = data.Countries.find(
          (country: { CountryName: string }) =>
            country.CountryName === 'United States'
        );

        if (usa) {
          return usa.States.map(
            (state: { StateName: string }) => state.StateName
          );
        }

        return [];
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        return [];
      });
  }
}
