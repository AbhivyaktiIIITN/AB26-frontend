import Lenis from "lenis";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ModalAuthLayout from "./components/auth/ModalAuthLayout";
import Footer from "./components/common/Footer/Footer";
import Navbar from "./components/common/Navbar/Navbar";
import Home from "./components/home/Home";
import NotFound from "./components/not-found/NotFound";
import { ToastProvider } from "./contexts/ToastContext";
import Sponsors from "./pages/Sponsors";
import Teams from "./pages/Teams";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //  ======Lenis - Smooth Scrolling=======
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

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
      <ScrollToTop />
      <div className="min-h-screen">
        {/* obv the navbar */}
        <Navbar isLoggedIn={isLoggedIn} />

        {/* testing login state - TEMPORARY
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="fixed bottom-6 right-6 z-100 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>

        <Footer />
        {/* for auth modals, don't move this */}
        <ModalAuthLayout />
      </div>
    </ToastProvider>
  );
}

export default App;
