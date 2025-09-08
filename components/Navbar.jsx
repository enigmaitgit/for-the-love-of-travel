"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "#destinations", label: "Destinations" },
  { href: "#vacations", label: "Vacations" },
  { href: "#tours", label: "Tours" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Fixed navbar with liquid glass effect that becomes transparent on scroll
    <motion.header 
      className="fixed inset-x-0 top-0 z-50 w-full pb-4"
      initial={{ y: 0 }}
      animate={{ 
        y: 0,
        backgroundColor: open 
          ? 'rgba(255,255,255,0.15)' // Increased opacity when mobile menu is open
          : isScrolled 
            ? 'rgba(255,255,255,0.05)' 
            : 'rgba(255,255,255,0)',
        backdropFilter: open 
          ? 'blur(20px)' // Enhanced blur when mobile menu is open
          : isScrolled 
            ? 'blur(20px)' 
            : 'blur(0px)',
        borderBottomColor: open 
          ? 'rgba(255,255,255,0.2)' // Enhanced border when mobile menu is open
          : isScrolled 
            ? 'rgba(255,255,255,0.1)' 
            : 'rgba(255,255,255,0)',
        borderBottomWidth: open || isScrolled ? '1px' : '0px'
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smoothness
        backgroundColor: { duration: 0.3 },
        backdropFilter: { duration: 0.3 },
        borderBottomColor: { duration: 0.3 }
      }}
    >
      <div className="container relative flex h-24 items-center">
        {/* Logo (outside the glass group) */}
        <Link href="/" className="relative z-50 flex items-center mt-6 -ml-10 ml-2 md:ml-0">
          <Image
            src="/images/logo.png"
            alt="For the Love of Travel Logo"
            width={180}
            height={60}
            className="h-16 w-auto"
            priority
          />
        </Link>

                 {/* Desktop: liquid glass nav positioned closer to logo */}
         <div className="hidden md:block absolute left-[240px] right-32 mt-6">
          <motion.nav
            className="w-full flex items-center justify-between rounded-[18px] border px-8 py-4"
            animate={{
              backgroundColor: isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
              borderColor: isScrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)',
              backdropFilter: isScrolled ? 'blur(24px)' : 'blur(12px)',
              boxShadow: isScrolled 
                ? '0 8px 32px rgba(0,0,0,0.08)' 
                : '0 10px 30px rgba(0,0,0,0.15)',
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              backgroundColor: { duration: 0.4 },
              borderColor: { duration: 0.4 },
              backdropFilter: { duration: 0.4 },
              boxShadow: { duration: 0.4 }
            }}
          >
            <div className="flex items-center gap-8">
              {links.map((l) => {
                const isActive = l.href === pathname || (l.label === "Destinations" && pathname === "/content");
                return (
                  <motion.div
                    key={l.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Link
                      href={l.href}
                      className={[
                        "text-sm font-medium transition-all duration-300 ease-out",
                        isActive
                          ? "text-brand-gold"
                          : "text-black hover:text-brand-gold",
                      ].join(" ")}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: animated (invisible → visible) search input + icon */}
            <div
              className="flex items-center gap-3 w-56 justify-end"
              onMouseEnter={() => setSearchOpen(true)}
              onMouseLeave={() => setSearchOpen(false)}
            >
              <AnimatePresence initial={false}>
                {searchOpen && (
                  <motion.input
                    key="nav-search"
                    type="text"
                    placeholder="Search..."
                    initial={{ width: 0, opacity: 0, scale: 0.8 }}
                    animate={{ 
                      width: 160, 
                      opacity: 1, 
                      scale: 1,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      borderColor: 'rgba(255,255,255,0.3)'
                    }}
                    exit={{ 
                      width: 0, 
                      opacity: 0, 
                      scale: 0.8,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 35,
                      mass: 0.6,
                      duration: 0.4
                    }}
                    className="
                      rounded-full backdrop-blur-md
                      px-4 py-2 text-sm
                      text-black placeholder-black/70
                      outline-none focus:ring-2 ring-brand-gold focus:ring-opacity-50
                      transition-all duration-300 ease-out
                    "
                    onFocus={() => setSearchOpen(true)}
                    onBlur={() => setSearchOpen(false)}
                  />
                )}
              </AnimatePresence>

              <motion.button
                className="grid h-8 w-8 place-items-center text-black hover:text-brand-gold transition-all duration-300 ease-out"
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Search className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.nav>
        </div>

        {/* Mobile menu button (right) */}
        <motion.button
          className="ml-auto md:hidden text-black transition-all duration-300 ease-out mr-2"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {open ? <X /> : <Menu />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile liquid glass dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div 
            className="md:hidden mx-4 rounded-2xl border backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            initial={{ 
              opacity: 0, 
              y: -30, 
              scale: 0.95,
              backgroundColor: 'rgba(255,255,255,0)',
              borderColor: 'rgba(255,255,255,0)'
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              backgroundColor: isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
              borderColor: isScrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)'
            }}
            exit={{ 
              opacity: 0, 
              y: -30, 
              scale: 0.95,
              transition: { duration: 0.2, ease: "easeIn" }
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94],
              backgroundColor: { duration: 0.3 },
              borderColor: { duration: 0.3 }
            }}
          >
          <div className="px-4 py-3 space-y-2">
            {links.map((l, index) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.3, 
                  ease: "easeOut" 
                }}
              >
                <Link
                  href={l.href}
                  className={`block rounded-full px-4 py-2 text-black transition-all duration-300 ease-out ${
                    l.href === pathname || (l.label === "Destinations" && pathname === "/content")
                      ? "bg-white/20 border border-white/30 text-brand-gold"
                      : "hover:text-brand-gold hover:bg-white/10"
                  }`}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div 
              className="pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: links.length * 0.1, 
                duration: 0.3, 
                ease: "easeOut" 
              }}
            >
              <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-black transition-all duration-300 ease-out hover:bg-white/20">
                <Search className="h-5 w-5 opacity-80" />
                <span className="text-sm/none opacity-80">Search</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
