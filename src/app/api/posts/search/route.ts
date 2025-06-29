import { type NextRequest, NextResponse } from 'next/server';

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is missing' },
      { status: 400 }
    );
  }

  try {
    const externalApiUrl = `${BASE_API_URL}/posts/search?query=${encodeURIComponent(
      query
    )}`;

    const response = await fetch(externalApiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: errorData.message || 'Failed to fetch data from external API',
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying search request to external API:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred while searching' },
      { status: 500 }
    );
  }
}
