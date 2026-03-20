"use server";

import connectToDatabase from "@/lib/db";
import { Staff } from "@/models/Staff";
import { revalidatePath } from "next/cache";

export async function getStaff() {
  await connectToDatabase();
  const staff = await Staff.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(staff));
}

export async function createStaff(data: any) {
  try {
    await connectToDatabase();
    
    const staffItem = new Staff(data);
    await staffItem.save();
    revalidatePath("/admin/staff");
    revalidatePath("/editorial-board");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateStaff(id: string, data: any) {
  try {
    await connectToDatabase();
    await Staff.findByIdAndUpdate(id, data);
    revalidatePath("/admin/staff");
    revalidatePath("/editorial-board");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteStaff(id: string) {
  try {
    await connectToDatabase();
    await Staff.findByIdAndDelete(id);
    revalidatePath("/admin/staff");
    revalidatePath("/editorial-board");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
