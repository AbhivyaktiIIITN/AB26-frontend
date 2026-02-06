import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ModalAuthLayout from "./components/auth/ModalAuthLayout";
import Footer from "./components/common/Footer/Footer";
import Navbar from "./components/common/Navbar/Navbar";
import Home from "./components/home/Home";
import NotFound from "./components/not-found/NotFound";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // for toast
    <ToastProvider>
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
        </Routes>

        <Footer />
        {/* for auth modals, don't move this */}
        <ModalAuthLayout />
      </div>
    </ToastProvider>
  );
}

export default App;
