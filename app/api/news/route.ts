import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { News } from "@/models/News";

export async function GET() {
  try {
    await connectToDatabase();
    const news = await News.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(JSON.parse(JSON.stringify(news)));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}