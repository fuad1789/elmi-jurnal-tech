"use server";

import connectToDatabase from "@/lib/db";
import { EditorialMember } from "@/models/EditorialMember";
import { revalidatePath } from "next/cache";

export async function getEditorialMembers() {
  await connectToDatabase();
  const members = await EditorialMember.find({}).sort({ orderIndex: 1 }).lean();
  return JSON.parse(JSON.stringify(members));
}

export async function createEditorialMember(data: any) {
  try {
    await connectToDatabase();
    const member = new EditorialMember(data);
    await member.save();
    revalidatePath("/admin/editorial-board");
    revalidatePath("/editorial-board");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateEditorialMember(id: string, data: any) {
  try {
    await connectToDatabase();
    await EditorialMember.findByIdAndUpdate(id, data);
    revalidatePath("/admin/editorial-board");
    revalidatePath("/editorial-board");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteEditorialMember(id: string) {
  try {
    await connectToDatabase();
    await EditorialMember.findByIdAndDelete(id);
    revalidatePath("/admin/editorial-board");
    revalidatePath("/editorial-board");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
