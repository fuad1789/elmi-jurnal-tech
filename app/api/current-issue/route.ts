import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { CurrentIssue } from "@/models/CurrentIssue";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const issue = await CurrentIssue.findOne({}).sort({ createdAt: -1 }).lean();
    if (!issue) {
      return NextResponse.json(null);
    }
    return NextResponse.json(JSON.parse(JSON.stringify(issue)));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch current issue data" }, { status: 500 });
  }
}