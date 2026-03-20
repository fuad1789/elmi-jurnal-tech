import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Hero } from "@/models/Hero";

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
    const hero = await Hero.findOne({}).sort({ createdAt: -1 }).lean();
    if (!hero) {
      return NextResponse.json(null, { headers });
    }
    return NextResponse.json(JSON.parse(JSON.stringify(hero)), { headers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero data" }, { status: 500, headers });
  }
}
