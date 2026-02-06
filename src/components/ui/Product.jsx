import TshirtImg from "../../public/tshirt.svg";
import PayButton from "../Razorpay/PayButton";

function Product() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6">

        <img
          src={TshirtImg}
          alt="Tshirt"
          className="w-48 mx-auto mb-4"
        />

        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Solid Blue T-Shirt
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Premium cotton t-shirt for daily wear
        </p>

        <div className="flex items-center justify-between mt-6">
          <span className="text-xl font-bold text-gray-900">
            ₹24
          </span>

          <PayButton
            amount={24}
            currency="INR"
            receipt="event_pass_123" //reciept number optional 
            userId={1}
            title="IIITN Abhivyakti26"
            description="Event Passes"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Pay Now
          </PayButton>

        </div>

      </div>
    </div>
  );
}

export default Product;
