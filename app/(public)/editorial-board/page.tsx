import { getEditorialMembers } from '@/app/actions/editorialMember';
import { getSiteSettings } from '@/app/actions/siteSettings';
import { EditorialBoardView } from './EditorialBoardView';

export default async function EditorialBoardPage() {
  const [members, settings] = await Promise.all([
    getEditorialMembers(),
    getSiteSettings(),
  ]);
  return <EditorialBoardView members={members} settings={settings} />;
}
