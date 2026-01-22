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

  /* ================= Add / Edit Product ================= */

  const handleAddProduct = async () => {
    try {
      /* ===== NEW CODE (EDIT MODE WITH IMAGE SUPPORT) ===== */
      if (editingProductId) {
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productPrize", productPrize);

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

          return; // stop ADD flow
        } else {
          alert("Update failed");
          return;
        }
      }
      /* ===== END NEW CODE ===== */

      // ===== EXISTING ADD PRODUCT LOGIC (UNCHANGED) =====

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("productPrize", productPrize);

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
      setProducts(data.Products);
      setLoading(false);
    };

    loadData();
    setProductAdded(false);
  }, [productAdded]);

  return (
    <div className="bg-zinc-50 font-sans min-h-screen p-10 pt-5 pb-24 space-y-16">
      {/* ================= Add / Edit Product ================= */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="font-bold text-3xl text-black mb-6">
          {editingProductId ? "Edit Product" : "Add Product"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end text-black">
          <div>
            <label className="block text-sm mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Product Price</label>
            <input
              type="text"
              value={productPrize}
              onChange={(e) => setProductPrize(e.target.value)}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Product Image {editingProductId && "(optional)"}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>

          <button
            onClick={handleAddProduct}
            className="border border-gray-300 rounded w-full p-2 hover:bg-gray-100 transition"
          >
            {editingProductId ? "Update Product" : "Add Product"}
          </button>
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
                        window.scrollTo({ top: 0, behavior: "smooth" });
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
