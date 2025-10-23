import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    
    const response = await fetch(`${API_BASE_URL}/api/v1/subcategory-pages/by-subcategory/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching subcategory page:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch subcategory page' },
      { status: 500 }
    );
  }
}




