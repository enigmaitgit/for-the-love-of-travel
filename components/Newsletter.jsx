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

  <div className="container relative z-10 pt-24 pb-16 text-center">
    <h3 className="text-2xl md:text-3xl font-semibold">
      Get the best stories and travel deals straight<br />to your inbox, Sign-up here
    </h3>
    <p className="mt-2 text-white/70">
      We send only good stuff no spam, just pure wanderlust.
    </p>

    <form className="mt-12 mx-auto flex w-full max-w-xl overflow-hidden rounded-lg bg-white">
      <input
        type="email"
        placeholder="Enter Your Email"
        className="flex-1 px-5 py-3 text-black outline-none"
        required
      />
      <button type="submit" className="px-5 py-3 bg-indigo-600 text-white">
        Enter Your Email
      </button>
    </form>
  </div>
</section>


  );
}
