import { IMGS_BASE_URL } from '@/constants';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const imageid = searchParams.get('imageid');

  if (!imageid) {
    return NextResponse.json(
      { error: 'imageID is not valid' },
      { status: 400 }
    );
  }

  const res = await (await fetch(`${IMGS_BASE_URL}/id/${imageid}/info`)).json();

  return NextResponse.json(res);
}

// export async function POST() {}
