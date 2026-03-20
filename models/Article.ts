import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAuthor {
  name: string;
  affiliation?: string;
}

export interface IArticle extends Document {
  title: string;
  abstract: string;
  authors: IAuthor[];
  doi?: string;
  pdfUrl?: string;
  tags: string[];
  issueRef: mongoose.Types.ObjectId;
  status: 'published' | 'draft';
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  affiliation: { type: String },
}, { _id: false });

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    authors: { type: [AuthorSchema], required: true },
    doi: { type: String },
    pdfUrl: { type: String },
    tags: { type: [String], default: [] },
    issueRef: { type: Schema.Types.ObjectId, ref: 'Issue', required: true },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
