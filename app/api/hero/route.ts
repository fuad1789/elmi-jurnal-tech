import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Hero } from "@/models/Hero";

export async function GET() {
  try {
    await connectToDatabase();
    const hero = await Hero.findOne({}).sort({ createdAt: -1 }).lean();
    if (!hero) {
      return NextResponse.json(null);
    }
    return NextResponse.json(JSON.parse(JSON.stringify(hero)));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero data" }, { status: 500 });
  }
}