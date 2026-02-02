
import { Routes, Route } from "react-router-dom";
// import Product from "./components/Razorpay/Product";

//import Product from "./components/Product"
import Sponsors from "./pages/Sponsors";


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
      <Route path="/sponsors" element={<Sponsors />} />

      {/* Razorpay demo route (optional for later) */}
      {/* <Route path="/payment-test" element={<Product />} /> */}
    </Routes>
  );
}

export default App;
