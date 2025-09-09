"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FramerCard from "./FramerCard";
import DropdownFramerCard from "./DropdownFramerCard";

const links = [
  { 
    href: "/", 
    label: "Home",
    cards: [
      {
        id: "home-card-1",
        image: "/framer1.png",
        title: "Home",
        description: "Welcome to our travel platform",
        category: "Home",
        readTime: "2 min read",
        date: "Dec 15, 2024"
      },
      {
        id: "home-card-2",
        image: "/framer2.png",
        title: "About Us",
        description: "Learn more about our company",
        category: "Company",
        readTime: "3 min read",
        date: "Dec 14, 2024"
      },
      {
        id: "home-card-3",
        image: "/framer3.png",
        title: "Contact",
        description: "Get in touch with us",
        category: "Support",
        readTime: "1 min read",
        date: "Dec 13, 2024"
      },
      {
        id: "home-card-4",
        image: "/framer1.png",
        title: "Blog",
        description: "Read our latest articles",
        category: "News",
        readTime: "4 min read",
        date: "Dec 12, 2024"
      }
    ],
    dropdown: [
      { href: "#about", label: "popular" },
      { href: "#contact", label: "contact" },
      { href: "#blog", label: "blog" }
    ]
  },
  { 
    href: "/destination", 
    label: "Destinations",
    cards: [
      {
        id: "destinations-card-1",
        image: "/framer2.png",
        title: "Europe",
        description: "Explore historic cities and cultures",
        category: "Travel",
        readTime: "5 min read",
        date: "Dec 14, 2024"
      },
      {
        id: "destinations-card-2",
        image: "/framer3.png",
        title: "Asia",
        description: "Discover ancient traditions and modern cities",
        category: "Travel",
        readTime: "6 min read",
        date: "Dec 13, 2024"
      },
      {
        id: "destinations-card-3",
        image: "/framer1.png",
        title: "Americas",
        description: "From North to South America adventures",
        category: "Travel",
        readTime: "4 min read",
        date: "Dec 12, 2024"
      },
      {
        id: "destinations-card-4",
        image: "/framer2.png",
        title: "Africa & Oceania",
        description: "Wildlife, beaches, and unique landscapes",
        category: "Travel",
        readTime: "7 min read",
        date: "Dec 11, 2024"
      }
    ],
    dropdown: [
      { href: "#europe", label: "Europe" },
      { href: "#asia", label: "popular1" },
      { href: "#americas", label: "popular2" },
      { href: "#africa", label: "popular3" }
    ]
  },
  { 
    href: "#vacations", 
    label: "Vacations",
    cards: [
      {
        id: "vacations-card-1",
        image: "/framer3.png",
        title: "Beach Holidays",
        description: "Relax on pristine beaches worldwide",
        category: "Holiday",
        readTime: "4 min read",
        date: "Dec 13, 2024"
      },
      {
        id: "vacations-card-2",
        image: "/framer1.png",
        title: "Mountain Retreats",
        description: "Escape to peaceful mountain destinations",
        category: "Holiday",
        readTime: "5 min read",
        date: "Dec 12, 2024"
      },
      {
        id: "vacations-card-3",
        image: "/framer2.png",
        title: "City Breaks",
        description: "Explore vibrant urban destinations",
        category: "Holiday",
        readTime: "3 min read",
        date: "Dec 11, 2024"
      },
      {
        id: "vacations-card-4",
        image: "/framer3.png",
        title: "Adventure Trips",
        description: "Thrilling experiences for adrenaline seekers",
        category: "Holiday",
        readTime: "6 min read",
        date: "Dec 10, 2024"
      }
    ],
    dropdown: [
      { href: "#beach", label: "Beach Holidays" },
      { href: "#mountain", label: "Mountain Retreats" },
      { href: "#city", label: "City Breaks" },
      { href: "#adventure", label: "Adventure Trips" }
    ]
  },
  { 
    href: "#tours", 
    label: "Tours",
    cards: [
      {
        id: "tours-card-1",
        image: "/framer1.png",
        title: "Guided Tours",
        description: "Expert-led experiences with local guides",
        category: "Tours",
        readTime: "3 min read",
        date: "Dec 12, 2024"
      },
      {
        id: "tours-card-2",
        image: "/framer2.png",
        title: "Self-Guided",
        description: "Explore at your own pace with our guides",
        category: "Tours",
        readTime: "4 min read",
        date: "Dec 11, 2024"
      },
      {
        id: "tours-card-3",
        image: "/framer3.png",
        title: "Private Tours",
        description: "Exclusive personalized experiences",
        category: "Tours",
        readTime: "5 min read",
        date: "Dec 10, 2024"
      },
      {
        id: "tours-card-4",
        image: "/framer1.png",
        title: "Group Tours",
        description: "Meet new people and share adventures",
        category: "Tours",
        readTime: "2 min read",
        date: "Dec 9, 2024"
      }
    ],
    dropdown: [
      { href: "#guided", label: "Guided Tours" },
      { href: "#self-guided", label: "Self-Guided" },
      { href: "#private", label: "Private Tours" },
      { href: "#group", label: "Group Tours" }
    ]
  },
];

