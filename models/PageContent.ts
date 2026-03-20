import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPageContent extends Document {
  slug: string;
  title?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

export const PageContent: Model<IPageContent> = mongoose.models.PageContent || mongoose.model<IPageContent>('PageContent', PageContentSchema);
