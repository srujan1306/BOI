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
  newCustomer() {
    if (this.CustomerForm.valid) {
      let newCustomer: newCustomer = {
        ...this.CustomerForm.value,
        phone_number: Number(this.CustomerForm.value.phone_number), // Convert to number
      };
      console.log(newCustomer);

      this.CustomerdetailsService.newCustomer_details(newCustomer).then(() => {
        console.log('customer details sent to service successfully');
      });
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
}
