import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const GallerySection = ({ title, items }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Lock scroll when modal is open
    useEffect(() => {
        if (selectedImage && window.lenis) {
            window.lenis.stop();
        } else if (window.lenis) {
            window.lenis.start();
        }
        return () => window.lenis?.start();
    }, [selectedImage]);

    return (
        <section className="bg-black py-20 px-4 md:px-10 lg:px-20 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-center gap-4 mb-16 px-4">
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-[#611a14]" />
                    <h2
                        className="text-center text-4xl md:text-5xl lg:text-6xl text-[#F5F5F0] tracking-[0.15em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-4"
                        style={{ fontFamily: '"Besta Baru", serif' }}
                    >
                        {title}
                    </h2>
                    <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-[#611a14]" />
                </div>

                {/* Simplified Grid / Masonry */}
                <div
                    className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedImage(item.img)}
                            className="relative break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <motion.img
                                src={item.img}
                                alt=""
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    minHeight: "200px"
                                }}
                                loading="lazy"
                            />

                            {/* Premium Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Expanded View */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-999999 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    >
                        <motion.button
                            className="absolute top-10 right-10 z-1000000 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </motion.button>

                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            src={selectedImage}
                            alt="Expanded"
                            className="max-w-[92vw] max-h-[85vh] md:max-w-[80vw] md:max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GallerySection;
