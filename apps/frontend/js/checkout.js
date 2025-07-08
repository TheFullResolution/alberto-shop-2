import { CONFIG } from './config.js';

// Handles Primer.io checkout integration
export class CheckoutManager {
  // Create a client session with the server
  static async createClientSession(orderData) {
    try {
      const response = await fetch(`${CONFIG.SERVER_URL}/client-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderInfo: orderData }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create client session');
      }

      return await response.json();
    } catch (error) {
      console.error('Client session error:', error);
      throw error;
    }
  }

  // Initialize the Primer.io checkout widget
  static async initializeCheckout(clientToken) {
    // Hide the order form
    document.getElementById('order-form').style.display = 'none';

    // Show the checkout container
    const checkoutContainer = document.getElementById('checkout-container');
    checkoutContainer.classList.remove('hidden');

    // Set the client token on the checkout element
    const checkoutElement = document.querySelector('primer-checkout');
    checkoutElement.setAttribute('client-token', clientToken);

    // Set up event listeners for checkout events
    this.setupCheckoutEvents(checkoutElement);

    return checkoutElement;
  }

  // Set up event listeners for checkout
  static setupCheckoutEvents(checkoutElement) {
    // When checkout is ready
    checkoutElement.addEventListener('primer:ready', ({ detail: primer }) => {
      console.log('✅ Primer checkout ready');

      // Handle payment completion
      primer.onPaymentComplete = ({ payment, status, error }) => {
        this.handlePaymentResult(payment, status, error);
      };
    });

    // Track checkout state changes
    checkoutElement.addEventListener('primer:state-change', (event) => {
      console.log('🔄 Checkout state changed:', event.detail);
    });

    // Handle method selection
    checkoutElement.addEventListener('primer:methods-update', (event) => {
      console.log('💳 Payment methods updated:', event.detail);
    });
  }

  // Handle the result of a payment attempt
  static handlePaymentResult(payment, status, error) {
    const statusResult = document.getElementById('status-result');

    if (status === 'success') {
      statusResult.innerHTML = `
                <div class="success-message">
                    <strong>✅ Payment Successful!</strong><br>
                    Payment ID: ${payment.id}<br>
                    Amount: ${payment.amount} ${payment.currencyCode}
                </div>
            `;
      console.log('✅ Payment successful:', payment);
    } else if (status === 'pending') {
      statusResult.innerHTML = `
                <div class="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                    <strong>⏳ Payment Pending</strong><br>
                    Payment ID: ${payment.id}<br>
                    Please wait for confirmation
                </div>
            `;
      console.log('⏳ Payment pending:', payment);
    } else if (status === 'error') {
      statusResult.innerHTML = `
                <div class="error-message">
                    <strong>❌ Payment Failed</strong><br>
                    ${error.message || 'An error occurred during payment'}
                </div>
            `;
      console.error('❌ Payment failed:', error);
    }
  }
}
