import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStaff extends Document {
  name: string;
  role: {
    en: string;
    az: string;
  };
  biography: {
    en: string;
    az: string;
  };
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const StaffSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    role: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    biography: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    photoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Staff: Model<IStaff> = mongoose.models.Staff || mongoose.model<IStaff>('Staff', StaffSchema);
