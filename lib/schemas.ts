import * as z from "zod";

export const i18nSchema = z.object({
  en: z.string().min(1, "English text is required"),
  az: z.string().min(1, "Azerbaijani text is required"),
});

export const articleSchema = z.object({
  title: i18nSchema,
  abstract: i18nSchema,
  authors: z.string().min(1, "Authors are required"),
  pdfUrl: z.string().min(1, "PDF is required"),
  publishDate: z.string().min(1, "Publish date is required"),
  issueNumber: z.string().min(1, "Issue number is required"),
});

export const newsSchema = z.object({
  title: i18nSchema,
  content: i18nSchema,
  imageUrl: z.string().min(1, "Image is required"),
});

export const staffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: i18nSchema,
  biography: i18nSchema,
  photoUrl: z.string().min(1, "Photo is required"),
});

export const pageSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: i18nSchema,
  contentHTML: i18nSchema,
});

export const heroSchema = z.object({
  title: i18nSchema,
  subtitle: i18nSchema,
  issn: z.object({
    print: z.string().min(1, "ISSN Print is required"),
    electronic: z.string().min(1, "ISSN Electronic is required"),
  }),
  buttonText: i18nSchema,
  buttonLink: z.string().optional(),
  coverImage: z.string().optional(),
});

export const currentIssueSchema = z.object({
  volume: z.string().min(1, "Volume is required"),
  number: z.string().min(1, "Number is required"),
  year: z.string().min(1, "Year is required"),
  publishedDate: z.string().min(1, "Published date is required"),
  description: i18nSchema,
  coverImage: z.string().optional(),
});

export const issueFormSchema = z.object({
  volume: z.number().positive("Volume must be a positive number"),
  number: z.number().positive("Number must be a positive number"),
  year: z.number().positive("Year must be a positive number"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  keywords: z.string().optional(), // Will store comma-separated string locally, converted to array
  editor: z.string().optional(),
  isCurrent: z.boolean(),
  coverUrl: z.string().min(1, "Cover image is required"),
  pdfUrl: z.string().min(1, "Journal PDF is required"),
});

export type IssueFormValues = z.infer<typeof issueFormSchema>;
