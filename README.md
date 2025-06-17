# Alberto Shop - Primer.io Checkout Demo

A modern e-commerce checkout demo built with TurboRepo, featuring Primer.io's Universal Checkout for payment processing. This project demonstrates how to integrate Primer.io's payment system into a simple online store selling LEGO products.

## 🎯 What This Project Does

This is a **demonstration checkout system** that shows how to:
- Collect customer information through a web form
- Process payments using Primer.io's Universal Checkout
- Handle the complete checkout flow from product selection to payment completion

**Perfect for:** Solution engineers, demos, testing Primer.io integrations, and learning how modern checkout systems work.

## 🏗️ What is TurboRepo?

**TurboRepo** is a tool that helps manage multiple related applications in one repository (called a "monorepo"). Think of it like a filing cabinet that keeps related projects organized together.

### Why TurboRepo?
- **Keeps things together**: Frontend and backend code in one place
- **Shared commands**: Run both apps with one command
- **Fast builds**: Only rebuilds what changed
- **Easy to manage**: One repository instead of juggling multiple projects

### Our Structure
```
alberto-shop-2/
├── apps/
│   ├── frontend/     ← The website customers see
│   └── server/       ← The backend that talks to Primer.io
├── package.json      ← Main configuration
└── turbo.json        ← TurboRepo settings
```

## 📁 Project Structure Explained

### Frontend (`apps/frontend/`)
The customer-facing website where people fill out forms and make payments.

```
apps/frontend/
├── index.html          ← Main webpage
├── main.js            ← App coordinator (starts everything)
├── style.css          ← Styling with Tailwind CSS
├── js/
│   ├── config.js      ← Settings (server URL, demo data)
│   ├── form-utils.js  ← Form handling (validation, data processing)
│   ├── checkout.js    ← Primer.io integration
│   └── ui-utils.js    ← User interface helpers
└── public/
    └── lego.jpg       ← Product image
```

### Backend (`apps/server/`)
The server that communicates with Primer.io's API to process payments.

```
apps/server/
├── server.js          ← Main server code
├── .env.example       ← Environment variables template
└── package.json       ← Server dependencies
```

## 🚀 Getting Started

### Prerequisites
You need **Node.js** installed on your computer. 
- Download from: https://nodejs.org
- Choose the "LTS" (recommended) version
- This also installs `npm` (Node Package Manager)

### Step 1: Get Your Primer.io API Key
1. Log into your Primer.io dashboard
2. Go to **Settings** → **API Keys**
3. Copy your **Test API Key** (starts with `test_`)

### Step 2: Set Up the Project

1. **Clone or download** this repository to your computer

2. **Open Terminal/Command Prompt** and navigate to the project folder:
   ```bash
   cd alberto-shop-2
   ```

3. **Install all dependencies**:
   ```bash
   npm install
   ```
   This downloads all the required code libraries.

4. **Configure your API key**:
   ```bash
   # Copy the environment template
   cp apps/server/.env.example apps/server/.env
   ```
   
   Then edit `apps/server/.env` and add your Primer.io API key:
   ```
   PRIMER_API_KEY=your_actual_api_key_here
   PRIMER_API_VERSION=2.2
   PRIMER_API_ENVIRONMENT=SANDBOX
   PORT=3001
   ```

### Step 3: Run the Application

**Start both frontend and backend**:
```bash
npm run dev
```

This command:
- Starts the backend server on `http://localhost:3001`
- Starts the frontend website on `http://localhost:5173`
- Opens both in development mode (auto-reloads when you change code)

### Step 4: Test the Checkout

1. **Open your browser** to `http://localhost:5173`
2. **Click "Autofill Demo Data"** to populate the form quickly
3. **Click "Proceed to Checkout"** to start the payment process
4. **Use test payment methods** (Primer.io provides test card numbers)

## 🛠️ Available Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start both apps in development mode |
| `npm run build` | Build both apps for production |
| `npm start` | Start production version |
| `npm run clean` | Clean build files |

### Individual App Commands

**Frontend only:**
```bash
cd apps/frontend
npm run dev     # Start frontend only
npm run build   # Build frontend for production
```

**Backend only:**
```bash
cd apps/server
npm run dev     # Start server only
npm start       # Start server in production mode
```

## ⚙️ Configuration & Customization

### 🎛️ Server Configuration (`apps/server/.env`)

```bash
# Your Primer.io API key (required)
PRIMER_API_KEY=test_your_key_here

# API version (usually 2.2)
PRIMER_API_VERSION=2.2

# Environment: SANDBOX, STAGING, or PRODUCTION
PRIMER_API_ENVIRONMENT=SANDBOX

# Port the server runs on
PORT=3001
```

