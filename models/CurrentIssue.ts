import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICurrentIssue extends Document {
  volume: string;
  number: string;
  year: string;
  publishedDate: string;
  coverImage: string;
  description: {
    en: string;
    az: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CurrentIssueSchema: Schema = new Schema(
  {
    volume: { type: String, required: true },
    number: { type: String, required: true },
    year: { type: String, required: true },
    publishedDate: { type: String, required: true },
    coverImage: { type: String, default: '' },
    description: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const CurrentIssue: Model<ICurrentIssue> = mongoose.models.CurrentIssue || mongoose.model<ICurrentIssue>('CurrentIssue', CurrentIssueSchema);