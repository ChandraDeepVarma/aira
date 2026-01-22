"use client";

import { useEffect, useState } from "react";
import ProductSkeleton from "@/components/productskeleton";

export default function Products() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrize, setProductPrize] = useState("");
  const [productImage, setProductImage] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productAdded, setProductAdded] = useState(false);

  //if cookie is the redirect to this page

  const handleAddProduct = async () => {
    //  e.preventDefault();

    try {
      const formDate = new FormData();
      formDate.append("productName", productName);
      formDate.append("productDescription", productDescription);
      formDate.append("productPrize", productPrize);

      if (productImage) {
        formDate.append("productImage", productImage);
      } else {
        alert("Product Image Required");
      }

      const response = await fetch("/api/products", {
        method: "POST",
        body: formDate,
      });
      const data = await response.json();

      if (response.ok) {
        // alert("Product Added Successfully");

        setProductName("");
        setProductDescription("");
        setProductPrize("");
        setProductImage("");
        setProductAdded(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {});

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
      {/* ================= Add Product ================= */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="font-bold text-3xl text-black mb-6">Add Product</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end text-black">
          <div className="text-left">
            <label className="block text-sm mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm mb-1">Description</label>
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm mb-1">Product Prize</label>
            <input
              type="text"
              value={productPrize}
              onChange={(e) => setProductPrize(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <button
            type="submit"
            onClick={handleAddProduct}
            className="border border-gray-300 rounded w-full p-2 hover:bg-gray-100 transition"
          >
            Add Product
          </button>
        </div>
      </div>

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

                  {/* <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full transition hover:bg-gray-800">
                    Buy Now
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
