// src/components/OsirisWaitlist.tsx
import React, { useRef, useState } from "react";

interface OsirisWaitlistProps {
  formEndpointOrId?: string;
  nextUrl?: string;
  useAjax?: boolean;
}

export default function OsirisWaitlist({
  formEndpointOrId = "https://formspree.io/f/xjkaardz",
  nextUrl = "/thank-you",
  useAjax = true,
}: OsirisWaitlistProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const buildEndpoint = (raw: string) => {
    if (!raw) return "";
    if (raw.startsWith("http")) return raw;
    if (raw.startsWith("f/") || raw.startsWith("/f/")) {
      const trimmed = raw.replace(/^\/?/, "");
      return `https://formspree.io/${trimmed}`;
    }
    return `https://formspree.io/f/${raw}`;
  };

  const endpoint = buildEndpoint(formEndpointOrId);

  const validateEmail = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter an email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Please enter a valid email";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfoMessage(null);

    const v = validateEmail(email);
    if (v) {
      setError(v);
      return;
    }

    if (!endpoint) {
      setError("Form endpoint not configured. Replace FORM_ID_REPLACE_ME with your Formspree form id.");
      return;
    }

    setSubmitting(true);

    try {
      if (useAjax) {
        const resp = await fetch(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            _next: nextUrl || (typeof window !== "undefined" ? window.location.href : ""),
            _subject: "New waitlist signup — Osiris Clothing",
          }),
        });

        const text = await resp.text();
        let json: any = null;
        try {
          json = text ? JSON.parse(text) : null;
        } catch (err) {}

        if (!resp.ok) {
          const msg =
            (json && (json.error || json.message)) ||
            `Submission failed (HTTP ${resp.status}). Check your form settings and quota.`;
          setError(msg);
        } else {
          const msg =
            (json && (json.message || json.success)) ||
            "Thanks — your request was submitted. Check your inbox for any confirmation from Formspree.";
          setInfoMessage(msg);
          setShowPopup(true);
          setEmail("");
        }
      } else {
        formRef.current?.submit();
      }
    } catch (err: any) {
      console.error("Formspree submit error:", err);
      setError(err?.message || "Network error while submitting the form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      style={{
        background:
          "radial-gradient(800px 300px at 10% 12%, rgba(198,13,31,0.08), transparent 8%), " +
          "radial-gradient(700px 280px at 90% 90%, rgba(198,13,31,0.05), transparent 10%), " +
          "linear-gradient(180deg, #000000 0%, #060606 100%)",
      }}
    >
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-[1fr,420px] gap-6 md:gap-8">
        {/* HERO / LEFT */}
        <section
          className="relative p-6 md:p-8 rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.006))",
            border: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              right: -120,
              top: -80,
              width: 420,
              height: 420,
              borderRadius: "50%",
              filter: "blur(36px)",
              transform: "rotate(18deg)",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,31,58,0.18), transparent 20%), conic-gradient(from 220deg, #c60d1f, rgba(255,31,58,0))",
              opacity: 0.95,
            }}
          />

          <div className="flex items-center gap-4 relative z-10">
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center font-extrabold text-sm"
              style={{
                background: "linear-gradient(135deg,#ff4a4a,#b10f17)",
                color: "#0b0b0b",
                boxShadow: "inset 0 6px 18px rgba(198,13,31,0.22)",
              }}
            >
              osiris
            </div>

            <div className="relative z-10">
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.72)", letterSpacing: "0.6px" }}>
                Osiris Clothing
              </div>
              <div style={{ color: "rgba(255,255,255,0.12)", fontSize: 12 }}>Street · Limited · Ritual</div>
            </div>
          </div>

          <h1 className="mt-6 text-3xl md:text-4xl leading-tight relative z-10" style={{ color: "#ffffff" }}>
            Get early access to drops
          </h1>

          <p className="mt-3 max-w-prose relative z-10 text-base md:text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
            We design limited-run streetwear with occult and dragon-inspired aesthetics.
            Join the waitlist to receive exclusive drop info, early access and members-only offers.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 relative z-10">
            <span className="px-3 py-1 rounded-full text-sm" style={{ background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.72)" }}>Limited drops</span>
            <span className="px-3 py-1 rounded-full text-sm" style={{ background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.72)" }}>First access</span>
            <span className="px-3 py-1 rounded-full text-sm" style={{ background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.72)" }}>Member discounts coupons</span>
          </div>
        </section>

        {/* FORM / RIGHT */}
        <aside
          className="p-5 md:p-7 rounded-2xl shadow-xl"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))",
            border: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <h3 className="text-2xl md:text-xl font-semibold" style={{ color: "#ffffff" }}>Join the waitlist</h3>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
            Drop your email and we'll notify you when new items launch. No spam — unsubscribe anytime.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            action={endpoint}
            method="POST"
            className="mt-5"
          >
            <input type="hidden" name="_subject" value="New waitlist signup — Osiris Clothing" />
            <input type="hidden" name="_next" value={nextUrl || (typeof window !== "undefined" ? window.location.href : nextUrl)} />
            <div style={{ display: "none" }}>
              <label>
                If you are human, leave this blank: <input name="_honey" />
              </label>
            </div>

            {/* input row: stacked on mobile, horizontal on sm+ */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <label htmlFor="osiris-email" className="sr-only">Email</label>
              <input
                id="osiris-email"
                type="email"
                name="email"
                aria-label="Email address"
                placeholder="you@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-2xl px-4 py-4 outline-none text-base"
                style={{
                  background: "#0b0b0b",
                  border: "1px solid rgba(255,255,255,0.03)",
                  color: "#fff",
                  boxShadow: "inset 0 4px 12px rgba(0,0,0,0.4)",
                  minHeight: 56,
                }}
              />

              {/* Button: full width on mobile, compact on desktop */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-0 sm:mt-0 sm:self-start rounded-2xl font-bold px-6 py-3 text-lg sm:text-base"
                style={{
                  width: "100%",
                  maxWidth: 220,
                  background: "linear-gradient(90deg,#ff3b3b,#c60d1f)",
                  color: "#0b0b0b",
                  alignSelf: "center",
                }}
              >
                {submitting ? "Sending..." : "Get on the list"}
              </button>
            </div>

            {/* errors / success */}
            {error && (
              <div className="text-sm mt-3" style={{ color: "#ff6b6b", whiteSpace: "pre-wrap" }}>{error}</div>
            )}

            {/* (kept hidden inline message for debug/accessibility) */}
            {infoMessage && (
              <div className="text-sm mt-3" style={{ color: "rgba(158,246,201,1)", whiteSpace: "pre-wrap", display: "none" }}>
                {infoMessage}
              </div>
            )}

            <div className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.55)" }}>
              We only use your email for Osiris updates. By joining you agree to receive our emails.
            </div>
          </form>

          <div className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
            Questions?{" "}
            <a href="mailto:hello@osirisclothing.site" style={{ color: "#ff4a4a", textDecoration: "none" }}>
              Contact us
            </a>
          </div>
        </aside>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="osiris-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* overlay */}
          <div
            className="absolute inset-0"
            onClick={() => setShowPopup(false)}
            style={{ background: "rgba(0,0,0,0.72)" }}
          />

          {/* modal content */}
          <div
            className="relative z-10 max-w-md w-full rounded-2xl p-6 text-center shadow-2xl"
            style={{ background: "#0b0b0b", border: "1px solid rgba(255,255,255,0.04)", color: "#fff" }}
          >
            <h2 id="osiris-modal-title" className="text-2xl font-semibold mb-3">
              Thanks!
            </h2>
            <p className="mb-6" style={{ color: "rgba(255,255,255,0.85)", fontSize: 16 }}>
              We'll review the shortlisted candidates and send you a confirmation email.
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="rounded-2xl px-5 py-3 font-semibold"
                style={{ background: "linear-gradient(90deg,#ff3b3b,#c60d1f)", color: "#0b0b0b" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
