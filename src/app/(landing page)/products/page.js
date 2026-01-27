"use client";

import { useState, useEffect } from "react";
import ProductSkeleton from "@/components/productskeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();

        setProducts(Array.isArray(data.Products) ? data.Products : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    setProductAdded(false);
  }, [productAdded]);

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const search = searchTerm.toLowerCase().replace(/\s+/g, "");

        const name = (product.productName || "")
          .toLowerCase()
          .replace(/\s+/g, "");

        const description = (product.productDescription || "")
          .toLowerCase()
          .replace(/\s+/g, "");

        const tagsMatch = Array.isArray(product.tags)
          ? product.tags.some(
              (tag) =>
                tag &&
                typeof tag === "object" &&
                typeof tag.name === "string" &&
                tag.name
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .includes(search),
            )
          : false;

        return (
          name.includes(search) ||
          description.includes(search) ||
          tagsMatch
        );
      })
    : [];

  /* ================= UI ================= */

  return (
    <div className="bg-zinc-50 min-h-screen p-10 pt-24 pb-24 space-y-16">
      {/* Title */}
      <h1 className="text-center text-3xl font-bold text-black">
        All Products
      </h1>

      {/* Search */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-black text-black"
        />
      </div>

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* IMAGE SLIDER */}
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  loop={true}
                  className="h-full product-card-swiper"
                >
                  {product.productImages?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img.url}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.productName}
                </h2>

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
