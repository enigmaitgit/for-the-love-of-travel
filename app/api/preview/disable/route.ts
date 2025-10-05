// file: app/api/preview/disable/route.ts
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  draftMode().disable();
  return NextResponse.json({ ok: true });
}

