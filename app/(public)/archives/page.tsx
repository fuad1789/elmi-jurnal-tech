import React from 'react';
import connectToDatabase from '@/lib/db';
import { Issue } from '@/models/Issue';
import ArchivesClient from './ArchivesClient';

export const metadata = {
  title: 'Archives | Journal of Sumqait State University',
  description: 'Browse all published issues of the Journal of Sumqait State University.',
};

export const dynamic = 'force-dynamic';

export default async function ArchivesPage() {
  await connectToDatabase();
  
  // Fetch all issues sorted by newest first
  const issuesRaw = await Issue.find({})
    .sort({ year: -1, volume: -1, number: -1 })
    .lean();

  // Make strictly serializable for client component
  const issues = issuesRaw.map((issue: any) => ({
    _id: issue._id.toString(),
    volume: issue.volume,
    number: issue.number,
    year: issue.year,
    isCurrent: !!issue.isCurrent,
    pdfUrl: issue.pdfUrl || "",
    coverUrl: issue.coverUrl || "",
  }));

  return <ArchivesClient issues={issues} />;
}