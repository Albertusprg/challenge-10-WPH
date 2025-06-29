import { type NextRequest, NextResponse } from 'next/server';
import { api } from '@/services/api';
import { BlogPost } from '../endpoints';

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
    const response = await api.get(
      `${BlogPost.searchPost}?query=${encodeURIComponent(query)}`
    );

    return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Server error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: error.response?.status || 500 }
    );
  }
}
