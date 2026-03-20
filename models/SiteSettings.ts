import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  issnPrint?: string;
  issnOnline?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    contactEmail: { type: String },
    contactPhone: { type: String },
    address: { type: String },
    issnPrint: { type: String },
    issnOnline: { type: String },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
