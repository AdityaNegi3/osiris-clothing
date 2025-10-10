import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* Card / content container */}
        <div className="bg-black/60 border border-white/5 rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-2">
            Terms &amp; Conditions
          </h1>
            <p className="text-center text-sm text-gray-400 mb-8">
              Welcome to{" "}
              <span className="font-semibold text-white">
               OSIRIS
              </span>
              . By accessing or purchasing from our website, you agree to comply
              with the following Terms &amp; Conditions. Please read them
              carefully.
             </p>
        

          <div className="prose prose-invert max-w-none text-gray-200 prose-p:leading-relaxed">
         
            <h2 className="text-red-500">1. General</h2>
            <ul>
              <li>
                These Terms govern your use of our website, products, and
                services.
              </li>
              <li>
                By placing an order, you acknowledge that you have read,
                understood, and accepted these Terms.
              </li>
              <li>
                We reserve the right to update, modify, or replace any part of
                these Terms at any time.
              </li>
            </ul>

            <h2 className="text-red-500">2. Products &amp; Orders</h2>
            <ul>
              <li>
                All products are subject to availability. We reserve the right
                to refuse or cancel any order.
              </li>
              <li>
                Product images and descriptions are for reference only. Colors,
                sizes, and textures may slightly vary.
              </li>
              <li>
                Prices are listed in Indian rupee and may change without
                notice.
              </li>
            </ul>

            <h2 className="text-red-500">3. Payments</h2>
            <ul>
              <li>
                We accept payments through 
                UPI, credit/debit cards.
              </li>
              <li>
                By providing payment details, you confirm that you are authorized
                to use the chosen payment method.
              </li>
            </ul>

            <h2 className="text-red-500">4. Shipping &amp; Delivery</h2>
            <ul>
              <li>
                Shipping times may vary depending on your location. Estimated
                delivery times will be provided at checkout.
              </li>
              <li>
                We are not responsible for delays caused by courier services,
                customs, or unforeseen events.
              </li>
              <li>
                Risk of loss passes to you once the order has been dispatched.
              </li>
            </ul>

            {/* <h2 className="text-red-500">5. Returns &amp; Exchanges</h2>
            <ul>
              <li>
                Returns/exchanges are accepted within [X days] of delivery,
                provided items are unworn, unwashed, and in original packaging.
              </li>
              <li>
                Certain products (e.g., sale items, custom/personalized orders)
                may not be eligible for return.
              </li>
              <li>
                Refunds will be processed to the original payment method within
                [X days] after approval.
              </li>
              <li>
                Customers are responsible for return shipping costs unless the
                product is defective/damaged.
              </li>
            </ul> */}

            <h2 className="text-red-500">5. Intellectual Property</h2>
            <p>
              All designs, logos, trademarks, product images, and website
              content belong to <strong>OSIRIS</strong>. You
              may not reproduce, distribute, or use our intellectual property
              without prior written consent.
            </p>

            <h2 className="text-red-500">6. Limitation of Liability</h2>
            <ul>
              <li>
                We are not liable for any indirect, incidental, or consequential
                damages resulting from the use of our products or website.
              </li>
              <li>
                Our liability for defective products is limited to the purchase
                price of the product.
              </li>
            </ul>

            <h2 className="text-red-500">7. Privacy Policy</h2>
            <p>
              By using our services, you agree to the collection and use of
              information as described in our Privacy Policy. We are committed
              to protecting your personal information and ensuring secure
              transactions.
            </p>

            <h2 className="text-red-500">8. Contact Us</h2>
            <p>
              For questions or concerns regarding these Terms &amp; Conditions,
              please contact us:
            </p>
            <ul>
              <li>
                📧 Email: <span className="text-white">team@osirisclothing.site</span>
              </li>
              {/* <li>
                📞 Phone: <span className="text-white">[Your Phone Number]</span>
              </li> */}
              {/* <li>
                📍 Address: <span className="text-white">[Your Business Address]</span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
