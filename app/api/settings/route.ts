import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.findOne({}).lean();
    return NextResponse.json(settings ? JSON.parse(JSON.stringify(settings)) : null);
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
