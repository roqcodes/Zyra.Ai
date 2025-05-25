import { NextRequest, NextResponse } from 'next/server';
import { Shopify } from '@shopify/shopify-api';
import { getShopifyAuth, storeAccessToken, initializeShopify } from '@/lib/shopify';

export async function GET(req: NextRequest) {
  try {
    initializeShopify();
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop');
    const code = searchParams.get('code');

    if (!shop || !code) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const authResult = await Shopify.Auth.validateAuthCallback(
      searchParams.toString(),
      searchParams
    );

    // Store the access token
    storeAccessToken(shop, authResult.accessToken);

    // Install script tag
    const client = new Shopify.Clients.Rest(shop, authResult.accessToken);
    await client.post({
      path: 'script_tags',
      data: {
        script_tag: {
          event: 'onload',
          src: `${process.env.SHOPIFY_APP_URL}/injector.js`,
        },
      },
    });

    // Redirect to the app
    return NextResponse.redirect(`${process.env.SHOPIFY_APP_URL}/dashboard`);
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 