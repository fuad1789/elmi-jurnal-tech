"use server";

import connectToDatabase from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";
import { revalidatePath } from "next/cache";

export async function getContactMessages() {
  await connectToDatabase();
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(messages));
}

export async function createContactMessage(data: any) {
  try {
    await connectToDatabase();
    const message = new ContactMessage(data);
    await message.save();
    revalidatePath("/admin/contact");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markAsRead(id: string) {
  try {
    await connectToDatabase();
    await ContactMessage.findByIdAndUpdate(id, { isRead: true });
    revalidatePath("/admin/contact");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteContactMessage(id: string) {
  try {
    await connectToDatabase();
    await ContactMessage.findByIdAndDelete(id);
    revalidatePath("/admin/contact");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}