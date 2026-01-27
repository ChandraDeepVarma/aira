import connectDB from "@/lib/mongodb";
import productTags from "@/models/productTags";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const productsTags = await productTags.find();
    // console.log("TAGS COUNT:", productsTags.length);

    return NextResponse.json(productsTags);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
