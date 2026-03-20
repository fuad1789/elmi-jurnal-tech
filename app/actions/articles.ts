"use server";

import connectToDatabase from "@/lib/db";
import { Article } from "@/models/Article";
import { revalidatePath } from "next/cache";

export async function getArticles() {
  await connectToDatabase();
  const articles = await Article.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(articles));
}

export async function createArticle(data: any) {
  try {
    await connectToDatabase();
    
    // Transform authors string to array
    const articleData = {
      ...data,
      authors: typeof data.authors === 'string' ? data.authors.split(',').map((a: string) => a.trim()) : data.authors,
    };
    
    const article = new Article(articleData);
    await article.save();
    revalidatePath("/admin/articles");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteArticle(id: string) {
  try {
    await connectToDatabase();
    await Article.findByIdAndDelete(id);
    revalidatePath("/admin/articles");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
