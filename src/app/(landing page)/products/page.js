"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ProductSkeleton from "@/components/productskeleton";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
</style>;

// export const metadata = {
//   title: "Products Page",
//   description: "You are watching Products page",
// };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.Products);
      setLoading(false);
      console.log(data);
    };
    loadData();
    setProductAdded(false);
  }, [productAdded]);

  return (
    <div className="bg-zinc-50 font-sans min-h-screen p-10 pt-24 pb-24 space-y-16">
      {" "}
      {/* ================= All Products ================= */}
      <div className="space-y-4">
        <h1 className="text-center text-3xl font-bold text-black">
          All Products
        </h1>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.productImage.url}
                  alt={product.productName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h1 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.productName}
                </h1>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.productDescription}
                </p>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-xl font-bold text-green-600">
                    ₹{product.productPrize}
                  </span>

                  <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full transition hover:bg-gray-800">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
