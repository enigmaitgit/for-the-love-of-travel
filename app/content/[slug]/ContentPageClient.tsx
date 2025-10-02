"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Newsletter from "../../../components/Newsletter";
import Comments from "../../../components/Comments";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Heart,
  MessageCircle,
  Clock,
  User,
  Calendar,
} from "lucide-react";
import { postsApi } from "../../../lib/api";
import type { Post } from "../../../types";

interface ContentPageClientProps {
  post: Post;
}

export default function ContentPageClient({ post }: ContentPageClientProps) {
  // Debug logging
  if (typeof window !== "undefined") {
    // avoid noise in server logs
    // eslint-disable-next-line no-console
    console.log("📄 Individual post data from backend:", post);
  }

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount ?? 0);
  const [isSharing, setIsSharing] = useState(false);

  // Handle like functionality
  const handleLike = async () => {
    try {
      if (isLiked) {
        await postsApi.unlikePost(post._id);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        await postsApi.likePost(post._id);
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle share functionality
  const handleShare = async (platform: "facebook" | "twitter" | "linkedin" | "copy") => {
    try {
      setIsSharing(true);

      const url = typeof window !== "undefined" ? window.location.href : "";
      const title = post.title;
      let shareUrl = "";

      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`;
          break;
        case "copy":
          await navigator.clipboard.writeText(url);
          break;
        default:
          return;
      }

      if (shareUrl && platform !== "copy") {
        window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
      }

      // Track share in analytics/backend
      await postsApi.sharePost(post._id, platform);
    } catch (error) {
      console.error("Error sharing post:", error);
    } finally {
      setIsSharing(false);
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* Hero Section (UI-fixes styling kept) */}
      <motion.section
        className="relative h-[calc(100vh+150px)] sm:h-screen overflow-hidden"
        style={{ y, opacity }}
      >
        <motion.div style={{ scale }} className="w-full h-full">
          <Image
            src={post.featuredImage?.url || "/images/placeholder.jpg"}
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30" />

        {/* Content Overlay (UI-fixes) */}
        <div className="absolute inset-0 flex items-start justify-center">
          <div className="text-center text-white max-w-4xl px-4 sm:px-6">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              style={{ marginTop: "150px" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 text-sm sm:text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{post.author?.name || "Unknown Author"}</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{post.readingTimeText || `${post.readingTime ?? 5} min read`}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Share Icons (UI-fixes sizes kept) */}
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex gap-2 sm:gap-3">
          <motion.button
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleShare("facebook")}
            disabled={isSharing}
          >
            <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.button>
          <motion.button
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleShare("twitter")}
            disabled={isSharing}
          >
            <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.button>
          <motion.button
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleShare("linkedin")}
            disabled={isSharing}
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.button>
          <motion.button
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleShare("copy")}
            disabled={isSharing}
          >
            <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </motion.button>
        </div>
      </motion.section>

      {/* Breadcrumb Navigation (kept UI-fixes look + main’s safety) */}
      <section className="py-3 sm:py-4 bg-white">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            {post.breadcrumb?.map((item, index) => {
              const isLast = index === (post.breadcrumb?.length || 0) - 1;
              return (
                <div key={`${item.title}-${index}`} className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-gray-400">&gt;</span>
                  {isLast ? (
                    <span className="text-gray-900 font-medium whitespace-nowrap">
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      href={item.url}
                      className="text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Article Content (UI-fixes typography kept) */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.article
                className="prose prose-sm sm:prose-base lg:prose-lg mx-auto max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Post Content */}
                <div
                  className="prose-sm sm:prose-base lg:prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />
              </motion.article>

              {/* Post Actions (UI-fixes layout kept) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 gap-4 sm:gap-0">
                <div className="flex items-center gap-4 sm:gap-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-colors text-sm sm:text-base ${
                      isLiked
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isLiked ? "fill-current" : ""
                      }`}
                    />
                    <span>{likeCount}</span>
                  </button>

                  <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{post.commentCount ?? 0}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-sm text-gray-500">Share:</span>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    disabled={isSharing}
                  >
                    <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                    disabled={isSharing}
                  >
                    <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                    disabled={isSharing}
                  >
                    <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="sticky top-20 lg:top-24 space-y-6 lg:space-y-8">
                {/* Author Info */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    {post.author?.avatar?.url && (
                      <Image
                        src={post.author.avatar.url}
                        alt={post.author?.name || "Author"}
                        width={50}
                        height={50}
                        className="rounded-full object-cover w-12 h-12 sm:w-15 sm:h-15"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {post.author?.name || "Unknown Author"}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">Author</p>
                    </div>
                  </div>
                  {post.author?.bio && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                      {post.author.bio}
                    </p>
                  )}
                  <div className="flex gap-2 sm:gap-3">
                    {post.author?.socialLinks?.twitter && (
                      <a
                        href={`https://twitter.com/${post.author.socialLinks.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    )}
                    {post.author?.socialLinks?.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${post.author.socialLinks.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {post.categories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/category/${category.slug}`}
                          className="px-2 sm:px-3 py-1 bg-white text-xs sm:text-sm rounded-full hover:bg-gray-100 transition-colors"
                          style={{ color: category.color }}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-1 bg-white text-xs sm:text-sm rounded-full text-gray-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      {post.allowComments && <Comments />}

      <Newsletter />
      <Footer />
    </main>
  );
}
