import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Issue } from "@/models/Issue";

export async function GET() {
  try {
    await connectToDatabase();
    const currentYear = new Date().getFullYear();
    const issues = await Issue.find({ year: currentYear })
      .sort({ volume: -1, number: -1 })
      .limit(2)
      .lean();
    return NextResponse.json(JSON.parse(JSON.stringify(issues)));
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
