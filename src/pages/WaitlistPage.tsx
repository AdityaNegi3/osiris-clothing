// // src/pages/WaitlistPage.tsx
// import React, { useState } from "react";

// const WaitlistPage: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Email submitted:", email); // TODO: connect to Formspree/Mailchimp
//     setSubmitted(true);
//   };

//   return (
//     <div
//       className="relative flex flex-col items-center justify-center min-h-screen text-white text-center px-4 bg-cover bg-center"
//       style={{ backgroundImage: "url('/file_000000009b4c61f8adbdc1dadf14d82f.png')" }} // 👈 replace with your actual file name
//     >
//       {/* 🔥 Dark overlay */}
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* Content */}
//       <div className="relative z-10">
//         <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wide drop-shadow-lg">
//           OSIRIS
//         </h1>
//         <p className="text-xl text-gray-300 mb-8 drop-shadow-md">
//           Where Luxury Meets Legacy
//         </p>

//         {!submitted ? (
//           <form
//             onSubmit={handleSubmit}
//             className="flex w-full max-w-lg rounded-lg overflow-hidden shadow-lg"
//           >
//             <input
//               type="email"
//               placeholder="Enter your email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="flex-1 px-4 py-3 text-black focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="bg-black hover:bg-gray-900 px-6 py-3 font-semibold text-white transition-colors duration-300"
//             >
//               Join Waitlist
//             </button>
//           </form>
//         ) : (
//           <p className="text-green-400 font-semibold text-lg mt-4">
//             You're on the list 👑
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WaitlistPage;
