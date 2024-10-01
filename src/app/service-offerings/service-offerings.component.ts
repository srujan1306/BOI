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
  errorMessage: string | null = null;
  constructor(
    public CustomerdetailsService: CustomerdetailsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // formGroup -> formControlName
  }
  async ngOnInit() {
    this.usaStates = await this.CustomerdetailsService.loadCountries();

    this.newCustomerForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(2)]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      state: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      package: [this.package],
    });
  }
  async newCustomer() {
    if (this.newCustomerForm.invalid) {
      this.errorMessage = 'Please fill in all the fields.';
      return;
    }
    this.isLoading = true;
    if (this.newCustomerForm.valid) {
      this.clear_fieldmissing_error();

      let customer_details: newCustomer = {
        ...this.newCustomerForm.value,
        phone_number: Number(this.newCustomerForm.value.phone_number), // Convert to number
      };
      try {
        const userId = localStorage.getItem('id');
        if (userId) {
          const updateUser =
            await this.CustomerdetailsService.updateCustomer_details(
              customer_details
            );
          this.showSuccess = true;
          this.newCustomerForm.reset();
          this.newCustomerForm.patchValue({ package: this.package });
          this.newCustomerForm.get('state')?.setValue('');

          localStorage.removeItem('id');
          localStorage.removeItem('formData');
        } else {
          const new_user =
            await this.CustomerdetailsService.newCustomer_details(
              customer_details
            );
          this.showSuccess = true;
          this.newCustomerForm.reset();
          this.newCustomerForm.patchValue({ package: this.package });
          this.newCustomerForm.get('state')?.setValue('');

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
    this.package = pack;
    this.newCustomerForm.patchValue({ package: this.package });
    this.newCustomerForm.patchValue(
      JSON.parse(localStorage.getItem('formData') || '{}')
    );
    this.showModal();
  }
  clear_fieldmissing_error() {
    this.errorMessage = null;
  }
  get fullname() {
    return this.newCustomerForm.get('fullname');
  }
  get phone_number() {
    return this.newCustomerForm.get('phone_number');
  }
  get email() {
    return this.newCustomerForm.get('email');
  }
  get state() {
    return this.newCustomerForm.get('state');
  }
  get company() {
    return this.newCustomerForm.get('company');
  }
}
