// Configuration settings for the checkout
export const CONFIG = {
  // Server URL - configured via environment variables
  SERVER_URL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3001',

  // Demo data for quick testing
  DEMO_DATA: {
    quantity: 1,
    size: 'l',
    amount: '10100', // Amount in pence (£101.00)
    currency: 'GBP',
    customer: {
      firstName: 'Alberto',
      lastName: 'De Ronzi',
      email: 'alberto@primer.io',
      phone: '+447538690994',
    },
    address: {
      line1: '6 Blissett Street',
      line2: '',
      city: 'London',
      state: '',
      postalCode: 'SE10 8UP',
      country: 'GB',
    },
  },
};
