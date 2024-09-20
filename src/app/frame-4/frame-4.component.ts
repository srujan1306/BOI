import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CustomerdetailsService } from '../customerdetails.service';
import { Router } from '@angular/router';
import { newCustomer } from '../app.component';
@Component({
  selector: 'app-frame-4',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './frame-4.component.html',
  styleUrl: './frame-4.component.scss',
})
export class Frame4Component {
  usaStates: string[] = [];
  phoneTouched = false;
  CustomerForm: FormGroup;
  constructor(
    public CustomerdetailsService: CustomerdetailsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // formGroup -> formControlName
    this.CustomerForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(2)]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      state: '',
      email: ['', [Validators.email]],
      company: '',
    });
  }
  async newCustomer() {
    if (this.CustomerForm.valid) {
      let newCustomer: newCustomer = {
        ...this.CustomerForm.value,
        phone_number: Number(this.CustomerForm.value.phone_number), // Convert to number
      };
      console.log(newCustomer);

      try {
        await this.CustomerdetailsService.newCustomer_details(newCustomer);
        console.log('Customer details sent to service successfully');
      } catch (error) {
        console.error('Error sending customer details:', error);
        // Optionally show an error message to the user
      }
    }
  }

  get fullname() {
    return this.CustomerForm.get('fullname');
  }
  get phone_number() {
    return this.CustomerForm.get('phone_number');
  }
  get email() {
    return this.CustomerForm.get('email');
  }
  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    fetch('country-state-city.json')
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
          this.usaStates = usa.States.map(
            (state: { StateName: any }) => state.StateName
          );
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
}
