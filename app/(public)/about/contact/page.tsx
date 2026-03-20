import { getSiteSettings } from "@/app/actions/siteSettings";
import { ContactView } from "./ContactView";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactView settings={settings} />;
}
