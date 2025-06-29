import { type NextRequest, NextResponse } from 'next/server';
import { api } from '@/services/api';
import { BlogPost } from '../endpoints';

export async function GET(
  request: NextRequest,

  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    let response;

    if (type === 'comments') {
      response = await api.get(`${BlogPost.postById}${id}/comments`);
    } else {
      response = await api.get(`${BlogPost.postById}${id}`);
    }

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
