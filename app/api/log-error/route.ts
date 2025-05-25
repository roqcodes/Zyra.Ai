import { NextRequest, NextResponse } from 'next/server';

// In-memory store for error logs (replace with database in production)
const ERROR_LOGS = new Map<string, Array<{ timestamp: string; error: string }>>();

export async function POST(req: NextRequest) {
  try {
    const { shop, error } = await req.json();

    if (!shop || !error) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get existing logs or create new array
    const logs = ERROR_LOGS.get(shop) || [];
    
    // Add new log
    logs.push({
      timestamp: new Date().toISOString(),
      error,
    });

    // Store updated logs
    ERROR_LOGS.set(shop, logs);

    return NextResponse.json({
      success: true,
      logsCount: logs.length,
    });
  } catch (error) {
    console.error('Log error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shop = searchParams.get('shop');

    if (!shop) {
      return NextResponse.json(
        { error: 'Missing shop parameter' },
        { status: 400 }
      );
    }

    const logs = ERROR_LOGS.get(shop) || [];

    return NextResponse.json({
      logs,
      count: logs.length,
    });
  } catch (error) {
    console.error('Get logs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 