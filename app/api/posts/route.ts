// file: app/api/posts/route.ts
import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import { deepClean } from '@/lib/utils/deepClean';
import { slugify, computeReadingTimeFromHtml } from '@/lib/utils/text';

export async function POST(req: Request) {
  const raw = await req.json();
  const cleaned = deepClean(raw as any) as any;

  // defaults & guardrails
  if (!cleaned.status) cleaned.status = 'draft';
  if (!cleaned.slug && cleaned.title) cleaned.slug = slugify(cleaned.title);
  if (cleaned.featuredImage?.startsWith?.('data:')) {
    return NextResponse.json({ error: 'Upload image first; store a hosted URL or asset ID.' }, { status: 400 });
  }

  // sections sanitize
  cleaned.contentSections = (cleaned.contentSections ?? []).map((s: any) => ({
    type: s?.type,
    data: deepClean(s?.data),
  })).filter((s: any) => s?.type);

  // compute reading time from body only
  cleaned.readingTime = computeReadingTimeFromHtml(cleaned.body ?? '');

  cleaned.createdAt = new Date();
  cleaned.updatedAt = new Date();

  const doc = await Post.create(cleaned);
  return NextResponse.json({ ok: true, id: String(doc._id) });
}

