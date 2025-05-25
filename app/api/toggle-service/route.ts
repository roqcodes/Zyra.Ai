import { NextRequest, NextResponse } from 'next/server';
import { verifyRequest } from '@/lib/shopify';

// In-memory store for service status (replace with database in production)
const SERVICE_STATUS = new Map<string, boolean>();

export async function POST(req: NextRequest) {
  try {
    const { shop } = await req.json();

    if (!shop) {
      return NextResponse.json(
        { error: 'Missing shop parameter' },
        { status: 400 }
      );
    }

    // Verify the request
    const isValid = await verifyRequest(shop);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Toggle the service status
    const currentStatus = SERVICE_STATUS.get(shop) || false;
    SERVICE_STATUS.set(shop, !currentStatus);

    return NextResponse.json({
      enabled: !currentStatus,
      shop,
    });
  } catch (error) {
    console.error('Toggle service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 