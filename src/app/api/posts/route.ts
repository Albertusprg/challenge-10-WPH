import { type NextRequest, NextResponse } from 'next/server';
import { api } from '@/services/api';
import { BlogPost } from './endpoints';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '5';

  try {
    let response;

    if (type === 'recommended') {
      response = await api.get(
        `${BlogPost.recomended}?page=${page}&limit=${limit}`
      );
    } else if (type === 'most-liked') {
      response = await api.get(BlogPost.mostLiked);
    } else {
      return NextResponse.json(
        { error: 'Invalid type parameter' },
        { status: 400 }
      );
    }

    return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Server error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
