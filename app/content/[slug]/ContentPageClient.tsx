"use client";

import React, { useState, useEffect, useCallback } from "react";

/* --- Shared UI Components --- */
import DynamicNavbar from "../../../components/DynamicNavbar";
import Footer from "../../../components/Footer";
import Newsletter from "../../../components/Newsletter";
import DynamicPinnedImageOverlay from "../../../components/DynamicPinnedImageOverlay";
import Comments from "../../../components/Comments";
import ContentSectionsRenderer from "../../../components/ContentSectionsRenderer";
import Breadcrumbs, { buildCategoryBreadcrumbs, generateBreadcrumbJsonLd } from "../../../components/Breadcrumbs";

/* --- Next / Motion / Icons --- */
import Image from "next/image";
import Link from "next/link";
import SafeImage from "../../../components/content/SafeImage";
import { normalizeImageSrc } from "../../../lib/img";
import { safePlayVideo, safePauseAndResetVideo } from '../../../lib/video-utils';
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Play,
  Clock,
  User,
  Calendar,
  Heart,
  MessageCircle,
  ArrowRight,
  Search,
} from "lucide-react";

/* --- Data / Types --- */
import { postsApi, categoriesApi } from "../../../lib/api";
import type { Post, Category } from "../../../types";
import type { PublicPost } from "../../../lib/cms";

interface ContentPageClientProps {
  post: PublicPost;
}

