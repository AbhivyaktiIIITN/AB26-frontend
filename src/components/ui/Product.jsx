import TshirtImg from "../../public/tshirt.svg";

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

          <button
            disabled
            className="bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed"
          >
            Payments Disabled
          </button>

        </div>

      </div>
    </div>
  );
}

export default Product;
