import { Analytics } from "@vercel/analytics/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  AuthModalProvider,
  useAuthModal,
} from "./components/auth/ModalAuthLayout";
import Footer from "./components/common/Footer/Footer";
import Navbar from "./components/common/Navbar/Navbar";
import NotFound from "./components/not-found/NotFound";
import { useAuth } from "./contexts/AuthProvider";
import { ToastProvider } from "./contexts/ToastContext";
import { checkMissingProfileFields } from "./lib/user-client";
import About from "./pages/About";
import CancellationAndRefunds from "./pages/CancellationAndRefunds";
import Contact from "./pages/Contact";
import Developers from "./pages/Developers";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import PassesStay from "./pages/PassesStay";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import Sponsors from "./pages/Sponsors";
import Teams from "./pages/Teams";
import TermsAndConditions from "./pages/TermsAndConditions";
import TestPay from "./pages/TestPay";
import UserData from "./pages/UserData";
import Gallery from "./pages/Gallery";

gsap.registerPlugin(ScrollTrigger);

// Profile completion checker
const ProfileCompletionChecker = () => {
  const { user, isAuthenticated } = useAuth();
  const { openAuth, mode, isOpen } = useAuthModal();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Only check if modal is not already open
    if (isOpen) return;

    const checkProfile = async () => {
      try {
        const result = await checkMissingProfileFields(user.id);
        if (!result.isComplete && result.missingFields.length > 0) {
          openAuth("profile-completion");
        }
      } catch (err) {
        console.error("Error checking profile:", err);
      }
    };

    const timer = setTimeout(checkProfile, 500);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, pathname, isOpen, openAuth]);

  return null;
};

function App() {
  const lenisRef = useRef(null); // Create a reference to store Lenis instance

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

    lenisRef.current = lenis; // Save the instance to the ref

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis for perfect synchronization
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing to prevent stuttering
    gsap.ticker.lagSmoothing(0);

    // Expose the Lenis instance globally so modals can control it
    window.lenis = lenis;

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
        <ProfileCompletionChecker />
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
            <Route path="/events" element={<Explore />} />
            <Route path="/about" element={<About />} />
            <Route path="/passes" element={<PassesStay />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testpay" element={<TestPay />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/cancellation" element={<CancellationAndRefunds />} />
            <Route path="/myaccount" element={<UserData />} />
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
