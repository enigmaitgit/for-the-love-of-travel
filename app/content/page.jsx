import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Newsletter from "../../components/Newsletter";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Share2, Facebook, Twitter, Linkedin, Copy, Play } from "lucide-react";
import ContentPageClient from "./ContentPageClient";
import { getPageMetadata } from "../../lib/seo";

export const metadata = getPageMetadata("content");

export default function ContentPage() {
  return <ContentPageClient />;
}
