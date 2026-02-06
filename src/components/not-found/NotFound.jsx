import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-yellow-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-amber-400/10 blur-3xl"
      />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-6 pt-28 pb-20 text-center sm:px-10">
        <div className="inline-flex items-center gap-2 rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-yellow-300">
          Abhivyakti 2026
        </div>

        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-yellow-200/70">
            Backstage only, nice try
          </p>
          <h1 className="text-6xl font-semibold tracking-tight text-yellow-100 sm:text-7xl md:text-8xl">
            404
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70 sm:text-lg">
            You found the circus area. Its probably prohibited, kinda sus, and
            100 percent not your ticket. Lets get you back to the main ring.
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
