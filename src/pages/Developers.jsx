import { useState } from "react";
import MinimalPayButton from "../components/payment/MinimalPayButton";

export default function Developers() {
  const [amount, setAmount] = useState(500);
  const [eventId, setEventId] = useState("");
  const [contact, setContact] = useState("");

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <MinimalPayButton
        amount={amount}
        eventId={eventId || null}
        contact={contact || null}
        title="AB26 Test Payment"
        description="Testing payment integration"
        className="w-16 h-10 text-lg text-center align-middle cursor-pointer font-semibold"
      >
        Pay ₹{amount}
      </MinimalPayButton>
    </div>
  );
}
