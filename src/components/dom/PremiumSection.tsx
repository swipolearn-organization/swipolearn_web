"use client";

export default function PremiumSection() {
  return (
    <section className="relative w-full min-h-[120vh] flex flex-col items-center justify-center pointer-events-none">
      <div className="text-center z-10 pointer-events-auto max-w-3xl px-4 mt-32">
        <div className="inline-block px-4 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 font-semibold mb-6 tracking-wide text-sm">
          PRO TIER
        </div>
        <h2 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight">
          Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Premium</span>
        </h2>
        <p className="text-xl text-gray-400 mb-10">
          Get exclusive access to Previous Year Questions (PYQs), advanced predictive analytics, and an ad-free immersive experience.
        </p>
        <button className="px-10 py-5 bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 transition-all rounded-full font-bold text-xl shadow-[0_0_30px_rgba(234,179,8,0.3)] text-black">
          Upgrade Now
        </button>
      </div>
    </section>
  );
}
