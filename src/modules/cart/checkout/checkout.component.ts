import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  isCheckOut: boolean = false;
  constructor(private checkout: FormBuilder) {
    this.checkoutForm = this.checkout.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]{3,}$')],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]{3,}$')],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9._%+-]+)@([a-z0-9.-]+).(com|eg)$'),
        ],
      ],
      address: ['', [Validators.required]],
      ddlCountry: ['', [Validators.required]],
      ddlState: ['', [Validators.required]],
      // payment:this.checkout.group({             //nested form group
      nameCard: ['', [Validators.required]],
      numberCard: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      Expiration: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{2}(/)[0-9]{2}$')],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],

      // })
    });
  }
  ngOnInit(): void {}

  get firstName() {
    return this.checkoutForm.get('firstName');
  }
  get lastName() {
    return this.checkoutForm.get('lastName');
  }
  get email() {
    return this.checkoutForm.get('email');
  }
  get address() {
    return this.checkoutForm.get('address');
  }
  // =========================================================
  get nameCard() {
    return this.checkoutForm.get('nameCard');
  }
  get numberCard() {
    return this.checkoutForm.get('numberCard');
  }
  get ddlCountry() {
    return this.checkoutForm.get('ddlCountry');
  }
  get ddlState() {
    return this.checkoutForm.get('ddlState');
  }
  get Expiration() {
    return this.checkoutForm.get('Expiration');
  }
  get cvv() {
    return this.checkoutForm.get('cvv');
  }
  showMessage() {
    this.isCheckOut = !this.isCheckOut;
  }
}