export default function ContentPageClient({ post }: ContentPageClientProps) {
  /* ---------- State Management ---------- */
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------- Motion values for parallax hero ---------- */
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.9]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.08]);

  /* ---------- Utils ---------- */
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /* ---------- Data fetching ---------- */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      if (typeof window === "undefined") return;

      // Posts (with filters/search)
      try {
        const postsResponse = await postsApi.getPosts({
          page: currentPage,
          limit: 12,
          category: selectedCategory || undefined,
          query: searchQuery || undefined,
          sortBy: "publishedAt",
          sortOrder: "desc",
        });

        if ((postsResponse as any)?.success) {
          const postsData = postsResponse.data || [];
          console.log('Posts data received:', postsData);
          // Log the specific post we're looking for
          const videoPost = postsData.find((p: any) => p.title === 'Checking the video upload');
          if (videoPost) {
            console.log('Video post found:', videoPost);
            console.log('Video post featuredMedia:', videoPost.featuredMedia);
            console.log('Video post featuredImage:', videoPost.featuredImage);
          }
          setPosts(postsData);
          setTotalPages(postsResponse.meta?.pagination?.pages || 1);
        } else {
          const data = (postsResponse as any)?.data ?? [];
          const pages = (postsResponse as any)?.meta?.pagination?.pages ?? 1;
          console.log('Posts data received (fallback):', data);
          setPosts(Array.isArray(data) ? data : []);
          setTotalPages(Number.isFinite(pages) ? pages : 1);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
        setTotalPages(1);
      }

      // Categories
      try {
        const categoriesResponse = await categoriesApi.getCategories();
        if ((categoriesResponse as any)?.success) {
          setCategories(categoriesResponse.data || []);
      } else {
          setCategories((categoriesResponse as any)?.data || []);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }

      // Featured posts
      try {
        const featuredResponse = await postsApi.getFeaturedPosts(3);
        const fp = (featuredResponse as any)?.data || [];
        setFeaturedPosts(Array.isArray(fp) ? fp : []);
      } catch (err) {
        console.error("Error fetching featured posts:", err);
        setFeaturedPosts([]);
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ---------- Filters / Search ---------- */
  const handleCategoryFilter = (categorySlug: string) => {
    setSelectedCategory(categorySlug === selectedCategory ? "" : categorySlug);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  /* ---------- Share actions ---------- */
  const handleShare = async (platform: "facebook" | "twitter" | "linkedin" | "copy") => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const title = getHeroTitle();

      switch (platform) {
        case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer"
        );
          break;
        case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank",
          "noopener,noreferrer"
        );
          break;
        case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer"
        );
          break;
        case "copy":
        try {
          await navigator.clipboard.writeText(url);
        } catch (err) {
          console.error("Failed to copy URL: ", err);
        }
          break;
    }
  };

  /* ---------- Get hero media from content sections or fallback ---------- */
  const getHeroImage = () => {
    const heroSection = post.contentSections?.find(section => section.type === 'hero');
    
    // Prefer hero section image if present
    const heroSrc = normalizeImageSrc(heroSection?.backgroundImage) ??
      // otherwise featuredImage (string or {url})
      normalizeImageSrc(post.featuredImage) ??
      null;
    
    return heroSrc;
  };

  const getHeroMedia = () => {
    const heroSection = post.contentSections?.find(section => section.type === 'hero');
    
    // Debug logging for hero section
    console.log('Hero section debug in getHeroMedia:', {
      heroSection: heroSection,
      backgroundImage: heroSection?.backgroundImage,
      backgroundVideo: heroSection?.backgroundVideo,
      featuredMedia: post.featuredMedia,
      featuredImage: post.featuredImage
    });
    
    // Priority 1: Hero section's backgroundVideo
    if (heroSection?.backgroundVideo) {
      let videoUrl;
      if (heroSection.backgroundVideo.startsWith('http') || heroSection.backgroundVideo.startsWith('/') || heroSection.backgroundVideo.startsWith('data:')) {
        videoUrl = heroSection.backgroundVideo;
      } else {
        // For videos, use admin backend URL (port 5000) instead of website backend (port 3000)
        videoUrl = `http://localhost:5000/api/v1/media/serve/${encodeURIComponent(heroSection.backgroundVideo)}`;
      }
      
      console.log('Using hero section backgroundVideo:', videoUrl);
      return {
        url: videoUrl,
        type: 'video'
      };
    }
    
    // Priority 2: Hero section's backgroundImage
    if (heroSection?.backgroundImage) {
      const imageUrl = normalizeImageSrc(heroSection.backgroundImage);
      console.log('Using hero section backgroundImage:', imageUrl);
      return {
        url: imageUrl,
        type: 'image'
      };
    }
    
    // Priority 3: Post's featuredMedia (video)
    if (post.featuredMedia?.type === 'video' && post.featuredMedia?.url) {
      let videoUrl;
      if (post.featuredMedia.url.startsWith('http') || post.featuredMedia.url.startsWith('/') || post.featuredMedia.url.startsWith('data:')) {
        videoUrl = post.featuredMedia.url;
      } else {
        // For videos, use admin backend URL (port 5000) instead of website backend (port 3000)
        videoUrl = `http://localhost:5000/api/v1/media/serve/${encodeURIComponent(post.featuredMedia.url)}`;
      }
      
      console.log('Using post featuredMedia video:', videoUrl);
      return {
        url: videoUrl,
        type: 'video'
      };
    }
    
    // Priority 4: Post's featuredImage
    const heroSrc = normalizeImageSrc(post.featuredImage);
    console.log('Using post featuredImage:', heroSrc);
    return {
      url: heroSrc,
      type: 'image'
    };
  };

  /* ---------- Get hero section data ---------- */
  const getHeroSection = () => {
    return post.contentSections?.find(section => section.type === 'hero');
  };

  /* ---------- Get popular posts section ---------- */
  const getPopularPostsSection = () => {
    return post.contentSections?.find(section => section.type === 'popular-posts');
  };

  /* ---------- Get article with images section ---------- */
  const getArticleWithImagesSection = () => {
    return post.contentSections?.find(section => section.type === 'article');
  };

  /* ---------- Get content sections without hero, breadcrumb, and article ---------- */
  const getContentSections = () => {
    return post.contentSections?.filter(section => 
      section.type !== 'hero' && 
      section.type !== 'breadcrumb' &&
      section.type !== 'article'
    ) || [];
  };

  /* ---------- Get hero title from content sections or fallback ---------- */
  const getHeroTitle = () => {
    const heroSection = getHeroSection();
    if (heroSection && heroSection.type === 'hero' && heroSection.title) {
      return heroSection.title;
    }
    return post.title;
  };

  /* ---------- Get hero subtitle from content sections ---------- */
  const getHeroSubtitle = () => {
    const heroSection = getHeroSection();
    if (heroSection && heroSection.type === 'hero' && heroSection.subtitle) {
      return heroSection.subtitle;
    }
    return null;
  };

  /* ---------- Get hero author from content sections or fallback ---------- */
  const getHeroAuthor = (): string => {
    const heroSection = getHeroSection();
    if (heroSection && heroSection.type === 'hero' && heroSection.author) {
      return heroSection.author;
    }
    return typeof post.author === 'object' && post.author?.name 
      ? post.author.name 
      : (post.author as string) || 'Unknown Author';
  };

  /* ---------- Get hero publish date from content sections or fallback ---------- */
  const getHeroPublishDate = () => {
    const heroSection = getHeroSection();
    if (heroSection && heroSection.type === 'hero' && heroSection.publishDate) {
      return heroSection.publishDate;
    }
    return formatDate(post.publishedAt);
  };

  /* ---------- Get hero read time from content sections or fallback ---------- */
  const getHeroReadTime = () => {
    const heroSection = getHeroSection();
    if (heroSection && heroSection.type === 'hero' && heroSection.readTime) {
      return heroSection.readTime;
    }
    return "5 min read";
  };

  /* ================== RENDER ================== */

  // Build breadcrumbs from primary category
  const breadcrumbItems = buildCategoryBreadcrumbs(post.primaryCategory, post.title);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <main className="overflow-x-hidden">
      <DynamicNavbar />

      {/* Breadcrumbs */}
      {breadcrumbItems.length > 0 && (
        <section className="bg-gray-50 py-4">
          <div className="container max-w-6xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}

      {/* Hero Section - Enhanced with dynamic content */}
      <motion.section
        className="relative h-[calc(100vh+150px)] md:h-[90vh] lg:h-[95vh] overflow-hidden"
        style={{ y, opacity }}
      >
        <motion.div style={{ scale }} className="w-full h-full">
          {getHeroMedia().url ? (
            getHeroMedia().type === 'video' ? (
              <video
                src={getHeroMedia().url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <SafeImage
                src={getHeroMedia().url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            )
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">{getHeroTitle()}</h1>
                {getHeroSubtitle() && (
                  <p className="text-xl opacity-90">{getHeroSubtitle()}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-black/30" />

        {/* Content Overlay - Enhanced */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-6xl px-4">
            <motion.h1
              className="mb-8"
              style={{
                fontFamily: "Roboto",
                fontWeight: 600,
                fontSize: "60px",
                lineHeight: "60px",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {getHeroTitle()}
            </motion.h1>

            {getHeroSubtitle() && (
              <motion.p
                className="text-xl md:text-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {getHeroSubtitle()}
              </motion.p>
            )}

            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span>By {getHeroAuthor()}</span>
              <span className="hidden md:block">•</span>
              <span>{getHeroPublishDate()}</span>
              <span className="hidden md:block">•</span>
              <span>{getHeroReadTime()}</span>
            </motion.div>
          </div>
        </div>

        {/* Share Icons - Enhanced */}
        <div className="absolute bottom-12 right-12">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-4">
            <span className="text-white text-lg font-medium">Share:</span>
            <motion.button
              className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare("facebook")}
              title="Share on Facebook"
            >
              <Facebook className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare("twitter")}
              title="Share on Twitter"
            >
              <Twitter className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare("linkedin")}
              title="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </motion.button>
            <motion.button
              className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleShare("copy")}
              title="Copy link"
            >
              <Copy className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Breadcrumb Navigation - From Content Builder */}
      {(() => {
        const breadcrumbSection = post.contentSections?.find(section => section.type === 'breadcrumb');
        if (breadcrumbSection && breadcrumbSection.type === 'breadcrumb' && breadcrumbSection.enabled !== false) {
                return (
            <section className="py-6 bg-white">
              <div className="container max-w-6xl mx-auto px-4">
                <nav className="flex items-center space-x-3 text-base">
                  {(breadcrumbSection.items || []).map((item, index) => (
                    <React.Fragment key={index}>
                      <Link
                        href={item.href || '#'}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {item.label || '—'}
                      </Link>
                      {index < (breadcrumbSection.items?.length || 0) - 1 && (
                <span className="text-gray-400">&gt;</span>
            )}
                    </React.Fragment>
                  ))}
          </nav>
        </div>
      </section>
          );
        }
        return null;
      })()}

      {/* Dynamic Article Content with Pinned Image Overlay */}
      {(() => {
        const articleSection = getArticleWithImagesSection();
        if (articleSection && articleSection.type === 'article') {
          return (
            <DynamicPinnedImageOverlay
              articleSection={articleSection}
              viewportVh={100}
              scrim={true}
            />
          );
        }
        return null;
      })()}

      {/* Dynamic Content Sections */}
      <ContentSectionsRenderer sections={getContentSections()} />

      {/* Search & Category Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                  <button
                onClick={() => handleCategoryFilter("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === ""
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
                  </button>

              {categories.slice(0, 12).map((category) => (
                  <button
                  key={category._id}
                  onClick={() => handleCategoryFilter(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category.slug
                        ? category.color
                        : undefined,
                    color:
                      selectedCategory === category.slug ? "white" : undefined,
                  }}
                >
                  {category.name}
                  </button>
              ))}
                </div>
              </div>
            </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Stories
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked travel stories that inspire and captivate
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((featuredPost, index) => (
                <motion.article
                  key={featuredPost._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/content/${featuredPost.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <SafeImage
                        src={featuredPost.featuredImage}
                        alt={featuredPost.featuredImage?.alt || featuredPost.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{featuredPost.author?.name || "Unknown Author"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(featuredPost.publishedAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {featuredPost.readingTimeText || `${featuredPost.readingTime} min`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
                  </div>
                </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Stories
            </h2>
            <p className="text-lg text-gray-600">
              Discover the latest travel adventures and insights
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-xl h-80 animate-pulse"
                />
                      ))}
                    </div>
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((postItem, index) => (
                  <motion.article
                    key={postItem._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/content/${postItem.slug}`}>
                      <div className="relative h-48 overflow-hidden group">
                        {(() => {
                          // Get the media URL and type (prioritize featuredMedia over featuredImage)
                          const rawMediaUrl = postItem.featuredMedia?.url || 
                            (typeof postItem.featuredImage === 'string' ? postItem.featuredImage : postItem.featuredImage?.url);
                          const mediaType = postItem.featuredMedia?.type || 'image';
                          
                          // Construct proper URL based on media type
                          let mediaUrl = rawMediaUrl;
                          if (mediaType === 'video' && rawMediaUrl && !rawMediaUrl.startsWith('http') && !rawMediaUrl.startsWith('/') && !rawMediaUrl.startsWith('data:')) {
                            // For videos, use admin backend URL (port 5000)
                            mediaUrl = `http://localhost:5000/api/v1/media/serve/${encodeURIComponent(rawMediaUrl)}`;
                          }
                          
          // Debug logging for video posts
          if (mediaType === 'video') {
            console.log('Rendering video post:', postItem.title);
            console.log('featuredMedia:', postItem.featuredMedia);
            console.log('featuredImage:', postItem.featuredImage);
            console.log('mediaUrl:', mediaUrl);
            console.log('mediaType:', mediaType);
            console.log('Raw mediaUrl check:', {
              startsWithHttp: mediaUrl?.startsWith('http'),
              startsWithSlash: mediaUrl?.startsWith('/'),
              startsWithData: mediaUrl?.startsWith('data:'),
              fullUrl: mediaUrl
            });
          }
                          
                          if (mediaType === 'video' && mediaUrl) {
                            return (
                              <>
                                <video
                                  src={mediaUrl}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  muted
                                  preload="metadata"
                                  onMouseEnter={(e) => {
                                    safePlayVideo(e.currentTarget, {
                                      onError: (error) => console.warn('Video play error:', error),
                                      onSuccess: () => console.log('Video playing successfully')
                                    });
                                  }}
                                  onMouseLeave={(e) => {
                                    safePauseAndResetVideo(e.currentTarget, {
                                      onError: (error) => console.warn('Video pause/reset error:', error),
                                      onSuccess: () => console.log('Video paused and reset successfully')
                                    });
                                  }}
                                  onError={(e) => {
                                    const target = e.target as HTMLVideoElement;
                                    console.error('Video failed to load:', {
                                      title: postItem.title,
                                      videoUrl: target.src,
                                      error: target.error,
                                      networkState: target.networkState,
                                      readyState: target.readyState,
                                      featuredMedia: postItem.featuredMedia
                                    });
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `
                                        <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                                          <div class="text-center text-gray-500">
                                            <div class="w-8 h-8 mx-auto mb-2 bg-gray-400 rounded-full flex items-center justify-center">
                                              <div class="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1"></div>
                                            </div>
                                            <div class="text-sm">Video</div>
                                          </div>
                                        </div>
                                      `;
                                    }
                                  }}
                                />
                                {/* Video badge */}
                                <div className="absolute top-2 right-2">
                                  <div className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                    <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                      <div className="w-0 h-0 border-l-[2px] border-l-black border-y-[1px] border-y-transparent"></div>
                                    </div>
                                    Video
                                  </div>
                                </div>
                              </>
                            );
                          } else {
                            return (
                              <SafeImage
                                src={mediaUrl || postItem.featuredImage}
                                alt={postItem.featuredImage?.alt || postItem.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                            );
                          }
                        })()}
                        
                        {postItem.isPinned && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Pinned
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {postItem.categories?.slice(0, 2).map((category) => (
                        <span
                              key={category?._id || `${postItem._id}-${category?.slug || "cat"}`}
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: `${category?.color || "#3B82F6"}20`,
                                color: category?.color || "#3B82F6",
                              }}
                            >
                              {category?.name || "Uncategorized"}
                        </span>
                      ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {postItem.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {postItem.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{postItem.author?.name || "Unknown Author"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(postItem.publishedAt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {postItem.readingTimeText || `${postItem.readingTime} min`}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{postItem.likeCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{postItem.commentCount}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      const isCurrentPage = page === currentPage;
                      const isNearCurrentPage = Math.abs(page - currentPage) <= 2;
                      const isFirstOrLast = page === 1 || page === totalPages;

                      if (!isCurrentPage && !isNearCurrentPage && !isFirstOrLast) {
                        return page === 2 || page === totalPages - 1 ? (
                          <span key={page} className="px-2">
                            ...
                          </span>
                        ) : null;
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            isCurrentPage
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                    </div>
                  </div>
                )}
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600">
                {searchQuery || selectedCategory
                  ? "Try adjusting your search or filter criteria"
                  : "No posts are available at the moment"}
              </p>
            </div>
          )}
        </div>
      </section>


      {/* Comments Section */}
      <Comments />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </main>
  );
}