import React from 'react';

export const metadata = {
  title: 'Dashboard | Admin Panel',
  description: 'Welcome to the Admin Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-slate-500">
          Here is an overview of your journal's platform. More features will be available soon.
        </p>
      </div>
      
      {/* Placeholder for future widgets or stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm">
          <div className="p-6 flex flex-col gap-1">
            <h3 className="tracking-tight text-sm font-medium">Total Articles</h3>
            <p className="text-2xl font-bold">---</p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm">
          <div className="p-6 flex flex-col gap-1">
            <h3 className="tracking-tight text-sm font-medium">Published Issues</h3>
            <p className="text-2xl font-bold">---</p>
          </div>
        </div>
      </div>
    </div>
  );
}
