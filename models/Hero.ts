import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHero extends Document {
  title: {
    en: string;
    az: string;
  };
  subtitle: {
    en: string;
    az: string;
  };
  issn: {
    print: string;
    electronic: string;
  };
  coverImage: string;
  buttonText: {
    en: string;
    az: string;
  };
  buttonLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSchema: Schema = new Schema(
  {
    title: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    subtitle: {
      en: { type: String, required: true },
      az: { type: String, required: true },
    },
    issn: {
      print: { type: String, required: true },
      electronic: { type: String, required: true },
    },
    coverImage: { type: String, default: '' },
    buttonText: {
      en: { type: String, required: true, default: 'Submit an Article' },
      az: { type: String, required: true, default: 'Məqalə Təqdim Et' },
    },
    buttonLink: { type: String, default: '/about/author-guidelines' },
  },
  { timestamps: true }
);

export const Hero: Model<IHero> = mongoose.models.Hero || mongoose.model<IHero>('Hero', HeroSchema);