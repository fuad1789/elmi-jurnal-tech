import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INews extends Document {
  title: {
    en: string;
    az: string;
  };
  content: {
    en: string;
    az: string;
  };
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const News: Model<INews> = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
