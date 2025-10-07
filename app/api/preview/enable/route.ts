// file: app/api/preview/enable/route.ts
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const draft = await draftMode();
  draft.enable();
  return NextResponse.json({ ok: true });
}

