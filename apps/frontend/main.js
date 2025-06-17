import { loadPrimer } from '@primer-io/primer-js';

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Alberto Shop - Initializing checkout');
    
    // Load Primer.io SDK
    await loadPrimer();
    
    initializeForm();
});

function initializeForm() {
    // Form elements
    const quantity = document.getElementById('quantity');
    const size = document.getElementById('size');
    const amount = document.getElementById('amount');
    const currency = document.getElementById('currency');
    
    // Customer details
    const customerDetails = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        emailAddress: document.getElementById('email-address'),
        mobileNumber: document.getElementById('mobile-number')
    };
    
    // Billing address
    const billingAddress = {
        addressLine1: document.getElementById('address-line1'),
        addressLine2: document.getElementById('address-line2'),
        city: document.getElementById('city'),
        state: document.getElementById('state'),
        postalCode: document.getElementById('postal-code'),
        country: document.getElementById('country')
    };
    
    // Buttons
    const autofillButton = document.getElementById('autofill-button');
    const submitButton = document.getElementById('submit-button');
    const statusResult = document.getElementById('status-result');
    
    // Autofill functionality
    autofillButton.addEventListener('click', () => {
        quantity.value = 1;
        size.value = 'l';
        amount.value = '10100';
        currency.value = 'GBP';
        
        customerDetails.firstName.value = 'Alberto';
        customerDetails.lastName.value = 'De Ronzi';
        customerDetails.emailAddress.value = 'alberto@primer.io';
        customerDetails.mobileNumber.value = '+447538690994';
        
        billingAddress.addressLine1.value = '6 Blissett Street';
        billingAddress.addressLine2.value = '';
        billingAddress.city.value = 'London';
        billingAddress.state.value = '';
        billingAddress.postalCode.value = 'SE10 8UP';
        billingAddress.country.value = 'GB';
        
        showStatus('Demo data filled successfully!', 'success');
    });
    
    // Submit form and initialize checkout
    submitButton.addEventListener('click', async () => {
        if (!validateForm()) {
            return;
        }
        
        try {
            showStatus('Creating checkout session...', 'info');
            
            const orderInfo = buildOrderInfo();
            const clientSession = await createClientSession(orderInfo);
            
            if (clientSession && clientSession.clientToken) {
                await initializeCheckout(clientSession.clientToken);
            } else {
                throw new Error('Failed to get client token');
            }
        } catch (error) {
            console.error('Checkout initialization error:', error);
            showStatus(`Error: ${error.message}`, 'error');
        }
    });
    
    function validateForm() {
        if (parseInt(quantity.value) < 1) {
            showStatus('Please enter a quantity of at least 1', 'error');
            return false;
        }
        
        // Check required customer details
        for (const [key, element] of Object.entries(customerDetails)) {
            if (!element.value.trim()) {
                showStatus(`Please fill out ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
                return false;
            }
        }
        
        // Check required billing address fields
        const requiredFields = ['addressLine1', 'city', 'postalCode', 'country'];
        for (const field of requiredFields) {
            if (!billingAddress[field].value.trim()) {
                showStatus(`Please fill out ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
                return false;
            }
        }
        
        return true;
    }
    
    function buildOrderInfo() {
        return {
            orderId: 'order-' + Math.random().toString(36).substring(7),
            customerId: 'customer-' + Math.random().toString(36).substring(7),
            amount: parseInt(amount.value),
            currencyCode: currency.value,
            customer: {
                firstName: customerDetails.firstName.value,
                lastName: customerDetails.lastName.value,
                emailAddress: customerDetails.emailAddress.value,
                mobileNumber: customerDetails.mobileNumber.value,
                billingAddress: {
                    firstName: customerDetails.firstName.value,
                    lastName: customerDetails.lastName.value,
                    addressLine1: billingAddress.addressLine1.value,
                    addressLine2: billingAddress.addressLine2.value || undefined,
                    city: billingAddress.city.value,
                    state: billingAddress.state.value || undefined,
                    postalCode: billingAddress.postalCode.value,
                    countryCode: billingAddress.country.value
                },
                shippingAddress: {
                    firstName: customerDetails.firstName.value,
                    lastName: customerDetails.lastName.value,
                    addressLine1: billingAddress.addressLine1.value,
                    addressLine2: billingAddress.addressLine2.value || undefined,
                    city: billingAddress.city.value,
                    state: billingAddress.state.value || undefined,
                    postalCode: billingAddress.postalCode.value,
                    countryCode: billingAddress.country.value
                }
            },
            order: {
                lineItems: [{
                    itemId: 'lego-saturn-v',
                    name: `${quantity.value} LEGO Saturn V - ${size.value.toUpperCase()}`,
                    description: `${quantity.value} ${size.value.toUpperCase()} LEGO Saturn V Rocket`,
                    amount: parseInt(amount.value),
                    quantity: parseInt(quantity.value)
                }],
                countryCode: billingAddress.country.value
            },
            paymentMethod: {
                paymentType: 'FIRST_PAYMENT',
                vaultOnSuccess: false
            },
            metadata: {
                source: 'alberto-shop',
                size: size.value
            }
        };
    }
    
    async function createClientSession(orderInfo) {
        const response = await fetch('http://localhost:3001/client-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderInfo })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create client session');
        }
        
        return await response.json();
    }
    
    async function initializeCheckout(clientToken) {
        // Hide order form and show checkout
        document.getElementById('order-form').style.display = 'none';
        document.getElementById('checkout-container').classList.remove('hidden');
        
        // Set client token
        const checkoutElement = document.querySelector('primer-checkout');
        checkoutElement.setAttribute('client-token', clientToken);
        
        // Listen for checkout events
        checkoutElement.addEventListener('primer:ready', ({ detail: primer }) => {
            console.log('Primer checkout ready');
            
            primer.onPaymentComplete = ({ payment, status, error }) => {
                if (status === 'success') {
                    showStatus(`Payment successful! Payment ID: ${payment.id}`, 'success');
                    console.log('✅ Payment successful:', payment);
                } else if (status === 'pending') {
                    showStatus(`Payment pending. Payment ID: ${payment.id}`, 'info');
                    console.log('⏳ Payment pending:', payment);
                } else if (status === 'error') {
                    showStatus(`Payment failed: ${error.message}`, 'error');
                    console.error('❌ Payment failed:', error);
                }
            };
        });
        
        checkoutElement.addEventListener('primer:state-change', (event) => {
            console.log('Checkout state changed:', event.detail);
        });
        
        showStatus('Checkout initialized successfully!', 'success');
    }
    
    function showStatus(message, type = 'info') {
        const statusClass = {
            success: 'success-message',
            error: 'error-message',
            info: 'bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md'
        };
        
        statusResult.innerHTML = `<div class="${statusClass[type]}">${message}</div>`;
        
        // Auto-hide info messages after 5 seconds
        if (type === 'info') {
            setTimeout(() => {
                statusResult.innerHTML = '';
            }, 5000);
        }
    }
}