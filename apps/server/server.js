import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Primer.io configuration
const PRIMER_API_URLS = {
  SANDBOX: 'https://api.sandbox.primer.io',
  STAGING: 'https://api.staging.primer.io',
  PRODUCTION: 'https://api.primer.io',
  DEV: 'https://api.dev.primer.io',
};

const API_KEY = process.env.PRIMER_API_KEY;
const API_VERSION = process.env.PRIMER_API_VERSION || '2.2';
const PRIMER_API_URL =
  PRIMER_API_URLS[process.env.PRIMER_API_ENVIRONMENT || 'SANDBOX'];

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Alberto Shop Server - Ready for checkout!' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Create client session for Primer.io checkout
app.post('/client-session', async (req, res) => {
  console.log('Creating client session for Primer.io');

  const { orderInfo } = req.body;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Primer API key not configured' });
  }

  const requestBody = orderInfo || getDefaultOrderInfo();

  try {
    const response = await fetch(`${PRIMER_API_URL}/client-session`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Version': API_VERSION,
        'X-Api-Key': API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Primer API error:', data);
      return res.status(response.status).json(data);
    }

    console.log('Client session created successfully');
    res.json(data);
  } catch (error) {
    console.error('Error creating client session:', error);
    res.status(500).json({ error: 'Failed to create client session' });
  }
});

// Generate default order info
const getDefaultOrderInfo = () => {
  return {
    orderId: 'order-' + Math.random().toString(36).substring(7),
    customerId: 'customer-' + Math.random().toString(36).substring(7),
    amount: 10100,
    currencyCode: 'GBP',
    customer: {
      firstName: 'Alberto',
      lastName: 'De Ronzi',
      emailAddress: 'alberto@primer.io',
      mobileNumber: '+447538690994',
      billingAddress: {
        firstName: 'Alberto',
        lastName: 'De Ronzi',
        addressLine1: '6 Blissett Street',
        city: 'London',
        postalCode: 'SE10 8UP',
        countryCode: 'GB',
      },
    },
    order: {
      lineItems: [
        {
          itemId: 'lego-saturn-v',
          description: 'LEGO Saturn V Rocket',
          amount: 10100,
          quantity: 1,
        },
      ],
      countryCode: 'GB',
    },
    paymentMethod: {
      paymentType: 'FIRST_PAYMENT',
      vaultOnSuccess: false,
    },
  };
};

app.listen(PORT, () => {
  console.log(`Alberto Shop server running on port ${PORT}`);
  console.log(
    `Primer API Environment: ${process.env.PRIMER_API_ENVIRONMENT || 'SANDBOX'}`
  );
  console.log(`Visit: http://localhost:${PORT}`);
});
