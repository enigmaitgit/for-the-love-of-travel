import Image from "next/image";
import { Search, Play, Zap } from "lucide-react";

export default function Hero() {
  return (
    // Full-bleed hero with minimal side gaps, no top gap, image moved up to hide top border radius
    <section className="relative w-full overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative h-screen rounded-[28px] overflow-hidden -mt-8">
          <Image
            src="/images/balloon4to.png"
            alt="Hot air balloons over landscape"
            fill
            className="object-cover object-top"
            priority
          />

          {/* subtle darkening bottom to top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />

          {/* Centered headline + search */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="max-w-4xl text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
              Beyond the Horizon Stories<br className="hidden sm:block"/> That Move You
            </h1>

            {/* Glass search bar */}
            <div className="mt-4 sm:mt-6 w-full max-w-sm sm:max-w-xl relative">
              <input
                type="text"
                placeholder="Search Blog Post"
                className="
                  w-full rounded-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4
                  text-white placeholder-white/80 text-sm sm:text-base
                  border border-white/35 bg-white/20 backdrop-blur-md
                  outline-none focus:ring-2 ring-brand-gold focus:border-white/60
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]
                "
              />
              <Search className="pointer-events-none absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
            </div>
          </div>

          {/* Bottom-right circular controls */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-2 sm:gap-3">
            <button
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/35 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition"
              aria-label="Play"
            >
              <Play className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/35 bg-white/25 backdrop-blur-md text-white hover:bg-white/35 transition"
              aria-label="Boost"
            >
              <Zap className="mx-auto h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
