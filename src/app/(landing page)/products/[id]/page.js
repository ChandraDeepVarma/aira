import { headers } from "next/headers";
import ProductImageGallery from "@/components/products/ProductImageGallery";

async function getProduct(id) {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  const data = await res.json();
  return data.product;
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* IMAGE GALLERY */}
        <ProductImageGallery images={product.productImages} />

        {/* PRODUCT INFO */}
        <div className="space-y-4 text-black">
          <h1 className="text-2xl font-semibold leading-snug">
            {product.productName}
          </h1>

          <div className="flex items-end gap-2">
            <span className="text-sm text-gray-500">Price:</span>
            <span className="text-3xl font-semibold text-red-600">
              ₹{product.productPrize}
            </span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {product.productDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
