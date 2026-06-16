import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0'
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    let title = '';
    let imageUrl = '';

    // Attempt to parse Amazon specific selectors
    if (url.includes('amazon.')) {
      title = $('#productTitle').text().trim();
      imageUrl = $('#landingImage').attr('src') || $('#imgBlkFront').attr('src') || '';
    }

    // Fallbacks for general sites or if Amazon selectors failed
    if (!title) {
      title = $('meta[property="og:title"]').attr('content') || $('title').text().trim();
    }
    
    if (!imageUrl) {
      imageUrl = $('meta[property="og:image"]').attr('content') || '';
    }

    // Sometimes Amazon stores high-res image data in data-old-hires attribute
    if (!imageUrl && url.includes('amazon.')) {
       imageUrl = $('#landingImage').attr('data-old-hires') || '';
    }

    return NextResponse.json({ title, imageUrl });

  } catch (error: any) {
    console.error('Error scraping URL:', error);
    return NextResponse.json({ error: error.message || 'Failed to scrape URL' }, { status: 500 });
  }
}
