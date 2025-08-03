import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const count = searchParams.get('count') || '3';

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      return NextResponse.json({ error: 'Unsplash API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract relevant image data
    const images = data.results.map((photo: {
      id: string;
      urls: { regular: string; thumb: string };
      alt_description?: string;
      description?: string;
      width: number;
      height: number;
      user: { name: string; links: { html: string } };
    }) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      alt: photo.alt_description || photo.description || 'Unsplash image',
      width: photo.width,
      height: photo.height,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
