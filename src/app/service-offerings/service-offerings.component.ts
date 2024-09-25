import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerdetailsService } from '../customerdetails.service';
import { Router } from '@angular/router';
import { newCustomer } from '../app.component';

@Component({
  selector: 'app-service-offerings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './service-offerings.component.html',
  styleUrl: './service-offerings.component.scss',
})
export class ServiceOfferingsComponent implements OnInit {
  usaStates: string[] = [];

  newCustomerForm!: FormGroup;
  isModalVisible = false;
  isLoading: boolean = false;
  package: string = '';
  showSuccess: boolean = false;

  constructor(
    public CustomerdetailsService: CustomerdetailsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // formGroup -> formControlName
  }
  async ngOnInit() {
    this.usaStates = await this.CustomerdetailsService.loadCountries();

    const storedData = JSON.parse(localStorage.getItem('formData') || '{}');

    this.newCustomerForm = this.fb.group({
      fullname: [
        storedData.fullname || '',
        [Validators.required, Validators.minLength(2)],
      ],
      phone_number: [
        storedData.phone_number || '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      state: storedData.state || '',
      email: [storedData.email || '', [Validators.email]],
      company: storedData.company || '',
      package: this.package,
    });
  }
  async newCustomer() {
    this.isLoading = true;
    if (this.newCustomerForm.valid) {
      let customer_details: newCustomer = {
        ...this.newCustomerForm.value,
        phone_number: Number(this.newCustomerForm.value.phone_number), // Convert to number
      };
      console.log(customer_details);
      try {
        const userId = localStorage.getItem('id');
        if (userId) {
          const updateUser =
            await this.CustomerdetailsService.updateCustomer_details(
              customer_details
            );
          console.log('update_package done', updateUser);
          this.showSuccess = true;
          this.newCustomerForm.reset();
          localStorage.removeItem('id');
          localStorage.removeItem('formData');
        } else {
          const new_user =
            await this.CustomerdetailsService.newCustomer_details(
              customer_details
            );
          console.log('Customer details sent to service successfully');
          this.showSuccess = true;
          this.newCustomerForm.reset();
          localStorage.removeItem('id');
          localStorage.removeItem('formData');
        }
      } catch (error) {
        console.error('Error sending customer details:', error);
        // Optionally show an error message to the user
      }
    }
    this.isLoading = false;
  }

  showModal() {
    this.isModalVisible = true;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.isModalVisible = false;
    this.showSuccess = false;

    document.body.classList.remove('modal-open');
  }
  prefill_package(pack: string) {
    this.showModal();
    this.package = pack;
    this.newCustomerForm.patchValue({ package: this.package });
  }
}
