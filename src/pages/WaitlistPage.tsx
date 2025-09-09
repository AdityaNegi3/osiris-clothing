import React from "react";
import OsirisWaitlist from "../components/OsirisWaitlist";

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <OsirisWaitlist
        recipientEmail="your-email@domain.com" // change this
        nextUrl="/thankyou" // optional redirect (you already have ThankYou.tsx)
      />
    </div>
  );
}
