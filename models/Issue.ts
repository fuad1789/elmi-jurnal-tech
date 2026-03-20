import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IIssue extends Document {
  volume: number;
  number: number;
  year: number;
  isCurrent: boolean;
  title: string;
  description?: string;
  keywords: string[];
  editor?: string;
  coverUrl: string;
  pdfUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema = new Schema<IIssue>(
  {
    volume: { type: Number, required: true },
    number: { type: Number, required: true },
    year: { type: Number, required: true },
    isCurrent: { type: Boolean, default: false },
    title: { type: String, required: true },
    description: { type: String },
    keywords: { type: [String], default: [] },
    editor: { type: String },
    coverUrl: { type: String, required: true },
    pdfUrl: { type: String, required: true },
  },
  { timestamps: true }
);

// Force Mongoose to compile the updated schema with new fields explicitly during hot reloads
if (mongoose.models.Issue) {
  delete mongoose.models.Issue;
}
export const Issue: Model<IIssue> = mongoose.model<IIssue>('Issue', IssueSchema);
