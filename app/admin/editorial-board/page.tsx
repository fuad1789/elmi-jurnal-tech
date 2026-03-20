export const dynamic = 'force-dynamic';
import { getEditorialMembers } from "@/app/actions/editorialMember";
import { deleteEditorialMember } from "@/app/actions/editorialMember";
import { EditorialMemberFormDialog } from "./EditorialMemberFormDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Redaksiya Heyəti | Admin İdarə Paneli",
  description: "Redaksiya heyəti üzvlərini idarə edin.",
};

const roleLabels: Record<string, string> = {
  Chief: "Baş Redaktor",
  Editor: "Redaktor",
  Board: "Heyət Üzvü",
};

export default async function EditorialBoardPage() {
  const members = await getEditorialMembers();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Redaksiya Heyəti
          </h1>
          <p className="text-sm text-slate-500">
            Redaksiya heyəti üzvlərini idarə edin.
          </p>
        </div>
        <EditorialMemberFormDialog />
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-900">Ad</TableHead>
              <TableHead className="font-semibold text-slate-900">Vəzifə</TableHead>
              <TableHead className="font-semibold text-slate-900">Qurum</TableHead>
              <TableHead className="font-semibold text-slate-900">Sıra</TableHead>
              <TableHead className="text-right font-semibold text-slate-900">Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-slate-500">
                  Üzv tapılmadı.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member: any) => (
                <TableRow key={member._id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ring-1 ring-inset ${
                      member.role === "Chief"
                        ? "bg-blue-50 text-blue-700 ring-blue-700/10"
                        : member.role === "Editor"
                        ? "bg-purple-50 text-purple-700 ring-purple-700/10"
                        : "bg-slate-50 text-slate-600 ring-slate-500/10"
                    }`}>
                      {roleLabels[member.role] || member.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600">{member.affiliation || "—"}</TableCell>
                  <TableCell className="text-slate-600">{member.orderIndex ?? 0}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <EditorialMemberFormDialog
                      member={member}
                      trigger={
                        <Button variant="outline" size="sm" className="h-8">
                          Redaktə et
                        </Button>
                      }
                    />
                    <form
                      action={async () => {
                        "use server";
                        await deleteEditorialMember(member._id);
                      }}
                    >
                      <Button variant="destructive" size="sm" className="h-8">
                        Sil
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
