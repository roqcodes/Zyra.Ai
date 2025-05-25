# LoyalBot Pro (MVP)

A Shopify embedded app that adds an AI-powered chatbot to your store. This is the MVP version with basic functionality.

## Features

- Shopify OAuth authentication
- Admin dashboard for store owners
- Service toggle functionality
- Error logging system
- Floating chat button on storefront
- Basic chat UI (placeholder for now)

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Shopify API
- SQLite (in-memory for MVP)

## Setup Instructions

1. Create a new app in your Shopify Partner dashboard
2. Set the following environment variables:
   ```
   SHOPIFY_API_KEY=your_api_key
   SHOPIFY_API_SECRET=your_api_secret
   SHOPIFY_APP_URL=https://your-app-url.vercel.app
   SHOPIFY_AUTH_CALLBACK_URL=https://your-app-url.vercel.app/api/auth/callback
   SHOPIFY_APP_SCOPES=read_products,write_products,read_script_tags,write_script_tags
   NODE_ENV=development
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Deploy to Vercel:
   ```bash
   vercel deploy
   ```

## Development

- `/app/dashboard`: Admin dashboard UI
- `/app/api/*`: API routes for service management
- `/public/injector.js`: Storefront script for chat UI
- `/lib/shopify.ts`: Shopify authentication utilities

## Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## License

MIT 