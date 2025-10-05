// file: app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import { deepClean } from '@/lib/utils/deepClean';
import { slugify, computeReadingTimeFromHtml } from '@/lib/utils/text';

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  const raw = await req.json();
  const cleaned = deepClean(raw as any) as any;

  if (!cleaned.slug && cleaned.title) cleaned.slug = slugify(cleaned.title);
  if (cleaned.featuredImage?.startsWith?.('data:')) {
    return NextResponse.json({ error: 'Upload image first; store a hosted URL or asset ID.' }, { status: 400 });
  }

  cleaned.contentSections = (cleaned.contentSections ?? []).map((s: any) => ({
    type: s?.type,
    data: deepClean(s?.data),
  })).filter((s: any) => s?.type);

  if ('body' in cleaned) {
    cleaned.readingTime = computeReadingTimeFromHtml(cleaned.body ?? '');
  }

  cleaned.updatedAt = new Date();

  const doc = await Post.findByIdAndUpdate(params.id, cleaned, { new: true });
  return NextResponse.json({ ok: true, id: String(doc._id) });
}