### 🎨 Frontend Configuration (`apps/frontend/js/config.js`)

Easy to modify settings:

```javascript
export const CONFIG = {
    // Change if your server runs on different port
    SERVER_URL: 'http://localhost:3001',
    
    // Modify demo data for testing
    DEMO_DATA: {
        quantity: 1,
        amount: '10100', // Amount in pence
        currency: 'GBP',
        customer: {
            firstName: 'Your Name',
            // ... etc
        }
    }
};
```

### 🎨 Styling (`apps/frontend/style.css`)

The project uses **Tailwind CSS** for styling. Key customizations:

```css
/* Product image height */
.product-image {
  @apply w-full h-[32rem] object-cover rounded-lg shadow-md;
}

/* Primer.io checkout styling */
primer-checkout {
  --primer-color-primary: #2563eb;
  --primer-border-radius: 8px;
}
```

## 🧪 Testing

### Test Payment Methods

Primer.io provides test card numbers for different scenarios:

| Card Number | Result |
|------------|--------|
| `4000 0000 0000 0002` | Successful payment |
| `4000 0000 0000 0127` | Insufficient funds |
| `4000 0000 0000 0119` | Processing error |

**Expiry:** Any future date  
**CVV:** Any 3 digits  
**Name:** Any name

### Demo Data

Click "Autofill Demo Data" to quickly fill the form with:
- Customer: Alberto De Ronzi
- Email: alberto@primer.io
- Address: 6 Blissett Street, London
- Amount: £101.00 for LEGO Saturn V

## 🐛 Troubleshooting

### Common Issues

**❌ "Failed to create client session"**
- Check your API key in `.env` file
- Make sure server is running (`npm run dev`)
- Verify API key is valid in Primer.io dashboard

**❌ "Could not connect to server"**
- Server might not be running
- Check if port 3001 is available
- Look for error messages in terminal

**❌ "Payment failed"**
- Use test card numbers provided above
- Check Primer.io dashboard for payment status
- Verify your account has test mode enabled

**❌ "Module not found" errors**
- Run `npm install` in the main directory
- Delete `node_modules` folder and run `npm install` again

### Getting Help

1. **Check the browser console** (F12 → Console tab)
2. **Check terminal/command prompt** for server errors
3. **Verify environment variables** in `.env` file
4. **Test with demo data** first before custom data

## 📝 Making Changes

### 🎯 Common Modifications

**Change the product:**
1. Replace `apps/frontend/public/lego.jpg` with your image
2. Update product name and price in `apps/frontend/index.html`
3. Modify demo data in `apps/frontend/js/config.js`

**Add new form fields:**
1. Add HTML input in `apps/frontend/index.html`
2. Update form handling in `apps/frontend/js/form-utils.js`
3. Modify validation logic if needed

**Change styling:**
1. Edit `apps/frontend/style.css` for custom styles
2. Modify Tailwind classes in HTML
3. Customize Primer.io appearance with CSS variables

**Server modifications:**
1. Main server logic in `apps/server/server.js`
2. Add new API endpoints as needed
3. Modify order data structure

### 🔧 Development Workflow

1. **Make changes** to files
2. **Save** - apps auto-reload in development mode
3. **Test** in browser
4. **Check console** for any errors
5. **Commit changes** when working

## 🚀 Deployment

### For Production

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Set production environment variables:**
   ```bash
   PRIMER_API_ENVIRONMENT=PRODUCTION
   PRIMER_API_KEY=your_production_key
   ```

3. **Deploy both apps** to your hosting platform

### Recommended Platforms
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Backend:** Railway, Heroku, Digital Ocean
- **Full-stack:** Vercel (both frontend + serverless backend)

## 📚 Learning Resources

### Primer.io Documentation
- [Universal Checkout Guide](https://primer.io/docs/checkout/universal-checkout)
- [API Reference](https://primer.io/docs/api-reference)
- [Test Cards](https://primer.io/docs/testing)

### TurboRepo
- [TurboRepo Documentation](https://turbo.build/repo/docs)
- [Monorepo Guide](https://turbo.build/repo/docs/core-concepts/monorepos)

### Frontend Technologies
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling framework
- [Vite](https://vitejs.dev/guide/) - Frontend build tool
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

## 📞 Support

For questions about:
- **Primer.io integration:** Check Primer.io documentation or support
- **This demo:** Review the troubleshooting section above
- **TurboRepo:** Visit TurboRepo documentation

---

**Happy coding!** 🎉 This demo should give you a solid foundation for building modern checkout experiences with Primer.io.