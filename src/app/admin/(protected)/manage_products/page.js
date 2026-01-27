"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductSkeleton from "@/components/productskeleton";

export default function Products() {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrize, setProductPrize] = useState("");
  const [productImage, setProductImage] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  /* ================= Add / Edit Product ================= */

  const handleAddProduct = async () => {
    try {
      /* ===== EDIT Form Code ===== */
      if (editingProductId) {
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productPrize", productPrize);
        formData.append("tags", JSON.stringify(selectedTags));

        if (productImage) {
          formData.append("productImage", productImage);
        }

        const response = await fetch(`/api/products?id=${editingProductId}`, {
          method: "PATCH",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setProducts((prev) =>
            prev.map((product) =>
              product._id === data.product._id ? data.product : product,
            ),
          );

          // Reset form
          setProductName("");
          setProductDescription("");
          setProductPrize("");
          setProductImage("");
          setEditingProductId(null);
          setSelectedTags([]);

          return;
        } else {
          alert("Update failed");
          return;
        }
      }

      // ============================== ADD PRODUCT LOGIC =============================

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("productPrize", productPrize);
      formData.append("tags", JSON.stringify(selectedTags));

      if (!productName || !productDescription || !productPrize) {
        alert("All fields are required");
        return;
      }

      if (!productImage) {
        alert("Product Image Required");
        return;
      }

      formData.append("productImage", productImage);

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setProductName("");
        setProductDescription("");
        setProductPrize("");
        setProductImage("");
        setProductAdded(true);
        setSelectedTags([]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= Delete Product ================= */

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(productId);

      const response = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  /* ================= Fetch Products ================= */

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log("TAGS FROM API:", data);

      setProducts(data.Products);
      setLoading(false);
    };

    loadData();
    setProductAdded(false);
  }, [productAdded]);

  /* ================= Fetch tags ================= */

  useEffect(() => {
    const loadTags = async () => {
      try {
        setTagsLoading(true);
        const response = await fetch("/api/productTags");
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error(error);
      } finally {
        setTagsLoading(false);
      }
    };

    loadTags();
  }, []);

  /* ================= Scroll Behaviour ================= */

  useEffect(() => {
    if (editingProductId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [editingProductId]);

  return (
    <div className="bg-zinc-50 font-sans min-h-screen p-10 pt-5 pb-24 space-y-16">
      {/* ================= Add / Edit Product ================= */}
      <div className="bg-white p-10 rounded-2xl shadow-lg">
        <h1 id="edit-form" className="font-bold text-4xl text-black mb-8">
          {editingProductId ? "Edit Product" : "Add Product"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Price
            </label>
            <input
              type="text"
              value={productPrize}
              onChange={(e) => setProductPrize(e.target.value)}
              className="w-full border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Description (BIG) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              rows={5}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter product description....."
              className="w-full border border-gray-300 p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          {/* Selected Tags Input Box */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Selected Tags
            </label>

            <div className="min-h-[56px] w-full border border-gray-300 p-3 flex flex-wrap gap-2 bg-white">
              {selectedTags.length === 0 ? (
                <span className="text-gray-400 text-sm">No tags selected</span>
              ) : (
                tags
                  .filter((tag) => selectedTags.includes(tag._id))
                  .map((tag) => (
                    <span
                      key={tag._id}
                      className="flex items-center gap-2 bg-black text-white px-3 py-1 text-sm"
                    >
                      {tag.name}
                      <button
                        onClick={() =>
                          setSelectedTags((prev) =>
                            prev.filter((id) => id !== tag._id),
                          )
                        }
                        className="text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  ))
              )}
            </div>
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Image {editingProductId && "(optional)"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              className="w-full border border-gray-300 p-3 bg-white"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              onClick={handleAddProduct}
              className="w-full bg-black text-white py-3 text-base font-medium hover:bg-gray-900 transition"
            >
              {editingProductId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>

        {/* ===== NEW CODE (Cancel Edit) ===== */}
        {editingProductId && (
          <button
            onClick={() => {
              setEditingProductId(null);
              setProductName("");
              setProductDescription("");
              setProductPrize("");
              setProductImage("");
            }}
            className="mt-2 text-sm text-red-600 underline"
          >
            Cancel Edit
          </button>
        )}
        {/* ===== END NEW CODE ===== */}
      </div>

      {/* ================= Tags & Flags ================= */}
      <div className="bg-[#fdebe] rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Select Tags for the product while adding
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          {tagsLoading ? (
            <span className="text-sm text-gray-500">Loading tags...</span>
          ) : (
            tags.map((tag) => {
              const isSelected = selectedTags.includes(tag._id);

              return (
                <button
                  key={tag._id}
                  onClick={() =>
                    setSelectedTags((prev) =>
                      prev.includes(tag._id)
                        ? prev.filter((id) => id !== tag._id)
                        : [...prev, tag._id],
                    )
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                isSelected
                  ? "bg-[#4a2c23] text-white border-[#4a2c23]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
                >
                  {tag.name}
                </button>
              );
            })
          )}
        </div>

        {/* Flags (static UI only for now) */}
        <div className="flex flex-wrap gap-4 mt-6">
          {[].map((flag) => (
            <label
              key={flag}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border cursor-pointer"
            >
              <input type="checkbox" className="accent-[#4a2c23]" />
              <span className="text-sm font-medium">{flag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ================= All Products ================= */}
      <h1 className="text-center text-3xl font-bold text-black">
        All Products
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.productImage.url}
                  alt={product.productName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

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

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => {
                        setEditingProductId(product._id);
                        setProductName(product.productName);
                        setProductDescription(product.productDescription);
                        setProductPrize(product.productPrize);
                        setProductImage(null);
                        setSelectedTags(product.tags || []);
                        // window.scrollTo({ top: 0, behavior: "smooth" });
                        document.getElementById("edit-form").scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      disabled={deletingId === product._id}
                      className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                    >
                      {deletingId === product._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
