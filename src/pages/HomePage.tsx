import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { ArrowRight } from "lucide-react";

const HomePage: React.FC = () => {
  const limitedProducts = products.filter((p) => p.category === "limited");
  const darkProducts = products.filter((p) => p.category === "dark");

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative min-h-screen w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.png')" }}
        />

        {/* Light overlay for visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />

        {/* Hero Text */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
          <h1 className="text-5xl font-bold">Welcome to MONARC</h1>
          <p className="mt-4 text-lg">Luxury streetwear collections</p>
        </div>
      </div>

      {/* Chaos Edition Section */}
      <section className="py-20 px-6 bg-black text-white">
        <h2 className="text-4xl font-bold mb-10 text-center">CHAOS EDITION</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {limitedProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="group block"
            >
              <div className="aspect-w-3 aspect-h-4 relative overflow-hidden rounded-2xl shadow-lg">
                {/* Front Image */}
                <img
                  src={product.frontImage}
                  alt={product.name}
                  className="w-full h-80 object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                {/* Back Image */}
                <img
                  src={product.backImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-80 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-400">₹{product.price}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/collections/limited"
            className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-200 transition"
          >
            Explore Chaos Edition <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Dark Edition Section */}
      <section className="py-20 px-6 bg-gray-950 text-white">
        <h2 className="text-4xl font-bold mb-10 text-center">DARK EDITION</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {darkProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="group block"
            >
              <div className="aspect-w-3 aspect-h-4 relative overflow-hidden rounded-2xl shadow-lg">
                {/* Front Image */}
                <img
                  src={product.frontImage}
                  alt={product.name}
                  className="w-full h-80 object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                {/* Back Image */}
                <img
                  src={product.backImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-80 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-400">₹{product.price}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/collections/dark"
            className="inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-200 transition"
          >
            Explore Dark Edition <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
