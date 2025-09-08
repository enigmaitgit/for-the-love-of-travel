# SEO Configuration Guide

This guide explains how to use the centralized SEO configuration system for your travel blog.

## 📁 File Structure

```
lib/
├── seo.js          # Centralized SEO configuration
└── SEO_README.md   # This documentation file
```

## 🚀 Quick Start

### Using Pre-configured Pages

For existing pages, simply import and use the pre-configured metadata:

```javascript
// app/page.jsx (Home page)
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("home");
```

```javascript
// app/content/page.jsx (Content page)
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("content");
```

### Creating New Pages

For new pages, you can either:

1. **Add to pre-configured pages** (recommended for common pages)
2. **Create custom metadata** on the fly

#### Option 1: Add to Pre-configured Pages

1. Add your page configuration to `pageMetadata` in `lib/seo.js`:

```javascript
// In lib/seo.js
export const pageMetadata = {
  // ... existing pages
  about: generatePageMetadata({
    title: "About Us",
    description: "Learn about our travel blog and mission to inspire wanderlust.",
    keywords: [...commonKeywords, "about", "mission", "team"],
    image: "/images/about-hero.jpg",
    url: "/about",
  }),
};
```

2. Use it in your page:

```javascript
// app/about/page.jsx
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("about");
```

#### Option 2: Create Custom Metadata

```javascript
// app/destinations/[slug]/page.jsx
import { createCustomMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const destination = await getDestination(params.slug);
  
  return createCustomMetadata({
    title: destination.name,
    description: destination.description,
    keywords: [...commonKeywords, destination.name, destination.country],
    image: destination.heroImage,
    url: `/destinations/${params.slug}`,
    type: "article",
    publishedTime: destination.publishedAt,
    authors: [destination.author],
  });
}
```

## ⚙️ Configuration Options

### Site Configuration

Update these values in `lib/seo.js`:

```javascript
export const siteConfig = {
  name: "For the Love of Travel",
  description: "Your site description...",
  url: "https://yourdomain.com", // ⚠️ Update this!
  ogImage: "/images/logo.png",
  twitterHandle: "@yourhandle", // ⚠️ Update this!
  author: "Your Name",
  creator: "Your Name",
  publisher: "Your Name",
  googleVerification: "your-verification-code", // ⚠️ Update this!
};
```

### Keywords Management

#### Common Keywords
These are automatically included on all pages:

```javascript
export const commonKeywords = [
  "travel", "destinations", "travel guides", 
  "adventure", "tourism", "travel blog"
  // ... more keywords
];
```

#### Page-Specific Keywords
Add keywords for specific pages:

```javascript
export const pageKeywords = {
  home: [...commonKeywords, "travel destinations", "travel stories"],
  content: [...commonKeywords, "technology workplace", "digital transformation"],
  // Add your new pages here
  destinations: [...commonKeywords, "travel destinations", "places to visit"],
};
```

## 🛠️ Helper Functions

### `generatePageMetadata(config)`

Creates metadata for any page with the given configuration:

```javascript
const metadata = generatePageMetadata({
  title: "Page Title",
  description: "Page description",
  keywords: ["keyword1", "keyword2"],
  image: "/path/to/image.jpg",
  url: "/page-url",
  type: "article", // or "website"
  publishedTime: "2024-01-01T00:00:00.000Z",
  authors: ["Author Name"],
});
```

### `getPageMetadata(pageName)`

Gets pre-configured metadata for a specific page:

```javascript
const metadata = getPageMetadata("home"); // Returns home page metadata
```

### `createCustomMetadata(config)`

Alias for `generatePageMetadata` - creates custom metadata on the fly:

```javascript
const metadata = createCustomMetadata({
  title: "Custom Page",
  description: "Custom description",
  // ... other options
});
```

## 📝 Adding New Pages

### Step 1: Add to pageKeywords (optional)

```javascript
// In lib/seo.js
export const pageKeywords = {
  // ... existing pages
  newPage: [...commonKeywords, "new", "page", "keywords"],
};
```

### Step 2: Add to pageMetadata

```javascript
// In lib/seo.js
export const pageMetadata = {
  // ... existing pages
  newPage: generatePageMetadata({
    title: "New Page Title",
    description: "New page description",
    keywords: pageKeywords.newPage,
    image: "/images/new-page-hero.jpg",
    url: "/new-page",
  }),
};
```

### Step 3: Use in your page

```javascript
// app/new-page/page.jsx
import { getPageMetadata } from "@/lib/seo";

export const metadata = getPageMetadata("newPage");
```

## 🎯 Best Practices

### 1. Keep Keywords Relevant
- Use travel-related keywords for travel content
- Use technology keywords for tech content
- Don't stuff keywords - keep it natural

### 2. Optimize Images
- Use high-quality images (1200x630 for Open Graph)
- Include descriptive alt text
- Compress images for better performance

### 3. Update Site Configuration
- Update `siteConfig.url` to your actual domain
- Update `siteConfig.twitterHandle` to your Twitter handle
- Update `siteConfig.googleVerification` with your Google verification code

### 4. Use Semantic URLs
- Use descriptive URLs like `/destinations/paris` instead of `/page/123`
- Include keywords in URLs when appropriate

### 5. Test Your Metadata
- Use tools like Facebook Sharing Debugger
- Test with Twitter Card Validator
- Check Google Search Console for issues

## 🔧 Maintenance

### Regular Updates
- Review and update keywords quarterly
- Update site description as your content evolves
- Add new pages to the configuration as you create them

### Performance Monitoring
- Monitor Core Web Vitals
- Check search console for SEO issues
- Track social media sharing performance

## 🆘 Troubleshooting

### Common Issues

1. **Metadata not showing up**
   - Check that you're importing the correct function
   - Verify the page name matches the configuration
   - Ensure the metadata export is correct

2. **Images not displaying in social shares**
   - Check image paths are correct
   - Ensure images are accessible via URL
   - Verify image dimensions (1200x630 recommended)

3. **Keywords not working**
   - Check that keywords are in the correct array
   - Ensure you're using the right page configuration
   - Verify keywords are relevant to the content

### Getting Help

If you need to add a new page or modify existing metadata:

1. Check this documentation first
2. Look at existing page configurations for examples
3. Use the helper functions to create custom metadata
4. Test your changes with social media debuggers

## 📊 SEO Checklist

- [ ] Site configuration updated with your domain
- [ ] Twitter handle updated
- [ ] Google verification code added
- [ ] All pages have proper metadata
- [ ] Images optimized for social sharing
- [ ] Keywords relevant to content
- [ ] URLs are SEO-friendly
- [ ] Metadata tested with social debuggers
