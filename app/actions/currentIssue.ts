"use server";

import connectToDatabase from "@/lib/db";
import { CurrentIssue } from "@/models/CurrentIssue";
import { revalidatePath } from "next/cache";

export async function getCurrentIssue() {
  await connectToDatabase();
  const issue = await CurrentIssue.findOne({}).sort({ createdAt: -1 }).lean();
  if (!issue) return null;
  return JSON.parse(JSON.stringify(issue));
}

export async function createCurrentIssue(data: any) {
  try {
    await connectToDatabase();
    
    // Delete existing issue if any
    await CurrentIssue.deleteMany({});
    
    const issue = new CurrentIssue(data);
    await issue.save();
    revalidatePath("/admin/current-issue");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCurrentIssue(id: string, data: any) {
  try {
    await connectToDatabase();
    await CurrentIssue.findByIdAndUpdate(id, data);
    revalidatePath("/admin/current-issue");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCurrentIssue(id: string) {
  try {
    await connectToDatabase();
    await CurrentIssue.findByIdAndDelete(id);
    revalidatePath("/admin/current-issue");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}