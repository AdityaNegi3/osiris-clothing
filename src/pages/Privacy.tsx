import React from "react";

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* Card container */}
        <div className="bg-black/60 border border-white/5 rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-2">
            Privacy Policy
          </h1>
        <p className="text-center text-sm text-gray-400 mb-8">
             Your privacy is important to us. This Privacy Policy explains how{" "}
              <span className="font-semibold text-white">
                OSIRIS
              </span>{" "}
              collects, uses, and protects your information when you visit our
              website or make a purchase.
             </p>
        

          <div className="prose prose-invert max-w-none text-gray-200 prose-p:leading-relaxed">


            <h2 className="text-red-500">1. Information We Collect</h2>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email, phone
                number, billing/shipping address.
              </li>
              <li>
                <strong>Payment Information:</strong> Credit/debit card details,
                UPI, or other payment methods (processed securely through
                third-party providers).
              </li>
              <li>
                <strong>Usage Data:</strong> Website activity, IP address,
                browser type, device information, and cookies.
              </li>
            </ul>

            <h2 className="text-red-500">2. How We Use Your Information</h2>
            <ul>
              <li>Process and deliver your orders.</li>
              <li>Communicate with you regarding orders, offers, or updates.</li>
              <li>Improve our products, services, and website.</li>
              <li>
                Prevent fraud, protect security, and comply with legal
                requirements.
              </li>
            </ul>

            <h2 className="text-red-500">3. Sharing of Information</h2>
            <p>We do not sell or rent your personal data. We may share information only with:</p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Payment processors, delivery
                partners, marketing tools.
              </li>
              <li>
                <strong>Legal Authorities:</strong> If required by law,
                regulation, or court order.
              </li>
            </ul>

            <h2 className="text-red-500">4. Cookies &amp; Tracking Technologies</h2>
            <p>
              Our website may use cookies to improve user experience (e.g.,
              saving cart items, login sessions, analytics). You can disable
              cookies through your browser settings, but some features may not
              work properly.
            </p>

            <h2 className="text-red-500">5. Data Security</h2>
            <ul>
              <li>
                We take reasonable steps to protect your information against
                unauthorized access, alteration, or disclosure.
              </li>
              <li>
                Payment transactions are encrypted and processed securely.
              </li>
              
            </ul>

            <h2 className="text-red-500">6. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to:
            </p>
            <ul>
              <li>Access, update, or delete your personal data.</li>
              <li>Opt out of promotional emails or marketing communications.</li>
              <li>Request a copy of the data we hold about you.</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <span className="text-white">team@osirisclothing.site</span>.
            </p>

            <h2 className="text-red-500">7. Children’s Privacy</h2>
            <p>
              Our services are not directed to individuals under 16. We do not knowingly collect data
              from children.
            </p>

            <h2 className="text-red-500">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated "Effective Date."
            </p>

            <h2 className="text-red-500">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please reach out:</p>
            <ul>
              <li>
                📧 Email: <span className="text-white">team@osirisclothing.site</span>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
