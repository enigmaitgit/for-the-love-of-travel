export default function Newsletter() {
  return (
<section id="newsletter" className="relative overflow-hidden bg-black text-white">
  {/* Top curve */}
  <svg
    viewBox="0 0 1440 120"
    className="pointer-events-none absolute top-0 left-0 w-full h-24"
    aria-hidden="true"
    preserveAspectRatio="none"
  >
    <path
      d="M0,0 C360,40 720,80 1080,40 C1200,20 1320,10 1440,0 L1440,0 L0,0 Z"
      fill="#ffffff"
    />
  </svg>

  <div className="container relative z-10 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center px-4">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
      Get the best stories and travel deals straight<br className="hidden sm:block" />to your inbox, Sign-up here
    </h3>
    <p className="mt-2 text-white/70 text-sm sm:text-base">
      We send only good stuff no spam, just pure wanderlust.
    </p>

    <form className="mt-8 sm:mt-12 mx-auto flex flex-col sm:flex-row w-full max-w-xl overflow-hidden rounded-lg bg-white">
      <input
        type="email"
        placeholder="Enter Your Email"
        className="flex-1 px-4 sm:px-5 py-3 text-black outline-none text-sm sm:text-base"
        required
      />
      <button type="submit" className="px-4 sm:px-5 py-3 bg-indigo-600 text-white text-sm sm:text-base font-medium">
        Subscribe
      </button>
    </form>
  </div>
</section>


  );
}
