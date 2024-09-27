import { Component, OnInit, HostListener } from '@angular/core';
import { ServiceOfferingsComponent } from '../service-offerings/service-offerings.component';
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
  selector: 'app-frame-6',
  standalone: true,
  imports: [ServiceOfferingsComponent, ReactiveFormsModule],
  templateUrl: './frame-6.component.html',
  styleUrl: './frame-6.component.scss',
})
export class Frame6Component implements OnInit {
  isMobile: boolean = false;
  isLoading: boolean = false;
  usaStates: string[] = [];
  newCustomerForm!: FormGroup;
  isModalVisible = false;
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
    this.checkScreenSize();

    this.usaStates = await this.CustomerdetailsService.loadCountries();

    this.newCustomerForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(2)]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      state: ['', [Validators.required]],
      email: ['', [Validators.email]],
      company: ['', [Validators.required]],
      package: this.package,
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 480;
    if (this.isMobile) {
      // Your code for mobile screens here
      console.log('Screen size is less than 480px');
    }
  }

  isDropdown_gold: boolean = false;
  isDropdown_diamond: boolean = false;
  isDropdown_platinum: boolean = false;

  toggle_dropdown(serice_pack: string) {
    if (serice_pack == 'gold') {
      this.isDropdown_gold = !this.isDropdown_gold;
    } else if (serice_pack == 'diamond') {
      this.isDropdown_diamond = !this.isDropdown_diamond;
    } else {
      this.isDropdown_platinum = !this.isDropdown_platinum;
    }
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
          localStorage.removeItem('id');
          localStorage.removeItem('formData');
        } else {
          const new_user =
            await this.CustomerdetailsService.newCustomer_details(
              customer_details
            );
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
}
