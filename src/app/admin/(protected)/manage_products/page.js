"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductSkeleton from "@/components/productskeleton";
import Swal from "sweetalert2";
import {
  confirmAction,
  successAlert,
  errorAlert,
  loadingAlert,
} from "@/lib/alerts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Products() {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrize, setProductPrize] = useState("");
  const [productImage, setProductImage] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= Add / Edit Product ================= */

  const handleAddProduct = async () => {
    if (!productName || !productDescription || !productPrize) {
      return errorAlert("All fields are required");
    }

    if (!editingProductId && productImage.length === 0) {
      return errorAlert("At least one product image is required");
    }

    loadingAlert(
      editingProductId ? "Updating product..." : "Adding product...",
    );

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("productPrize", productPrize);
      formData.append("tags", JSON.stringify(selectedTags));

      if (productImage) {
        productImage.forEach((image) => {
          formData.append("productImages", image);
        });
      }

      const res = await fetch(
        editingProductId
          ? `/api/products?id=${editingProductId}`
          : "/api/products",
        {
          method: editingProductId ? "PATCH" : "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      Swal.close();
      successAlert(
        editingProductId
          ? "Product updated successfully"
          : "Product added successfully",
      );

      setProductAdded(true);
      setEditingProductId(null);
      setSelectedTags([]);
      setProductName("");
      setProductDescription("");
      setProductPrize("");
      setProductImage([]);
    } catch (err) {
      Swal.close();
      errorAlert(err.message);
    }
  };

  /* ================= Delete Product ================= */

  const handleDeleteProduct = async (productId) => {
    const result = await confirmAction({
      title: "Delete this product?",
      text: "This action cannot be undone",
      confirmText: "Delete",
    });

    if (!result.isConfirmed) return;

    loadingAlert("Deleting product...");

    try {
      const res = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      Swal.close();
      successAlert("Product deleted successfully");

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );
    } catch (err) {
      Swal.close();
      errorAlert(err.message);
    }
  };

  const handleCancelEdit = async () => {
    const result = await confirmAction({
      title: "Cancel editing?",
      text: "Unsaved changes will be lost",
      confirmText: "Yes, cancel",
    });

    if (!result.isConfirmed) return;

    setEditingProductId(null);
    setProductName("");
    setProductDescription("");
    setProductPrize("");
    setProductImage([]);
    setSelectedTags([]);
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

  // =========================filter logic========================

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().replace(/\s+/g, "");

    const name = (product.productName || "").toLowerCase().replace(/\s+/g, "");

    const description = (product.productDescription || "")
      .toLowerCase()
      .replace(/\s+/g, "");

    const tagsMatch = Array.isArray(product.tags)
      ? product.tags.some(
          (tag) =>
            tag &&
            typeof tag === "object" &&
            typeof tag.name === "string" &&
            tag.name.toLowerCase().replace(/\s+/g, "").includes(search),
        )
      : false;

    return name.includes(search) || description.includes(search) || tagsMatch;
  });

  /* ================= Scroll Behaviour ================= */

  useEffect(() => {
    if (editingProductId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [editingProductId]);

  /* ================= Tag Input ================= */

  const handleTagKeyDown = async (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const value = tagInput.trim();
    if (!value) return;

    // Check if already exists in fetched tags
    const existing = tags.find(
      (t) => t.name.toLowerCase() === value.toLowerCase(),
    );

    let tagId;

    if (existing) {
      tagId = existing._id;
    } else {
      // Create tag in DB
      const res = await fetch("/api/productTags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: value }),
      });

      const newTag = await res.json();
      setTags((prev) => [...prev, newTag]);
      tagId = newTag._id;
    }

    // Add to selectedTags
    setSelectedTags((prev) => (prev.includes(tagId) ? prev : [...prev, tagId]));

    setTagInput("");
  };

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
              Write tags to add below
            </label>

            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type tag and press Enter"
              className="w-full border border-gray-300 p-3 focus:ring-2 focus:ring-black"
            />
            {/* Selected Tags Chips */}
            <div className="mt-3 min-h-[48px] w-full border border-gray-300 p-2 flex flex-wrap gap-2 bg-white">
              {selectedTags.length === 0 ? (
                <span className="text-gray-400 text-sm">No tags selected</span>
              ) : (
                tags
                  .filter((tag) => selectedTags.includes(tag._id))
                  .map((tag) => (
                    <span
                      key={tag._id}
                      className="flex items-center gap-2 bg-black text-white px-3 py-1 text-sm rounded"
                    >
                      {tag.name}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedTags((prev) =>
                            prev.filter((id) => id !== tag._id),
                          )
                        }
                        className="text-xs hover:text-red-400"
                      >
                        ✕
                      </button>
                    </span>
                  ))
              )}
            </div>
          </div>

          {/* =================================Product Images============================== */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Images {editingProductId && "(optional)"}
            </label>

            {/* File input */}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setProductImage((prev) => [
                  ...prev,
                  ...Array.from(e.target.files),
                ])
              }
              className="w-full border border-gray-300 p-3 bg-white"
            />

            {/* EXISTING IMAGES (FROM DB) – shown only in Edit mode */}
            {editingProductId && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Existing images</p>
                <div className="flex flex-wrap gap-3">
                  {products
                    .find((p) => p._id === editingProductId)
                    ?.productImages?.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        alt="Existing product"
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                    ))}
                </div>
              </div>
            )}

            {/* NEW IMAGES PREVIEW (FILES SELECTED NOW) */}
            {Array.isArray(productImage) && productImage.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">New images</p>
                <div className="flex flex-wrap gap-3">
                  {productImage.map((file, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={URL.createObjectURL(file)}
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setProductImage((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

        {/* ======================= Cancel Edit ======================= */}
        {editingProductId && (
          <button
            onClick={handleCancelEdit}
            className="mt-2 text-sm text-red-600 underline"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* ================= Tags & Flags ================= */}
      {/* <div className="bg-[#fdebe] rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Select Tags for the product while adding
        </h2> */}

      {/* Tags */}
      {/* <div className="flex flex-wrap gap-3">
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
        </div> */}

      {/* Flags (static UI only for now) */}
      {/* <div className="flex flex-wrap gap-4 mt-6">
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
      </div>  */}

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name, description, or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-black text-black "
        />
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
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Product Images Slider */}
              <div className="relative h-56 overflow-hidden rounded-t-2xl">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                
                    clickable: true,
                  }}
                  loop={true}
                  className="h-full"
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
                        setProductImage([]);
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
