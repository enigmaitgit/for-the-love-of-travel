// Example usage of SectionRenderer in a post page
import React from 'react';
import { SectionRenderer } from './SectionRenderer';

interface PostBodyProps {
  post: {
    body?: string;
    contentSections?: Array<{ type: string; data: any }>;
  };
}

export function PostBody({ post }: PostBodyProps) {
  return (
    <div>
      {/* Render the main body content (TipTap HTML) */}
      <article dangerouslySetInnerHTML={{ __html: post.body ?? '' }} />
      
      {/* Render optional content sections */}
      <SectionRenderer sections={post.contentSections} />
    </div>
  );
}

