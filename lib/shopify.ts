import { Shopify } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

const isDevelopment = process.env.NODE_ENV === 'development';

// Initialize Shopify context
const shopifyConfig = {
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: (process.env.SHOPIFY_APP_SCOPES || '').split(','),
  hostName: process.env.SHOPIFY_APP_URL!.replace(/https?:\/\//, ''),
  hostScheme: 'https',
  apiVersion: '2024-01',
  isEmbeddedApp: true,
  isPrivateApp: false,
};

// In-memory store for access tokens (replace with database in production)
const ACCESS_TOKEN_STORE = new Map<string, string>();

export function getShopifyAuth() {
  return Shopify;
}

export function initializeShopify() {
  Shopify.Context.initialize(shopifyConfig);
}

export function storeAccessToken(shop: string, accessToken: string) {
  ACCESS_TOKEN_STORE.set(shop, accessToken);
}

export function getAccessToken(shop: string) {
  return ACCESS_TOKEN_STORE.get(shop);
}

export async function verifyRequest(
  shop: string,
  accessToken?: string
): Promise<boolean> {
  if (!accessToken) {
    accessToken = getAccessToken(shop);
  }
  
  if (!accessToken) {
    return false;
  }

  try {
    const client = new Shopify.Clients.Rest(shop, accessToken);
    await client.get({ path: 'shop' });
    return true;
  } catch (error) {
    console.error('Error verifying request:', error);
    return false;
  }
}

export function getAuthUrl(shop: string, redirectPath: string = '/api/auth/callback') {
  const authRoute = Shopify.Auth.beginAuth(
    shop,
    redirectPath,
    isDevelopment,
    shopifyConfig.apiKey,
    shopifyConfig.scopes
  );
  return authRoute;
} 