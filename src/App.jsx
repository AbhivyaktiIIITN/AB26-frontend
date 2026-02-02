import { Routes, Route } from "react-router-dom";
import Sponsor from "./pages/Sponsors";
// import Product from "./components/Razorpay/Product";

function App() {
  return (
    <Routes>
      {/* Home route */}
      <Route
        path="/"
        element={
          <h1 className="text-3xl font-bold underline text-cyan-500">
            Hello Vite + React!
          </h1>
        }
      />

      {/* Sponsors route */}
      <Route path="/sponsors" element={<Sponsor />} />

      {/* Razorpay demo route (optional for later) */}
      {/* <Route path="/payment-test" element={<Product />} /> */}
    </Routes>
  );
}

export default App;
