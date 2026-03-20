import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";

export async function GET() {
  try {
    await connectToDatabase();
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(JSON.parse(JSON.stringify(messages)));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });
    
    await newMessage.save();
    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}