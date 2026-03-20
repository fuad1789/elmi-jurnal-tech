"use server";

import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db";
import { Issue } from "@/models/Issue";
import { issueFormSchema, IssueFormValues } from "@/lib/schemas";

export async function getIssues() {
  try {
    await connectToDatabase();
    // Sort logic to get newest issues first
    const issues = await Issue.find({}).sort({ year: -1, volume: -1, number: -1 }).lean();
    return { success: true, issues: JSON.parse(JSON.stringify(issues)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch issues" };
  }
}

export async function createIssue(data: IssueFormValues) {
  try {
    // Validate with Zod
    const validatedData = issueFormSchema.parse(data);
    await connectToDatabase();

    // Core logic: If this new issue is current, unset existing current issue
    if (validatedData.isCurrent) {
      await Issue.updateMany({ isCurrent: true }, { isCurrent: false });
    }

    // Convert comma-separated string to string array
    const payload = {
      ...validatedData,
      keywords: validatedData.keywords ? validatedData.keywords.split(',').map(k => k.trim()).filter(Boolean) : []
    };

    const newIssue = await Issue.create(payload);
    
    revalidatePath("/", "layout");
    return { success: true, issue: JSON.parse(JSON.stringify(newIssue)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create issue" };
  }
}

export async function updateIssue(id: string, data: IssueFormValues) {
  try {
    const validatedData = issueFormSchema.parse(data);
    await connectToDatabase();
    
    // Convert comma-separated keywords into actual array of strings securely
    const payload = {
      ...validatedData,
      keywords: validatedData.keywords ? validatedData.keywords.split(',').map(k => k.trim()).filter(Boolean) : []
    };

    if (validatedData.isCurrent) {
      await Issue.updateMany({ _id: { $ne: id }, isCurrent: true }, { isCurrent: false });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(id, payload, { new: true }).lean();
    
    if (!updatedIssue) {
      return { success: false, error: "Issue not found" };
    }

    revalidatePath("/", "layout");
    return { success: true, issue: JSON.parse(JSON.stringify(updatedIssue)) };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update issue" };
  }
}

export async function deleteIssue(id: string) {
  try {
    await connectToDatabase();
    
    const deletedIssue = await Issue.findByIdAndDelete(id);
    
    if (!deletedIssue) {
      return { success: false, error: "Issue not found" };
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete issue" };
  }
}
