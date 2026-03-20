export const dynamic = 'force-dynamic';
import { getSiteSettings } from "@/app/actions/siteSettings";
import { SettingsForm } from "./SettingsForm";

export const metadata = {
  title: "Parametrlər | Admin İdarə Paneli",
};

export default async function SettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Parametrlər</h1>
        <p className="text-sm text-slate-500">Saytın ümumi parametrlərini idarə edin.</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
