import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEditorialMember extends Document {
  name: string;
  role: 'Chief' | 'Editor' | 'Board';
  affiliation?: string;
  orderIndex?: number;
  createdAt: Date;
  updatedAt: Date;
}

const EditorialMemberSchema = new Schema<IEditorialMember>(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ['Chief', 'Editor', 'Board'], required: true },
    affiliation: { type: String },
    orderIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const EditorialMember: Model<IEditorialMember> = mongoose.models.EditorialMember || mongoose.model<IEditorialMember>('EditorialMember', EditorialMemberSchema);
