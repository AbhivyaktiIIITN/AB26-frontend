import Lenis from "lenis";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthModalProvider } from "./components/auth/ModalAuthLayout";
import Footer from "./components/common/Footer/Footer";
import Navbar from "./components/common/Navbar/Navbar";
import NotFound from "./components/not-found/NotFound";
import { ToastProvider } from "./contexts/ToastContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import PassesStay from "./pages/PassesStay";
import Sponsors from "./pages/Sponsors";
import Teams from "./pages/Teams";
import Developers from "./pages/Developers";
import TestPay from "./pages/TestPay";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import CancellationAndRefunds from "./pages/CancellationAndRefunds";
import Gallery from "./pages/Gallery";

gsap.registerPlugin(ScrollTrigger);

function App() {
  // useEffect(() => {
  //   document.documentElement.style.setProperty(
  //     "--asset-base-url",
  //     import.meta.env.VITE_ASSET_BASE_URL
  //   );

  //   // console.log("Asset Base URL:", import.meta.env.VITE_ASSET_BASE_URL);
  // }, []);

  //  ======Lenis - Smooth Scrolling=======
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis for perfect synchronization
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing to prevent stuttering
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);
  //  =====================================

  //  ===========Scroll Reseter============
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
  };

  //  =====================================

  return (
    // for toast
    <ToastProvider>
      {/* Auth modal provider */}
      <AuthModalProvider>
        <Analytics />
        <ScrollToTop />
        <div className="min-h-screen">
          {/* obv the navbar */}
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<About />} />
            <Route path="/passes" element={<PassesStay />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testpay" element={<TestPay />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/cancellation" element={<CancellationAndRefunds />} />
            {/* <Route path="/gallery" element={<Gallery />} /> */}
          </Routes>

          <Footer />
        </div>
      </AuthModalProvider>
    </ToastProvider>
  );
}

export default App;

// registeration and passes final
// touchup
//
