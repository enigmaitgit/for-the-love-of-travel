import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SectionHeader from "../components/SectionHeader";
import PostCard from "../components/PostCard";
import VideoCard from "../components/VideoCard";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { featuredPosts, latestPosts, videos } from "../lib/data";
import HomePageClient from "./HomePageClient";
import { getPageMetadata } from "../lib/seo";

export const metadata = getPageMetadata("home");

export default function Page() {
  return <HomePageClient />;
}
