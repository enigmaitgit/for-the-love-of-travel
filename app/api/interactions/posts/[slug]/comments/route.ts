import { NextResponse } from 'next/server';

const WEBSITE_BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    
    console.log('Comments API called for slug:', slug);
    console.log('Backend URL:', WEBSITE_BACKEND_URL);
    
    // Forward the request to the website backend
    const queryString = searchParams.toString();
    const backendUrl = `${WEBSITE_BACKEND_URL}/api/interactions/posts/${slug}/comments${queryString ? `?${queryString}` : ''}`;
    
    console.log('Forwarding to:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    console.log('Backend response:', data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await request.json();
    
    console.log('Comment POST API called for slug:', slug);
    console.log('Backend URL:', WEBSITE_BACKEND_URL);
    console.log('Request body:', body);
    
    // Forward the request to the website backend
    const backendUrl = `${WEBSITE_BACKEND_URL}/api/interactions/comment-submit`;
    
    console.log('Forwarding POST to:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body, slug }),
    });

    console.log('Backend POST response status:', response.status);
    
    const data = await response.json();
    
    console.log('Backend POST response data:', data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}
