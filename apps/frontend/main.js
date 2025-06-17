// Main application entry point
// This file coordinates all the different parts of the checkout

import { loadPrimer } from '@primer-io/primer-js';
import { FormUtils } from './js/form-utils.js';
import { CheckoutManager } from './js/checkout.js';
import { UIUtils } from './js/ui-utils.js';

// Start the app when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Alberto Shop - Starting up...');
    
    try {
        // Load the Primer.io SDK first
        await loadPrimer();
        console.log('✅ Primer.io SDK loaded successfully');
        
        // Set up the form and event listeners
        initializeApp();
        
    } catch (error) {
        console.error('❌ Failed to initialize app:', error);
        UIUtils.showStatus('Failed to load checkout system. Please refresh the page.', 'error');
    }
});

// Set up all the form functionality
function initializeApp() {
    console.log('🔧 Setting up form handlers...');
    
    // Get all the form elements
    const elements = FormUtils.getFormElements();
    
    // Set up the autofill button
    elements.autofillButton.addEventListener('click', () => {
        FormUtils.autofillForm();
        UIUtils.showStatus('Demo data filled successfully!', 'success');
    });
    
    // Set up the main submit button
    elements.submitButton.addEventListener('click', async () => {
        await handleCheckoutSubmission(elements);
    });
    
    console.log('✅ App initialized successfully');
}

// Handle when user clicks "Proceed to Checkout"
async function handleCheckoutSubmission(elements) {
    // First, validate all the form data
    const validation = FormUtils.validateForm();
    if (!validation.valid) {
        UIUtils.showStatus(validation.message, 'error');
        return;
    }
    
    // Show loading state
    UIUtils.setButtonLoading(elements.submitButton, true);
    UIUtils.showStatus('Creating checkout session...', 'info');
    
    try {
        // Build the order data from the form
        const orderData = FormUtils.buildOrderData(elements);
        console.log('📦 Order data prepared:', orderData);
        
        // Create a client session with our server
        const clientSession = await CheckoutManager.createClientSession(orderData);
        console.log('🎫 Client session created');
        
        // Check we got a valid client token
        if (!clientSession || !clientSession.clientToken) {
            throw new Error('No client token received from server');
        }
        
        // Initialize the Primer.io checkout widget
        await CheckoutManager.initializeCheckout(clientSession.clientToken);
        UIUtils.showStatus('Checkout ready! Choose your payment method below.', 'success');
        
    } catch (error) {
        console.error('💥 Checkout error:', error);
        UIUtils.showStatus(`Error: ${error.message}`, 'error');
        
    } finally {
        // Always remove loading state
        UIUtils.setButtonLoading(elements.submitButton, false);
    }
}