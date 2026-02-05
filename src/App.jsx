import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ModalAuthLayout from "./components/auth/ModalAuthLayout";
import Navbar from "./components/navbar/Navbar";
import { ToastProvider } from "./contexts/ToastContext";
// import Home from "./components/Home"
// import Product from "./components/Product"
// import AboutTheme from "./components/AboutTheme"

// import GuestsSpeakers from './components/GuestsSpeakers'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // for toast
    <ToastProvider>
      <div className="min-h-screen">
        {/* testing login state - TEMPORARY */}
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="fixed bottom-6 right-6 z-100 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        {/* obv the navbar */}
        <Navbar isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* for auth modals, don't move this */}
        <ModalAuthLayout />
      </div>
    </ToastProvider>
  );
}

  // =====================
  // Helpers
  // =====================

  // Home Page
  const HomePage = () => (
    <>
      <div
        className="relative h-[1200px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
      </div>

      <div className="bg-white h-[1000px] w-full relative z-10">
        <h2 className="text-black text-center pt-10">
          Scroll down to see more...
        </h2>
      </div>
    </>
  );

  // 404 Not Found Page
  const NotFoundPage = () => (
    <div className="pt-20 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );

  //     <>
  //       {/* <h1
  //         className="text-3xl font-bold underline text-cyan-500"
  //       >
  //         Hello Vite + React!
  //       </h1> */}
  //       <Home />
  //       <AboutTheme />

  //       {Razorpahy test: For demo of working}
  //       {/* <Product/>   */}
  //     </>
  //     <div className="App">
  //       <GuestsSpeakers />
  //     </div>
  // )

export default App
