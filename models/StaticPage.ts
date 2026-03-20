import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStaticPage extends Document {
  slug: string;
  title: {
    en: string;
    az: string;
  };
  contentHTML: {
    en: string;
    az: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const StaticPageSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    contentHTML: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const StaticPage: Model<IStaticPage> = mongoose.models.StaticPage || mongoose.model<IStaticPage>('StaticPage', StaticPageSchema);
