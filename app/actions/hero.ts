"use server";

import connectToDatabase from "@/lib/db";
import { Hero } from "@/models/Hero";
import { revalidatePath } from "next/cache";

export async function getHero() {
  await connectToDatabase();
  const hero = await Hero.findOne({}).sort({ createdAt: -1 }).lean();
  if (!hero) return null;
  return JSON.parse(JSON.stringify(hero));
}

export async function createHero(data: any) {
  try {
    await connectToDatabase();
    
    // Delete existing hero if any
    await Hero.deleteMany({});
    
    const hero = new Hero(data);
    await hero.save();
    revalidatePath("/admin/hero");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateHero(id: string, data: any) {
  try {
    await connectToDatabase();
    await Hero.findByIdAndUpdate(id, data);
    revalidatePath("/admin/hero");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteHero(id: string) {
  try {
    await connectToDatabase();
    await Hero.findByIdAndDelete(id);
    revalidatePath("/admin/hero");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}