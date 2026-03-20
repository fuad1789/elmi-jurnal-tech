import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Issue } from "@/models/Issue";

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
    const issues = await Issue.find({})
      .sort({ year: -1, volume: -1, number: -1 })
      .limit(2)
      .lean();
    return NextResponse.json(JSON.parse(JSON.stringify(issues)), { headers });
  } catch (error) {
    return NextResponse.json([], { status: 500, headers });
  }
}
