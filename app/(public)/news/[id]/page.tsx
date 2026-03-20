export const dynamic = 'force-dynamic';
import connectToDatabase from "@/lib/db";
import { News } from "@/models/News";
import { NewsDetailView } from "./NewsDetailView";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  await connectToDatabase();
  const item = await News.findById(params.id).lean();
  if (!item) notFound();
  return <NewsDetailView news={JSON.parse(JSON.stringify(item))} />;
}
