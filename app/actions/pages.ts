"use server";

import connectToDatabase from "@/lib/db";
import { StaticPage } from "@/models/StaticPage";
import { revalidatePath } from "next/cache";

export async function getPages() {
  await connectToDatabase();
  const pages = await StaticPage.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(pages));
}

export async function createPage(data: any) {
  try {
    await connectToDatabase();
    
    // Check if slug already exists
    const existing = await StaticPage.findOne({ slug: data.slug });
    if (existing) {
       return { success: false, error: "Page with this slug already exists" };
    }

    const page = new StaticPage(data);
    await page.save();
    revalidatePath("/admin/static-content");
    revalidatePath(`/${data.slug}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePage(id: string, data: any) {
  try {
    await connectToDatabase();
    await StaticPage.findByIdAndUpdate(id, data);
    revalidatePath("/admin/static-content");
    revalidatePath(`/${data.slug}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePage(id: string) {
  try {
    await connectToDatabase();
    await StaticPage.findByIdAndDelete(id);
    revalidatePath("/admin/static-content");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
