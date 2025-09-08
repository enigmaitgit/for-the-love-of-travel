import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section - Logo, Social Media, Text */}
          <div>
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/images/logo.png"
                alt="For the Love of Travel Logo"
                width={240}
                height={80}
                className="h-16 w-auto"
              />
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-2 mb-6">
              <Link href="#" aria-label="Facebook" className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <Facebook className="h-3 w-3 text-black" />
              </Link>
              <Link href="#" aria-label="Twitter" className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <Twitter className="h-3 w-3 text-black" />
              </Link>
              <Link href="#" aria-label="Instagram" className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <Instagram className="h-3 w-3 text-black" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <Linkedin className="h-3 w-3 text-black" />
              </Link>
            </div>
            
            {/* Text Block */}
            <p className="text-sm text-white leading-relaxed">
              The Impact of Technology on the Workplace: How Technology is Changing The Impact of Technology on the Workplace
            </p>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="flex justify-end">
            <nav>
              <ul className="space-y-3 text-white uppercase text-sm font-medium">
                <li><Link href="#" className="hover:text-brand-gold transition-colors">Home</Link></li>
                <li><Link href="#destinations" className="hover:text-brand-gold transition-colors">Destinations</Link></li>
                <li><Link href="#vacations" className="hover:text-brand-gold transition-colors">Vacations</Link></li>
                <li><Link href="#tours" className="hover:text-brand-gold transition-colors">Tours</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Separator Line */}
        <div className="mt-12 border-t border-gray-600"></div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 text-xs text-white uppercase">
            <Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy & Cookies Statement</Link>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:text-brand-gold transition-colors">RSS Feeds</Link>
            <span className="text-gray-400">|</span>
            <Link href="#" className="hover:text-brand-gold transition-colors">Conde Nast Store</Link>
          </div>
          
          {/* Copyright */}
          <div className="text-xs text-white">
            Copyright 2025, fortheloveoftravel.nz
          </div>
        </div>
      </div>
    </footer>
  );
}
