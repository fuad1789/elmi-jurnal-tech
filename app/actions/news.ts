"use server";

import connectToDatabase from "@/lib/db";
import { News } from "@/models/News";
import { revalidatePath } from "next/cache";

export async function getNews() {
  await connectToDatabase();
  const news = await News.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(news));
}

export async function createNews(data: any) {
  try {
    await connectToDatabase();
    
    const newsItem = new News(data);
    await newsItem.save();
    revalidatePath("/admin/news");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteNews(id: string) {
  try {
    await connectToDatabase();
    await News.findByIdAndDelete(id);
    revalidatePath("/admin/news");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
