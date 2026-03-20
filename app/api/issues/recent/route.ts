import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Issue } from "@/models/Issue";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const issues = await Issue.find({})
      .sort({ year: -1, volume: -1, number: -1 })
      .limit(2)
      .lean();
    return NextResponse.json(JSON.parse(JSON.stringify(issues)));
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
