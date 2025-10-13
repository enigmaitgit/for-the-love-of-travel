// frontend/components/ContentSectionsRenderer.tsx
'use client';

import * as React from 'react';
import Image from 'next/image';
import SafeImage from './content/SafeImage';
import type { ContentSection } from '@/lib/cms';

export default function ContentSectionsRenderer({ sections }: { sections: ContentSection[] }) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  return (
    <div className="w-full">
      {sections.map((s, idx) => {
        // Skip hero and breadcrumb sections as they're handled by the main component in ContentPageClient
        if (s.type === 'hero' || s.type === 'breadcrumb') {
          return null;
        }
        return <Section key={idx} section={s} />;
      })}
    </div>
  );
}

function Section({ section }: { section: ContentSection }) {
  switch (section.type) {
    case 'hero': {
      const bg = section.backgroundImage || '';
      const heightDesktop = section.height?.desktop ?? '520px';
      const overlay = section.overlayOpacity ?? 0.4;
      return (
        <section className="relative w-full" style={{ height: heightDesktop }}>
          {bg ? (
            <SafeImage
              src={bg}
              alt={section.title || 'Hero background'}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gray-100" />
          )}
          <div
            className="absolute inset-0"
            style={{ background: `rgba(0,0,0,${overlay})` }}
          />
          <div className="relative h-full flex items-end">
            <div className="container mx-auto px-4 pb-10">
              {section.title ? (
                <h1 className="text-white text-4xl md:text-5xl font-bold">
                  {section.title}
                </h1>
              ) : null}
              {section.subtitle ? (
                <p className="text-white/90 mt-3">{section.subtitle}</p>
              ) : null}
              {(section.author || section.publishDate || section.readTime) && (
                <div className="text-white/80 mt-4 text-sm">
                  {[section.author, section.publishDate, section.readTime]
                    .filter(Boolean)
                    .join(' · ')}
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    case 'text': {
      const html = section.content || '';
      return (
        <section className="container mx-auto px-4 py-8">
          <div
            className="prose max-w-none"
            style={{ textAlign: section.alignment ?? 'left' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>
      );
    }

    case 'image': {
      const src =
        section.imageUrl && section.imageUrl.trim() !== '' ? section.imageUrl : null;
      if (!src) return null;
      const align = section.alignment ?? 'center';
      const justify =
        align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';
      return (
        <section className="container mx-auto px-4 py-8">
          <div className={`flex ${justify}`}>
            <figure>
              <div className={`relative ${section.width ? `w-[${section.width}px]` : 'w-full'} ${section.height ? `h-[${section.height}px]` : 'h-auto'}`}>
                <SafeImage
                  src={src}
                  alt={section.altText || ''}
                  width={section.width || 800}
                  height={section.height || 600}
                  className={`${section.rounded ? 'rounded-xl' : ''} ${section.shadow ? 'shadow-xl' : ''}`}
                />
              </div>
              {section.caption ? (
                <figcaption className="text-sm text-gray-500 mt-2">{section.caption}</figcaption>
              ) : null}
            </figure>
          </div>
        </section>
      );
    }

    case 'gallery': {
      const layout = section.layout ?? 'grid';
      const columns = Math.max(1, Math.min(6, section.columns ?? 3));
      const spacing = section.spacing ?? 'md';
      const gap = spacing === 'sm' ? 'gap-2' : spacing === 'lg' ? 'gap-6' : 'gap-4';

      return (
        <section className="container mx-auto px-4 py-8">
          <div className={`grid grid-cols-1 md:grid-cols-${columns} ${gap}`}>
            {section.images?.map((im, i) => (
              <div key={i} className="relative">
                {im.url ? (
                  <div className="relative w-full h-64">
                    <SafeImage
                      src={im.url}
                      alt={im.altText || ''}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 bg-gray-100 rounded-xl" />
                )}
                {im.caption ? (
                  <div className="text-sm text-gray-600 mt-2">{im.caption}</div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      );
    }

    case 'popular-posts': {
      // Simple read-only rendering for the content page
      return (
        <section className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-2">{section.title || 'Popular Posts'}</h2>
              {section.description ? (
                <p className="text-gray-600">{section.description}</p>
              ) : null}

              {section.featuredPost && (
                <div className="mt-6">
                  <div className="relative w-full h-48 overflow-hidden rounded-2xl">
                    {section.featuredPost.imageUrl ? (
                      <SafeImage
                        src={section.featuredPost.imageUrl}
                        alt={section.featuredPost.title || 'Featured'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mt-4">
                    {section.featuredPost.title || 'Untitled'}
                  </h3>
                  {section.featuredPost.excerpt ? (
                    <p className="text-gray-600 mt-2">{section.featuredPost.excerpt}</p>
                  ) : null}
                  <div className="text-sm text-gray-500 mt-2">
                    {[section.featuredPost.readTime, section.featuredPost.publishDate]
                      .filter(Boolean)
                      .join(' · ')}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-3 space-y-4">
              {(section.sidePosts || []).map((p, i) => (
                <div key={i} className="flex gap-4 border rounded-xl p-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    {p.imageUrl ? (
                      <SafeImage src={p.imageUrl} alt={p.title || ''} fill className="object-cover" />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{p.title || 'Untitled'}</h4>
                    {p.excerpt ? <p className="text-gray-600 text-sm mt-1">{p.excerpt}</p> : null}
                    <div className="text-xs text-gray-500 mt-2">
                      {[p.readTime, p.publishDate].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }


    default:
      return null;
  }
}
