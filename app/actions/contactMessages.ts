"use server";

import connectToDatabase from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";
import { revalidatePath } from "next/cache";

export async function getContactMessages() {
  await connectToDatabase();
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(messages));
}

export async function markMessageRead(id: string, isRead: boolean) {
  try {
    await connectToDatabase();
    await ContactMessage.findByIdAndUpdate(id, { isRead });
    revalidatePath("/admin/contact");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMessage(id: string) {
  try {
    await connectToDatabase();
    await ContactMessage.findByIdAndDelete(id);
    revalidatePath("/admin/contact");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
