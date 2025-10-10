import React from "react";

const Shipping: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* Card container */}
        <div className="bg-black/60 border border-white/5 rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-2">
            Shipping Policy
          </h1>

          <p className="text-center text-sm text-gray-400 mb-8">
              Thank you for shopping with{" "}
              <span className="font-semibold text-white">
              OSIRIS
              
              </span>
              . This Shipping Policy explains how we process, deliver, and handle
              orders.
          </p>

          <div className="prose prose-invert max-w-none text-gray-200 prose-p:leading-relaxed">
           
            <h2 className="text-red-500">1. Order Processing</h2>
            <ul>
              <li>
                Orders are processed within 1-2 business days after payment
                confirmation.
              </li>
              <li>
                Orders placed on weekends or public holidays will be processed
                on the next business day.
              </li>
              <li>
                You will receive an email/SMS notification once your order is
                shipped.
              </li>
            </ul>

            <h2 className="text-red-500">2. Shipping Methods &amp; Delivery Time</h2>
            <ul>
              <li>
                We ship through trusted courier partners to ensure safe
                delivery.
              </li>
              <li>
                Estimated delivery times:
                <ul className="list-disc list-inside ml-4">
                  <li>
                    <strong>Domestic Orders (within INDIA):</strong>{" "}
                    [3-7 Days]
                  </li>
                  <li>
                    <strong>International Orders:</strong> coming soon!
                  </li>
                </ul>
              </li>
              <li>
                Delivery times are estimates and may vary due to courier delays,
                weather, or unforeseen circumstances.
              </li>
            </ul>

            <h2 className="text-red-500">3. Shipping Charges</h2>
            <ul>
              <li>
                Shipping costs are calculated at checkout based on order value,
                location, and shipping method.
              </li>
              <li>
                We may offer free shipping on orders above [X amount].
              </li>
            </ul>

            <h2 className="text-red-500">4. Order Tracking</h2>
            <ul>
              <li>
                Once shipped, you will receive a tracking number via email/SMS.
              </li>
              <li>Tracking updates may take 24–48 hours to reflect.</li>
            </ul>

            <h2 className="text-red-500">5. Address &amp; Delivery Issues</h2>
            <ul>
              <li>
                Please ensure your shipping address and contact details are
                correct at checkout.
              </li>
              <li>
                We are not responsible for failed deliveries due to incorrect or
                incomplete addresses.
              </li>
              <li>
                If a package is returned due to an incorrect address, reshipping
                charges may apply.
              </li>
            </ul>

            <h2 className="text-red-500">6. International Shipping (if applicable)</h2>
            <ul>
              <li>
                Customs duties, taxes, or import fees (if any) are the
                responsibility of the customer.
              </li>
              <li>
                We are not responsible for delays caused by customs clearance.
              </li>
            </ul>

            <h2 className="text-red-500">7. Lost or Damaged Packages</h2>
            <ul>
              <li>
                If your package is lost or arrives damaged, contact us within 24hours of delivery.
              </li>
              <li>
                We will assist in filing a claim with the courier and provide a
                replacement/refund where applicable.
              </li>
            </ul>

            <h2 className="text-red-500">8. Contact Us</h2>
            <p>For shipping-related questions, please reach us:</p>
            <ul>
              <li>
                📧 Email: <span className="text-white">team@osirisclothing.site</span>
              </li>
              {/* <li>
                📞 Phone: <span className="text-white">[Your Phone Number]</span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
