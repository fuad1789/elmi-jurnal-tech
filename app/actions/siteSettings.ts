"use server";

import connectToDatabase from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
  await connectToDatabase();
  const settings = await SiteSettings.findOne({}).lean();
  if (!settings) return null;
  return JSON.parse(JSON.stringify(settings));
}

export async function upsertSiteSettings(data: any) {
  try {
    await connectToDatabase();
    await SiteSettings.updateOne({}, data, { upsert: true });
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
