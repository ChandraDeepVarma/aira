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

export async function POST(req) {
  try {
    await connectDB();
    const { name } = await req.json();

    const normalized = name.trim().toLowerCase();

    let tag = await productTags.findOne({ name: normalized });

    if (!tag) {
      tag = await productTags.create({ name: normalized });
    }

    return NextResponse.json(tag);
  } catch (err) {
    return NextResponse.json({ error: "Tag create failed" }, { status: 500 });
  }
}