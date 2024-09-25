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
  isModalVisible = false;
  isLoading: boolean = false;
  errorMessage: string | null = null;

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
      state: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
    });
  }
  async ngOnInit(): Promise<void> {
    this.usaStates = await this.CustomerdetailsService.loadCountries();
  }

  async newCustomer() {
    if (this.CustomerForm.invalid) {
      this.errorMessage = 'Please fill in all the fields.';
      return;
    }
    this.isLoading = true;
    if (this.CustomerForm.valid) {
      this.clear_fieldmissing_error();
      let newCustomer: newCustomer = {
        ...this.CustomerForm.value,
        phone_number: Number(this.CustomerForm.value.phone_number), // Convert to number
      };
      console.log(newCustomer);

      try {
        const new_user = await this.CustomerdetailsService.newCustomer_details(
          newCustomer
        );
        console.log('Customer details sent to service successfully');
        localStorage.setItem(
          'formData',
          JSON.stringify(this.CustomerForm.value)
        );
        localStorage.setItem('id', new_user.id);
        this.showModal();
        this.CustomerForm.reset();
      } catch (error) {
        console.error('Error sending customer details:', error);
        // Optionally show an error message to the user
      }
    }
    this.isLoading = false;
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
  get state() {
    return this.CustomerForm.get('state');
  }
  get company() {
    return this.CustomerForm.get('company');
  }

  showModal() {
    this.isModalVisible = true;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.isModalVisible = false;
    document.body.classList.remove('modal-open');
  }
  clear_fieldmissing_error() {
    this.errorMessage = null;
  }
}
