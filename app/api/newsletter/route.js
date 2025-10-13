import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { email, preferences } = body;
    
    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email address is required' 
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Prepare data for backend
    const newsletterData = {
      email: email.trim(),
      preferences: preferences || {
        frequency: 'weekly',
        categories: ['all'],
        language: 'en'
      }
    };

    // Frontend is on port 3001, backend is on port 3000
    const backendUrl = 'http://localhost:3000';
    const backendEndpoint = `${backendUrl}/api/contact/newsletter`;

    // Forward the request to the backend
    const backendResponse = await fetch(backendEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
      },
      body: JSON.stringify(newsletterData),
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      console.error('Backend error:', backendData);
      return NextResponse.json(
        { 
          success: false, 
          message: backendData.message || 'Failed to subscribe to newsletter' 
        },
        { status: backendResponse.status }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: backendData
    });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
