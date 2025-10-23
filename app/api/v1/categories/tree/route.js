import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function GET(request) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/categories/tree`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching categories tree:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories tree' },
      { status: 500 }
    );
  }
}




