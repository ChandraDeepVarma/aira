import connectDB from "@/lib/mongodb";
import products from "@/models/products";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

/* ================= GET ALL PRODUCTS ================= */

export async function GET() {
  try {
    await connectDB();

    const Products = await products.find().sort({ createdAt: -1 });
    // .populate("tags", "name");

    return NextResponse.json({ Products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ================= ADD PRODUCT ================= */

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const imageFiles = formData.getAll("productImages");

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { error: "At least one product image is required" },
        { status: 400 },
      );
    }

    const uploadedImages = [];

    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploaded = await cloudinary.uploader.upload(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        { folder: "Aira/products/productImages" },
      );

      uploadedImages.push({
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      });
    }

    const product = await products.create({
      productName: formData.get("productName"),
      productDescription: formData.get("productDescription"),
      productPrize: formData.get("productPrize"),
      productImages: uploadedImages,
      tags: JSON.parse(formData.get("tags") || "[]"),
    });

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ================= DELETE PRODUCT ================= */

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const deleted = await products.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ================= UPDATE PRODUCT ================= */

export async function PATCH(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product ID required" },
        { status: 400 },
      );
    }

    const formData = await request.formData();

    const updateData = {
      productName: formData.get("productName"),
      productDescription: formData.get("productDescription"),
      productPrize: formData.get("productPrize"),
      tags: JSON.parse(formData.get("tags") || "[]"),
    };

    const files = formData
      .getAll("productImages")
      .filter((file) => file && file.size > 0);

    if (files.length > 0) {
      const uploadedImages = [];

      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploaded = await cloudinary.uploader.upload(
          `data:${file.type};base64,${buffer.toString("base64")}`,
          { folder: "Aira/products/productImages" },
        );

        uploadedImages.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        });
      }

      updateData.productImages = uploadedImages;
    }

    const updatedProduct = await products.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json({ product: updatedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import connectDB from "@/lib/mongodb";
// import products from "@/models/products";
// import { NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";

// export async function GET() {
//   try {
//     await connectDB();

//     const Products = await products
//       .find()
//       .sort({ createdAt: -1 })
//       .populate("tags", "name");

//     return NextResponse.json({ Products }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();

//     const formData = await request.formData();

//     console.log(formData);

//     const data = {
//       productName: formData.get("productName"),
//       productDescription: formData.get("productDescription"),
//       productPrize: formData.get("productPrize"),
//       productImage: formData.get("productImage"),
//       tags: JSON.parse(formData.get("tags") || "[]"),
//     };

//     console.log(data);

//     async function uploadFile(file, folder, resource_type = "image") {
//       if (!file || file.size === 0) return null;
//       const buffer = Buffer.from(await file.arrayBuffer());

//       const uploaded = await cloudinary.uploader.upload(
//         `data:${file.type};base64,${buffer.toString("base64")}`,
//         { folder, resource_type },
//       );
//       return { url: uploaded.secure_url, public_id: uploaded.public_id };
//     }
//     data.productImage = await uploadFile(
//       formData.get("productImage"),
//       "Aira/products/productImage",
//     );
//     const Product = await products.create(data);

//     return NextResponse.json({ products: Product }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// /* ================= DELETE ================= */
// export async function DELETE(request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ message: "ID required" }, { status: 400 });
//     }

//     const deleted = await products.findByIdAndDelete(id);

//     if (!deleted) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json({ message: "Product deleted" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // =================================update========================================

// export async function PATCH(request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json(
//         { message: "Product ID required" },
//         { status: 400 },
//       );
//     }

//     const formData = await request.formData();

//     const updateData = {
//       productName: formData.get("productName"),
//       productDescription: formData.get("productDescription"),
//       productPrize: formData.get("productPrize"),
//       tags: JSON.parse(formData.get("tags") || "[]"),
//     };

//     const file = formData.get("productImage");

//     if (file && file.size > 0) {
//       const buffer = Buffer.from(await file.arrayBuffer());

//       const uploaded = await cloudinary.uploader.upload(
//         `data:${file.type};base64,${buffer.toString("base64")}`,
//         { folder: "Aira/products/productImage" },
//       );

//       updateData.productImage = {
//         url: uploaded.secure_url,
//         public_id: uploaded.public_id,
//       };
//     }

//     const updatedProduct = await products.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     return NextResponse.json({ product: updatedProduct }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
