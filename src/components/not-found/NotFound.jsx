import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { scrollY } = useScroll();
  const raysOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      {/* light rays */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          style={{ opacity: raysOpacity }}
          className="absolute -top-20 left-[20%] w-24 h-[120%] bg-linear-to-b from-yellow-400/50 via-yellow-400/20 to-transparent blur-3xl origin-top -rotate-10 sm:-rotate-30"
        />
        <motion.div
          style={{ opacity: raysOpacity }}
          className="hidden sm:block absolute -top-24 left-1/2 -translate-x-1/2 w-32 h-[120%] bg-linear-to-b from-yellow-400/55 via-yellow-400/20 to-transparent blur-3xl origin-top"
        />
        <motion.div
          style={{ opacity: raysOpacity }}
          className="absolute -top-20 right-[20%] w-24 h-[120%] bg-linear-to-b from-yellow-400/50 via-yellow-400/20 to-transparent blur-3xl origin-top rotate-10 sm:rotate-30"
        />
      </div>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-6 pt-28 pb-20 text-center sm:px-10">
        <div className="inline-flex items-center gap-2 rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-yellow-300">
          Abhivyakti 2026
        </div>

        <div className="space-y-4">
          <p className="text-md uppercase tracking-[0.4em] text-yellow-200/70">
            Backstage only
          </p>
          <h1 className="text-6xl font-besta font-semibold text-yellow-100 sm:text-7xl md:text-8xl">
            404
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70 sm:text-lg">
            You found the circus area. Its probably prohibited, and 100 percent
            not your ticket. Lets get you back to the main ring.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="rounded-lg bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
          >
            Back to Home
          </Link>
          <Link
            to="/explore"
            className="rounded-lg border border-yellow-300/50 px-6 py-3 text-sm font-semibold text-yellow-200 transition hover:border-yellow-200 hover:text-yellow-100"
          >
            Explore Events
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-yellow-200/60">
          <span className="h-px w-10 bg-yellow-300/40" />
          Lost in the big top
          <span className="h-px w-10 bg-yellow-300/40" />
        </div>
      </main>
    </div>
  );
};

export default NotFound;
