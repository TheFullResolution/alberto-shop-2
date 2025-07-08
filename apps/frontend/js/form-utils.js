import { CONFIG } from './config.js';

// Helper functions for form handling
export class FormUtils {
  // Get all form elements in one place
  static getFormElements() {
    return {
      // Order details
      quantity: document.getElementById('quantity'),
      size: document.getElementById('size'),
      amount: document.getElementById('amount'),
      currency: document.getElementById('currency'),

      // Customer details
      customer: {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        emailAddress: document.getElementById('email-address'),
        mobileNumber: document.getElementById('mobile-number'),
      },

      // Billing address
      address: {
        addressLine1: document.getElementById('address-line1'),
        addressLine2: document.getElementById('address-line2'),
        city: document.getElementById('city'),
        state: document.getElementById('state'),
        postalCode: document.getElementById('postal-code'),
        country: document.getElementById('country'),
      },

      // Buttons
      autofillButton: document.getElementById('autofill-button'),
      submitButton: document.getElementById('submit-button'),
    };
  }

  // Fill form with demo data for testing
  static autofillForm() {
    const elements = this.getFormElements();
    const demo = CONFIG.DEMO_DATA;

    // Fill order details
    elements.quantity.value = demo.quantity;
    elements.size.value = demo.size;
    elements.amount.value = demo.amount;
    elements.currency.value = demo.currency;

    // Fill customer details
    elements.customer.firstName.value = demo.customer.firstName;
    elements.customer.lastName.value = demo.customer.lastName;
    elements.customer.emailAddress.value = demo.customer.email;
    elements.customer.mobileNumber.value = demo.customer.phone;

    // Fill address
    elements.address.addressLine1.value = demo.address.line1;
    elements.address.addressLine2.value = demo.address.line2;
    elements.address.city.value = demo.address.city;
    elements.address.state.value = demo.address.state;
    elements.address.postalCode.value = demo.address.postalCode;
    elements.address.country.value = demo.address.country;
  }

  // Check if all required fields are filled
  static validateForm() {
    const elements = this.getFormElements();

    // Check quantity is at least 1
    if (parseInt(elements.quantity.value) < 1) {
      return { valid: false, message: 'Please enter a quantity of at least 1' };
    }

    // Check customer details are filled
    for (const [key, element] of Object.entries(elements.customer)) {
      if (!element.value.trim()) {
        const fieldName = key.replace(/([A-Z])/g, ' $1').toLowerCase();
        return { valid: false, message: `Please fill out ${fieldName}` };
      }
    }

    // Check required address fields
    const requiredAddressFields = [
      'addressLine1',
      'city',
      'postalCode',
      'country',
    ];
    for (const field of requiredAddressFields) {
      if (!elements.address[field].value.trim()) {
        const fieldName = field.replace(/([A-Z])/g, ' $1').toLowerCase();
        return { valid: false, message: `Please fill out ${fieldName}` };
      }
    }

    return { valid: true };
  }

  // Build order data for Primer.io API
  static buildOrderData(elements) {
    return {
      // Generate unique IDs for this order
      orderId: 'order-' + Math.random().toString(36).substring(7),
      customerId: 'customer-' + Math.random().toString(36).substring(7),

      // Order totals
      amount: parseInt(elements.amount.value),
      currencyCode: elements.currency.value,

      // Customer information
      customer: {
        firstName: elements.customer.firstName.value,
        lastName: elements.customer.lastName.value,
        emailAddress: elements.customer.emailAddress.value,
        mobileNumber: elements.customer.mobileNumber.value,

        // Billing address
        billingAddress: {
          firstName: elements.customer.firstName.value,
          lastName: elements.customer.lastName.value,
          addressLine1: elements.address.addressLine1.value,
          addressLine2: elements.address.addressLine2.value || undefined,
          city: elements.address.city.value,
          state: elements.address.state.value || undefined,
          postalCode: elements.address.postalCode.value,
          countryCode: elements.address.country.value,
        },

        // Shipping address (same as billing for this demo)
        shippingAddress: {
          firstName: elements.customer.firstName.value,
          lastName: elements.customer.lastName.value,
          addressLine1: elements.address.addressLine1.value,
          addressLine2: elements.address.addressLine2.value || undefined,
          city: elements.address.city.value,
          state: elements.address.state.value || undefined,
          postalCode: elements.address.postalCode.value,
          countryCode: elements.address.country.value,
        },
      },

      // Order items
      order: {
        lineItems: [
          {
            itemId: 'lego-saturn-v',
            name: `${elements.quantity.value} LEGO Saturn V - ${elements.size.value.toUpperCase()}`,
            description: `${elements.quantity.value} ${elements.size.value.toUpperCase()} LEGO Saturn V Rocket`,
            amount: parseInt(elements.amount.value),
            quantity: parseInt(elements.quantity.value),
          },
        ],
        countryCode: elements.address.country.value,
      },

      // Payment settings
      paymentMethod: {
        paymentType: 'FIRST_PAYMENT',
        vaultOnSuccess: false,
      },

      // Extra information
      metadata: {
        source: 'alberto-shop',
        size: elements.size.value,
      },
    };
  }
}
