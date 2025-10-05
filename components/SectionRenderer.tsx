// file: components/SectionRenderer.tsx
import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { PopularPosts } from '@/components/sections/PopularPosts';

const registry: Record<string, (data: any, key: number) => JSX.Element | null> = {
  hero: (data, i) => <Hero key={i} {...data} />,
  'popular-posts': (data, i) => <PopularPosts key={i} {...data} />,
};

export function SectionRenderer({ sections = [] as Array<{ type: string; data: any }> }) {
  return (
    <>
      {sections.map((s, i) => (registry[s?.type] ? registry[s.type](s.data, i) : null))}
    </>
  );
}

