"use server";

import connectToDatabase from "@/lib/db";
import { Article } from "@/models/Article";
import { revalidatePath } from "next/cache";

export async function getArticles() {
  await connectToDatabase();
  const articles = await Article.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(articles));
}

function parseAuthors(raw: string) {
  return raw.split(',').map((entry: string) => {
    const [name, affiliation] = entry.split(' - ').map((s: string) => s.trim());
    return { name, affiliation: affiliation || undefined };
  });
}

export async function createArticle(data: any) {
  try {
    await connectToDatabase();
    const articleData = {
      ...data,
      authors: typeof data.authors === 'string' ? parseAuthors(data.authors) : data.authors,
      tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : data.tags,
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

export async function updateArticle(id: string, data: any) {
  try {
    await connectToDatabase();
    const articleData = {
      ...data,
      authors: typeof data.authors === 'string' ? parseAuthors(data.authors) : data.authors,
      tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : data.tags,
    };
    await Article.findByIdAndUpdate(id, articleData);
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