export default function Navbar() {
  const pathname = usePathname();
 
  const [open, setOpen] = useState(false);                    
  const [searchOpen, setSearchOpen] = useState(false);       
  const [isScrolled, setIsScrolled] = useState(false);       
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [chevronHovered, setChevronHovered] = useState(null);
  const [hoveredDropdownItem, setHoveredDropdownItem] = useState(null); 


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    
    <motion.header 
      className="fixed inset-x-0 top-0 z-[9999] w-full pb-4"
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
            src="/icon.png"
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
            className="w-full flex items-center justify-between rounded-[18px] px-8 py-4"
            animate={{
              backgroundColor: isScrolled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: isScrolled ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)',
              backdropFilter: isScrolled ? 'blur(24px)' : 'blur(12px)',
              boxShadow: isScrolled 
                ? '0 8px 32px rgba(0,0,0,0.15)' 
                : '0 10px 30px rgba(0,0,0,0.2)',
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
            {/* DESKTOP NAVIGATION LINKS */}
        
             <div className="flex items-center gap-8">
               {links.map((l) => {
                 const isActive = (l.label === "Home" && pathname === "/") || 
                                 (l.label === "Destinations" && pathname === "/destination");
                 const isDropdownOpen = activeDropdown === l.label;
                
                return (
                  <motion.div
                    key={l.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(l.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {/* NAVIGATION BUTTON */}
                   
                    <Link
                      href={l.href}
                      className={[
                        "text-sm font-medium transition-all duration-300 ease-out",
                        isActive
                          ? "text-brand-gold font-semibold"
                          : "text-gray-800 hover:text-brand-gold",
                      ].join(" ")}
                    >
                      {l.label}
                    </Link>

                    {/* DESKTOP DROPDOWN MENU WITH CARD */}
                 
                    <AnimatePresence>
                      {isDropdownOpen && l.dropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ 
                            duration: 0.2, 
                            ease: "easeOut" 
                          }}
                          className="absolute top-full left-0 mt-2 z-50"
                          style={{
                            display: 'flex',
                            gap: '10px'
                          }}
                          onMouseEnter={() => setChevronHovered(l.label)}
                          onMouseLeave={() => setChevronHovered(null)}
                        >
                          {/* DROPDOWN MENU ITEMS */}
                          <div 
                            className="w-48 rounded-xl backdrop-blur-md shadow-lg"
                            style={{
                              backgroundColor: isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: isScrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)',
                              boxShadow: isScrolled 
                                ? '0 8px 32px rgba(0,0,0,0.08)' 
                                : '0 10px 30px rgba(0,0,0,0.15)'
                            }}
                          >
                            <div className="py-2">
                              {l.dropdown.map((item, index) => (
                                <motion.div
                                  key={item.label}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    delay: index * 0.05, 
                                    duration: 0.2 
                                  }}
                                >
                                  <Link
                                    href={item.href}
                                    className={`block px-4 py-2 text-sm transition-all duration-200 ease-out ${
                                      hoveredDropdownItem === `${l.label}-${item.label}`
                                        ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50' 
                                        : 'text-black hover:text-brand-gold hover:bg-white/10'
                                    }`}
                                    onMouseEnter={() => setHoveredDropdownItem(`${l.label}-${item.label}`)}
                                    onMouseLeave={() => setHoveredDropdownItem(null)}
                                  >
                                    {item.label}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* FRAMER CARD PREVIEW - Only show when dropdown is hovered */}
                          {chevronHovered === l.label && l.cards && (
                            <div
                              style={{
                                display: 'flex',
                                gap: '4px', // 10px - 60% = 4px
                                width: '192px', // 480px - 60% = 192px
                                height: '72px', // 180px - 60% = 72px
                                padding: '4px' // 10px - 60% = 4px
                              }}
                            >
                              {l.cards.map((card, cardIndex) => {
                                const isSelected = selectedCard === card.id;
                                const isHovered = hoveredCard === card.id;
                                
                                return (
                                  <motion.div
                                    key={card.id}
                                    style={{
                                      width: '44px', // 110px - 60% = 44px
                                      height: '65px', // 162px - 60% = 65px
                                      opacity: 1,
                                      borderRadius: '3px', // 8px - 60% = 3px
                                      padding: '3px 5px', // 8px 12px - 60% = 3px 5px
                                      gap: '3px', // 7px - 60% = 3px
                                      backgroundColor: isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
                                      borderWidth: '1px',
                                      borderStyle: 'solid',
                                      borderColor: isScrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)',
                                      boxShadow: 'none !important',
                                      filter: 'none',
                                      zIndex: isSelected ? 10 : (isHovered ? 5 : 1)
                                    }}
                                    animate={{
                                      scale: isSelected ? 1.1 : (isHovered ? 0.95 : 1), // Reduced scale for smaller cards
                                      y: isSelected ? -4 : 0 // Reduced y offset for smaller cards
                                    }}
                                    whileHover={{ 
                                      scale: 0.95, // Reduced hover scale
                                      transition: { duration: 0.2, ease: "easeOut" }
                                    }}
                                    whileTap={{ scale: 0.8 }} // Reduced tap scale
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    onClick={() => setSelectedCard(isSelected ? null : card.id)}
                                  >
                                  <DropdownFramerCard
                                    id={card.id}
                                    image={card.image}
                                    title={card.title}
                                    description={card.description}
                                    category={card.category}
                                    readTime={card.readTime}
                                    date={card.date}
                                    selected={selectedCard}
                                    setSelected={setSelectedCard}
                                    hovered={hoveredCard}
                                    setHovered={setHoveredCard}
                                  />
                                </motion.div>
                              );
                            })}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* DESKTOP SEARCH SECTION */}
    
            <div
              className="flex items-center gap-3 w-56 justify-end"
              onMouseEnter={() => setSearchOpen(true)}
              onMouseLeave={() => setSearchOpen(false)}
            >
              {/* ANIMATED SEARCH INPUT */}
             
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

              {/* SEARCH ICON BUTTON */}
    
              <motion.button
                className="grid h-8 w-8 place-items-center text-gray-800 hover:text-brand-gold transition-all duration-300 ease-out"
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

        {/* MOBILE MENU TOGGLE BUTTON */}
   
        <motion.button
          className="ml-auto md:hidden text-black transition-all duration-300 ease-out mr-2 p-2 rounded-lg hover:bg-white/10"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-6 h-6 flex items-center justify-center"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </motion.button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
  
      <AnimatePresence>
        {open && (
          <motion.div 
            className="md:hidden mx-4 rounded-2xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            initial={{ 
              opacity: 0, 
              y: -30, 
              scale: 0.95,
              backgroundColor: 'rgba(255,255,255,0)',
              borderWidth: '0px',
              borderStyle: 'solid',
              borderColor: 'rgba(255,255,255,0)'
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              backgroundColor: isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
              borderWidth: '1px',
              borderStyle: 'solid',
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
          {/* MOBILE NAVIGATION LINKS */}
        
           <nav className="px-4 py-4 space-y-1" role="navigation" aria-label="Mobile navigation">
             {links.map((l, index) => {
               const isActive = (l.label === "Home" && pathname === "/") || 
                               (l.label === "Destinations" && pathname === "/destination");
               const isDropdownOpen = activeDropdown === l.label;
              
              return (
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
                  {/* MOBILE NAVIGATION BUTTON */}
           
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveDropdown(isDropdownOpen ? null : l.label);
                        setChevronHovered(isDropdownOpen ? null : l.label);
                      }}
                       className={`w-full flex items-center justify-between rounded-xl px-4 py-4 text-black transition-all duration-300 ease-out min-h-[48px] ${
                         isActive
                           ? "bg-white/20 text-brand-gold"
                           : "hover:text-brand-gold hover:bg-white/10"
                       }`}
                       style={isActive ? {
                         borderWidth: '1px',
                         borderStyle: 'solid',
                         borderColor: 'rgba(255,255,255,0.3)'
                       } : {}}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span className="font-medium text-base">{l.label}</span>
                      {l.dropdown && (
                        <motion.div
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="w-5 h-5 flex items-center justify-center"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      )}
                    </button>

                    {/* MOBILE DROPDOWN MENU WITH CARD */}
              
                    <AnimatePresence>
                      {isDropdownOpen && l.dropdown && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                          onMouseEnter={() => setChevronHovered(l.label)}
                          onMouseLeave={() => setChevronHovered(null)}
                        >
                          <div className="ml-2 space-y-3">
                            {/* DROPDOWN MENU ITEMS */}
                            <div 
                              className="space-y-1 rounded-xl backdrop-blur-md shadow-lg p-3"
                              role="menu"
                              aria-label={`${l.label} submenu`}
                              style={{
                                backgroundColor: isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: isScrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)',
                                boxShadow: isScrolled 
                                  ? '0 8px 32px rgba(0,0,0,0.08)' 
                                  : '0 10px 30px rgba(0,0,0,0.15)'
                              }}
                            >
                              {l.dropdown.map((item, subIndex) => (
                                <motion.div
                                  key={item.label}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    delay: subIndex * 0.05, 
                                    duration: 0.2 
                                  }}
                                >
                                  <Link
                                    href={item.href}
                                    className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ease-out min-h-[44px] flex items-center ${
                                      hoveredDropdownItem === `${l.label}-${item.label}`
                                        ? 'text-brand-gold bg-white/20' 
                                        : 'text-black/80 hover:text-brand-gold hover:bg-white/10'
                                    }`}
                                    onMouseEnter={() => setHoveredDropdownItem(`${l.label}-${item.label}`)}
                                    onMouseLeave={() => setHoveredDropdownItem(null)}
                                    role="menuitem"
                                  >
                                    {item.label}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>

                            {/* FRAMER CARD PREVIEW - Mobile optimized */}
                            {l.cards && (
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-black/60 px-1">Featured Content</h4>
                                 <div
                                   className="flex gap-3 overflow-x-auto pb-3"
                                   style={{
                                     scrollbarWidth: 'thin',
                                     scrollbarColor: 'rgba(0,0,0,0.2) transparent'
                                   }}
                                 >
                                  {l.cards.slice(0, 3).map((card, cardIndex) => {
                                    const isSelected = selectedCard === card.id;
                                    const isHovered = hoveredCard === card.id;
                                    
                                    return (
                                       <motion.div
                                         key={card.id}
                                         className="flex-shrink-0"
                                         style={{
                                           width: '110px',
                                           height: '150px',
                                           opacity: 1,
                                           borderRadius: '10px',
                                           padding: '8px 8px 12px 8px',
                                           backgroundColor: isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
                                           borderWidth: '1px',
                                           borderStyle: 'solid',
                                           borderColor: isScrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.3)',
                                           boxShadow: 'none !important',
                                           filter: 'none',
                                           zIndex: isSelected ? 10 : (isHovered ? 5 : 1)
                                         }}
                                        animate={{
                                          scale: isSelected ? 1.05 : (isHovered ? 0.98 : 1),
                                          y: isSelected ? -2 : 0
                                        }}
                                        whileHover={{ 
                                          scale: 0.98,
                                          transition: { duration: 0.2, ease: "easeOut" }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        onClick={() => setSelectedCard(isSelected ? null : card.id)}
                                      >
                                        <DropdownFramerCard
                                          id={card.id}
                                          image={card.image}
                                          title={card.title}
                                          description={card.description}
                                          category={card.category}
                                          readTime={card.readTime}
                                          date={card.date}
                                          selected={selectedCard}
                                          setSelected={setSelectedCard}
                                          hovered={hoveredCard}
                                          setHovered={setHoveredCard}
                                        />
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
            {/* MOBILE SEARCH SECTION */}
           
            <motion.div 
              className="pt-4 border-t border-white/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: links.length * 0.1, 
                duration: 0.3, 
                ease: "easeOut" 
              }}
            >
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-black/80 px-2">Search</h3>
                <div 
                  className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 text-black transition-all duration-300 ease-out hover:bg-white/20"
                  style={{
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }}
                >
                  <Search className="h-5 w-5 opacity-80" />
                  <input
                    type="text"
                    placeholder="Search destinations, articles..."
                    className="flex-1 bg-transparent text-sm placeholder-black/60 outline-none"
                    onFocus={() => setSearchOpen(true)}
                    onBlur={() => setSearchOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          </nav>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

