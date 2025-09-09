"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Newsletter from "../../components/Newsletter";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Share2, Facebook, Twitter, Linkedin, Copy, Play } from "lucide-react";

export default function ContentPageClient() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden"
        style={{ y, opacity }}
      >
        <motion.div
          style={{ scale }}
          className="w-full h-full"
        >
          <Image
            src="/images/07734c5955830a5ec32606611af0eba2c88b8f45.png"
            alt="The Impact of Technology on the Workplace"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              The Impact of Technology on the Workplace: How Technology is Changing
            </motion.h1>
            
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span>By John Smith</span>
              <span className="hidden md:block">•</span>
              <span>May 28, 2019</span>
              <span className="hidden md:block">•</span>
              <span>5 min read</span>
            </motion.div>
          </div>
        </div>

        {/* Share Icons */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          <motion.button
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Facebook className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Twitter className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Copy className="w-5 h-5 text-white" />
          </motion.button>
        </div>
             </motion.section>

       {/* Breadcrumb Navigation */}
       <section className="py-4 bg-white">
         <div className="container max-w-6xl mx-auto px-4">
           <nav className="flex items-center space-x-2 text-sm">
             <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
               Home
             </a>
             <span className="text-gray-400">&gt;</span>
             <a href="#destinations" className="text-gray-500 hover:text-gray-700 transition-colors">
               Destinations
             </a>
             <span className="text-gray-400">&gt;</span>
             <span className="text-gray-900 font-medium">
               The Impact
             </span>
           </nav>
         </div>
       </section>

      {/* Article Content - Mobile Responsive Layout */}
      <section className="min-h-screen bg-white flex flex-col lg:flex-row">
        {/* Left Side - Scrollable Content */}
        <div className="w-full lg:w-1/2 overflow-y-auto lg:h-screen">
          <div className="p-4 sm:p-8 lg:p-16 space-y-8">
            {/* Article with Drop Cap */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: 'Inter' }}>
                <span className="float-left mr-2 text-6xl font-semibold leading-none text-gray-900">
                  E
                </span>
                mbarking on the journey through the significant trends in recreation for designers,
                as predicted by the industry, reveals a dynamic landscape of innovation and creativity.
                From immersive experiences to sustainable practices, these trends shape the future of design
                and inspire professionals to push the boundaries of their craft.
              </p>
            </motion.div>

            {/* Complete Paragraph Block */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                Recreation isn't just about leisure anymore; it's about pushing boundaries, exploring new horizons, and finding inspiration in unexpected places. As we step into 2024, the design industry is abuzz with anticipation for the latest trends shaping recreational activities for designers. From adrenaline-pumping adventures to serene wellness retreats, designers are seeking diverse experiences to fuel their creativity and enhance their well-being.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                One of the most talked-about trends predicted for 2024 is the rise of extreme off-road experiences, with desert dune buggying leading the pack. Picture this: the vast expanse of golden sand dunes stretching as far as the eye can see, the roar of the engine as you navigate the rugged terrain, and the exhilarating rush of adrenaline as you conquer each sandy slope. Dune buggying in the desert promises an unforgettable adventure that combines thrill-seeking with awe-inspiring natural beauty.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                These recreational trends are not just about having fun; they represent a fundamental shift in how designers approach their work. By stepping outside their comfort zones and embracing new experiences, designers are discovering fresh perspectives that translate into innovative solutions. The connection between recreation and creativity becomes evident as designers return from these adventures with renewed energy, fresh ideas, and a deeper understanding of the delicate balance of the natural world.
              </p>
            </motion.div>

            {/* Boat Image */}
            <motion.div
              className="my-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Image
                src="/images/48b45fddefe25c7d2666ffca16947645b38eada5.png"
                alt="Travel destination image"
                width={400}
                height={300}
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </motion.div>

            {/* Complete Article Below Image */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: 'Inter' }}>
                <span className="float-left mr-2 text-6xl font-semibold leading-none text-gray-900">
                  E
                </span>
                mbarking on the journey through the significant trends in recreation for designers,
                as predicted by the industry, reveals a dynamic landscape of innovation and creativity.
                From immersive experiences to sustainable practices, these trends shape the future of design
                and inspire professionals to push the boundaries of their craft.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                Recreation isn't just about leisure anymore; it's about pushing boundaries, exploring new horizons, and finding inspiration in unexpected places. As we step into 2024, the design industry is abuzz with anticipation for the latest trends shaping recreational activities for designers. From adrenaline-pumping adventures to serene wellness retreats, designers are seeking diverse experiences to fuel their creativity and enhance their well-being.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                One of the most talked-about trends predicted for 2024 is the rise of extreme off-road experiences, with desert dune buggying leading the pack. Picture this: the vast expanse of golden sand dunes stretching as far as the eye can see, the roar of the engine as you navigate the rugged terrain, and the exhilarating rush of adrenaline as you conquer each sandy slope. Dune buggying in the desert promises an unforgettable adventure that combines thrill-seeking with awe-inspiring natural beauty.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                These recreational trends are not just about having fun; they represent a fundamental shift in how designers approach their work. By stepping outside their comfort zones and embracing new experiences, designers are discovering fresh perspectives that translate into innovative solutions. The connection between recreation and creativity becomes evident as designers return from these adventures with renewed energy, fresh ideas, and a deeper understanding of the delicate balance of the natural world.
              </p>
            </motion.div>

            {/* Additional Content for Scrolling */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                The evolution of recreational activities for designers reflects a broader cultural shift towards experiential learning and personal growth. As the boundaries between work and play continue to blur, designers are finding innovative ways to integrate their professional development with their personal interests and passions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                This trend towards adventure-based recreation is not just about physical challenges; it's about mental resilience, creative problem-solving, and the ability to adapt to unexpected situations. These skills are directly transferable to the design process, where creativity often emerges from the ability to navigate uncertainty and find innovative solutions to complex problems.
              </p>
            </motion.div>

            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                The connection between outdoor recreation and design innovation is becoming increasingly apparent as more professionals seek inspiration from natural environments. The organic shapes, textures, and patterns found in nature often serve as the foundation for breakthrough design concepts that resonate with users on a fundamental level.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                As we look towards the future, the integration of recreational activities into professional development will likely become even more sophisticated. Virtual reality experiences, augmented reality adventures, and other technological innovations will create new opportunities for designers to explore, learn, and grow in ways that were previously unimaginable.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Sticky Image (only for this section) */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex items-center justify-center bg-gray-50 order-first lg:order-last">
          <div className="p-4 sm:p-8 w-full h-full flex items-center justify-center">
            <Image
              src="/images/fda08960788ac48d0e9729d96349d66cce42cefd.png"
              alt="Travel destination image"
              width={1016}
              height={2359}
              className="shadow-2xl w-full max-h-[50vh] lg:max-h-[90vh] object-cover"
              style={{ borderRadius: '25px' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* New Article Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Section Heading - Top */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              The city of Porto is full of sky-high lookouts and rooftop bars that afford expansive views, yet the most memorable and unique vistas are those at street level.
            </h2>
          </motion.div>

          {/* Article Content */}
          <motion.article
            className="prose mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Content */}
            <div className="space-y-6">
              {/* Article with Drop Cap */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: 'Inter' }}>
                  <span className="float-left mr-2 text-6xl font-semibold leading-none text-gray-900">
                    E
                  </span>
                  mbarking on the journey through the significant trends in recreation for designers, as predicted by the industry, reveals a dynamic landscape of innovation and creativity. From immersive experiences to sustainable practices, these trends shape the future of design and inspire professionals to push the boundaries of their craft.
                </p>
              </div>

              {/* Complete Paragraph Block */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  Recreation isn't just about leisure anymore; it's about pushing boundaries, exploring new horizons, and finding inspiration in unexpected places. As we step into 2024, the design industry is abuzz with anticipation for the latest trends shaping recreational activities for designers. From adrenaline-pumping adventures to serene wellness retreats, designers are seeking diverse experiences to fuel their creativity and enhance their well-being.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  One of the most talked-about trends predicted for 2024 is the rise of extreme off-road experiences, with desert dune buggying leading the pack. Picture this: the vast expanse of golden sand dunes stretching as far as the eye can see, the roar of the engine as you navigate the rugged terrain, and the exhilarating rush of adrenaline as you conquer each sandy slope. Dune buggying in the desert promises an unforgettable adventure that combines thrill-seeking with awe-inspiring natural beauty.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  Designers are drawn to desert dune buggying not only for its adrenaline-inducing excitement but also for the unique creative inspiration it offers. The stark beauty of the desert landscape, the ever-shifting patterns of sand dunes, and the sense of freedom that comes with exploring vast, untouched wilderness—all of these elements can ignite the imagination and spark new ideas for design projects. Whether it's capturing the organic shapes and textures of the desert environment or channeling the sense of adventure and exploration into their work, designers are finding endless inspiration in the world of off-road desert adventures.
                </p>
              </div>

              {/* Subheading */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  Exploring the creative frontiers
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  As designers delve deeper into the realms of recreational activities, the landscape of inspiration expands with each new trend. Desert dune buggying, while captivating, is just one facet of the multifaceted approach designers are taking towards recreation in 2024.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  In tandem with the thrill of adventure, designers are increasingly prioritizing eco-conscious escapes. Sustainable travel practices, eco-friendly accommodations, and responsible tourism initiatives are gaining traction among the design community. By immersing themselves in nature while minimizing their environmental footprint, designers are aligning their recreational pursuits with their values, finding solace and inspiration in the delicate balance of the natural world.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  In tandem with the thrill of adventure, designers are increasingly prioritizing eco-conscious escapes. Sustainable travel practices, eco-friendly accommodations, and responsible tourism initiatives are gaining traction among the design community. By immersing themselves in nature while minimizing their environmental footprint, designers are aligning their recreational pursuits with their values, finding solace and inspiration in the delicate balance of the natural world.
                </p>
              </div>

              {/* Section Heading - Moved to Bottom */}
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  The city of Porto is full of sky-high lookouts and rooftop bars that afford expansive views, yet the most memorable and unique vistas are those at street level.
                </h2>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Balloon Background Section */}
      <section className="relative py-32 bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: 'url(/images/balloon4to.png)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container max-w-6xl mx-auto px-4">
          <div className="max-w-2xl mx-auto p-5 border border-white rounded-3xl">
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-16 shadow-xl min-h-[400px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
            {/* Section Heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-8">
              Waves & Whispers: Sri Lanka's Hidden Coves ...
            </h2>
            
            {/* Article Content */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-xs" style={{ fontFamily: 'Inter' }}>
                Embarking on the journey through the significant trends in recreation for designers, as predicted by the industry, reveals a dynamic landscape of innovation and creativity. From immersive experiences to sustainable practices, these trends shape the future of design and inspire professionals to push the boundaries of their craft. Embarking on the journey through the significant trends in recreation for designers, as predicted by the industry, reveals a dynamic landscape of innovation and creativity. From immersive experiences to sustainable practices, these trends shape the future of design and
              </p>
            </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Article Section with Floating Image */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Mobile: Image first, Desktop: Image left */}
            <div className="lg:col-span-2 order-1 lg:order-1">
              <div className="lg:sticky lg:top-24" style={{ height: 'auto', minHeight: '400px' }}>
                <div className="relative group cursor-pointer overflow-hidden rounded-[25px] h-full">
                  <Image
                    src="/images/fda08960788ac48d0e9729d96349d66cce42cefd.png"
                    alt="Travel destination image"
                    width={1016}
                    height={2359}
                    className="shadow-lg w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ borderRadius: '25px', opacity: 1 }}
                  />
                  {/* Video Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
                    <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-all duration-300 group-hover:scale-110">
                      <svg 
                        className="w-12 h-12 text-gray-800 ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text column - Mobile: Second, Desktop: Right */}
            <motion.div
              className="lg:col-span-1 space-y-6 order-2 lg:order-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Article with Drop Cap */}
              <div className="mb-8 max-w-xl">
                <p className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: 'Inter' }}>
                  <span className="float-left mr-2 text-6xl font-semibold leading-none text-gray-900">
                    E
                  </span>
                  mbarking on the journey through the significant trends in recreation for designers, as predicted by the industry, reveals a dynamic landscape of innovation and creativity. From immersive experiences to sustainable practices, these trends shape the future of design and inspire professionals to push the boundaries of their craft.
                </p>
              </div>

              {/* Complete Paragraph Block */}
              <div className="mb-8 max-w-xl">
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  Recreation isn't just about leisure anymore; it's about pushing boundaries, exploring new horizons, and finding inspiration in unexpected places. As we step into 2024, the design industry is abuzz with anticipation for the latest trends shaping recreational activities for designers. From adrenaline-pumping adventures to serene wellness retreats, designers are seeking diverse experiences to fuel their creativity and enhance their well-being.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  One of the most talked-about trends predicted for 2024 is the rise of extreme off-road experiences, with desert dune buggying leading the pack. Picture this: the vast expanse of golden sand dunes stretching as far as the eye can see, the roar of the engine as you navigate the rugged terrain, and the exhilarating rush of adrenaline as you conquer each sandy slope. Dune buggying in the desert promises an unforgettable adventure that combines thrill-seeking with awe-inspiring natural beauty.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm" style={{ fontFamily: 'Inter' }}>
                  Designers are drawn to desert dune buggying not only for its adrenaline-inducing excitement but also for the unique creative signers are drawn to desert dune buggying not only for its adrenaline-inducing excitement but also for the unique creative
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Posts Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Featured Article - Left Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {/* Popular Post Header - Above Single Image */}
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Post</h2>
                <p className="text-gray-600">
                  Embarking on the journey through the significant trends in recreation for designers, as predicted by the industry, reveals a dynamic landscape of inn
                </p>
              </div>
              
              <div className="relative w-full h-[500px] overflow-hidden shadow-lg group cursor-pointer rounded-[24px] p-[38px_44px]">
                <Image
                  src="/images/b0552cfdabbaa4290bbe8fa8ad89c85f55ed8711.png"
                  alt="Featured article"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-[24px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                      Tours
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-bold text-white mb-3">
                      Waves & Whispers: Sri Lanka's Hidden Coves
                    </h3>
                    <p className="text-white/90 mb-4 text-lg">
                      A barefoot journey through quiet blue shores...
                    </p>
                    <div className="flex items-center text-white/80 text-sm">
                      <span>14 min read</span>
                      <span className="mx-2">|</span>
                      <span>May 28, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Side Articles - Right Side */}
            <div className="lg:col-span-3 space-y-6">
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex h-48 sm:h-56">
                    <div className="relative w-40 h-full flex-shrink-0">
                      <Image
                        src="/images/3abf26dd585632b9d05dcfd0daffacedd55842f5.jpg"
                        alt="Article image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                        Sri Lanka's Hidden Coves ...
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">
                        Embarking on the journey through the significant trends in recreation for designers, as predicted by the industry, reveals a dynamic landscape of innovation and creativity. From immersive experiences to sustainable practices, these trends shape the future of design and
                      </p>
                      <div className="flex items-center justify-end text-xs sm:text-sm text-gray-500 mt-auto">
                        <span>14 min read</span>
                        <span className="mx-2">|</span>
                        <span>May 28, 2025</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Gallery - Postcard Layout */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          
          {/* Mobile: Simple grid layout */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 6 }, (_, i) => {
                const images = [
                  "/images/74654a8f67369b797c8fb2e96a533fd515fb2939.jpg",
                  "/images/3abf26dd585632b9d05dcfd0daffacedd55842f5.jpg",
                  "/images/3969146248009e641f454298f62e13de84ac0a09.jpg",
                  "/images/0ef79490733114b35273ae93b13e8ebc24870d94.png",
                  "/images/74654a8f67369b797c8fb2e96a533fd515fb2939.jpg",
                  "/images/3abf26dd585632b9d05dcfd0daffacedd55842f5.jpg"
                ];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg h-64"
                  >
                    <Image
                      src={images[i]}
                      alt="Travel destination"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Original complex layout */}
          <div className="hidden lg:block" style={{ 
            maxWidth: '85%', 
            margin: '0 auto', 
            marginTop: '20px', 
            marginLeft: '12%',
            position: 'relative',
            minHeight: '80vh'
          }}>
            {/* Row 1 - Absolute positioned cards */}
            <div style={{ position: 'relative', height: '360px', marginBottom: '54px' }}>
              <motion.div style={{
                position: 'absolute',
                top: '-45px',
                left: '4px',
                zIndex: 2,
                gap: '9px',
                marginRight: '18px'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg" style={{ width: '468px', height: '180px' }}>
                  <Image
                    src="/images/74654a8f67369b797c8fb2e96a533fd515fb2939.jpg"
                    alt="Travel destination"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
              </motion.div>
              <motion.div style={{
                position: 'absolute',
                top: '-45px',
                left: '481px',
                zIndex: 1,
                marginLeft: '18px'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg" style={{ width: '468px', height: '180px' }}>
                  <Image
                    src="/images/3abf26dd585632b9d05dcfd0daffacedd55842f5.jpg"
                    alt="Travel destination"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            </div>

            {/* Row 2 - Grid layout */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 2fr', 
              gap: '14px',
              marginTop: '-261px',
              marginBottom: '18px'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg" style={{ width: '405px', height: '225px' }}>
                  <Image
                    src="/images/3969146248009e641f454298f62e13de84ac0a09.jpg"
                    alt="Travel destination"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg" style={{ width: '315px', height: '225px' }}>
                  <Image
                    src="/images/0ef79490733114b35273ae93b13e8ebc24870d94.png"
                    alt="Travel destination"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg" style={{ width: '225px', height: '180px' }}>
                  <Image
                    src="/images/74654a8f67369b797c8fb2e96a533fd515fb2939.jpg"
                    alt="Travel destination"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            </div>

            {/* Row 3 - Custom layout with absolute positioning */}
            <div style={{ 
              position: 'relative',
              height: '360px',
              marginTop: '14px'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg" style={{ width: '738px', height: '252px' }}>
                  <Image
                    src="/images/3abf26dd585632b9d05dcfd0daffacedd55842f5.jpg"
                    alt="Travel destination"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
              </motion.div>
              <motion.div style={{
                position: 'absolute',
                top: '-45px',
                left: '752px',
                zIndex: 1
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg" style={{ width: '225px', height: '297px' }}>
                  <Image
                    src="/images/3969146248009e641f454298f62e13de84ac0a09.jpg"
                    alt="Travel destination"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
