import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { generatePrompt } from '@/lib/prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    // Extract keywords from path for image search
    const pathKeywords = path.split('/').filter((segment: string) => segment.length > 0);
    const imageQuery = pathKeywords.join(',');

    // Fetch images from Unsplash API
    let images: Array<{
      url: string;
      alt: string;
      photographer: string;
    }> = [];
    try {
      const imageResponse = await fetch(
        `${request.nextUrl.origin}/api/unsplash?query=${encodeURIComponent(imageQuery)}&count=3`
      );
      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        images = imageData.images || [];
      }
    } catch (error) {
      console.warn('Failed to fetch images, proceeding without them:', error);
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 1.0, // Maximum creativity
        topP: 0.98,
        topK: 50,
      }
    });

    const prompt = generatePrompt(path, images);
    const result = await model.generateContent(prompt);
    const response = result.response;
    let html = response.text();

    // Clean up the response - extract only the HTML content
    const htmlStart = html.indexOf('<!DOCTYPE html>');
    const htmlEnd = html.lastIndexOf('</html>') + 7;
    
    if (htmlStart !== -1 && htmlEnd !== -1) {
      html = html.substring(htmlStart, htmlEnd);
    } else {
      // Fallback: look for just <html> tags
      const altStart = html.indexOf('<html');
      const altEnd = html.lastIndexOf('</html>') + 7;
      if (altStart !== -1 && altEnd !== -1) {
        html = html.substring(altStart, altEnd);
      }
    }

    // Remove any remaining markdown code blocks
    html = html.replace(/```html\n?/g, '').replace(/```\n?/g, '');

    return NextResponse.json({ html });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
