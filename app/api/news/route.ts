import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { News } from "@/models/News";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const headers = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET() {
  try {
    await connectToDatabase();
    const news = await News.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(JSON.parse(JSON.stringify(news)), { headers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500, headers });
  }
}
