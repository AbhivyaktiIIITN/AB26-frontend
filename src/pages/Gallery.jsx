import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryHero from "../components/Gallery/GalleryHero";
import Masonry from "../components/Gallery/Masonry";
import { items } from "../components/Gallery/galleryData";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const wrapperRef = useRef(null);
  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const [masonryHeight, setMasonryHeight] = useState(0);

  // Update layout when Masonry reports its height
  const updateLayout = useCallback((height) => {
    setMasonryHeight(height);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    const content = contentRef.current;

    if (!wrapper || !viewport || !content || masonryHeight === 0) return;

    // Refresh ScrollTrigger to ensure it knows about the new content dimensions
    ScrollTrigger.refresh();

    // The viewport height is fixed (e.g. 80vh).
    // We scroll the content (masonryHeight) within this viewport.
    const viewportHeight = viewport.offsetHeight;
    const verticalScrollAmount = masonryHeight - viewportHeight + 100; // +100 padding

    if (verticalScrollAmount <= 0) return;

    // Pin the wrapper for a duration proportional to the content drift
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: `+=${verticalScrollAmount}`,
      pin: true,
      scrub: 1,
      animation: gsap.to(content, {
        y: -verticalScrollAmount,
        ease: "none",
      }),
      invalidateOnRefresh: true,
    });

    return () => {
      st.kill();
    };
  }, [masonryHeight]);

  return (
    <main className="bg-black relative z-0">
      <GalleryHero />

      {/* Wrapper that is pinned to the screen */}
      <div
        ref={wrapperRef}
        className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Fixed Header (Optional, stays at top of screen or inside wrapper) */}
        <div className="absolute top-0 left-0 w-full z-20 bg-black/80 backdrop-blur-md border-b border-white/10 flex justify-center">
             <div className="flex items-center justify-center gap-4 py-8 px-4 w-full max-w-[1400px]">
                <div className="h-[2px] w-1/4 max-w-[200px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <h1 className="text-3xl md:text-5xl font-[Gabarito] font-bold text-[#D4AF37] tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(212,175,55,0.5)]">
                  Gallery
                </h1>
                <div className="h-[2px] w-1/4 max-w-[200px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
        </div>

        {/* 
            The "Viewport" - A fixed window through which we view the gallery 
            Centered in the pinned section.
        */}
        <div 
          ref={viewportRef}
          className="relative w-full max-w-[1400px] h-[80vh] overflow-hidden mt-[100px]" // Top margin to clear header
        >
          {/* Top Gradient Mask */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

          {/* Moving Content Layer */}
          <div 
              ref={contentRef}
              className="w-full px-4 will-change-transform"
          >
            <Masonry
              items={items}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={false}
              colorShiftOnHover={false}
              onHeightChange={updateLayout}
            />
          </div>

          {/* Bottom Gradient Mask */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </div>
      </div>
      
      
      {/* Spacer to Ensure correct unpinning behavior - minimal height */}
      <div className="h-[10vh] bg-black"></div>
    </main>
  );
};

export default Gallery;
