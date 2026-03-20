export const dynamic = 'force-dynamic';
import { getIssues } from "@/actions/issue.actions";
import { IssueFormDialog } from "./IssueFormDialog";
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
  title: "Nömrələr | Admin İdarə Paneli",
  description: "Jurnal nömrələrini idarə edin.",
};

export default async function IssuesPage() {
  const data = await getIssues();
  const issues = data.success ? data.issues : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Nömrələr və Arxiv
          </h1>
          <p className="text-sm text-slate-500">
            Jurnal nömrələrini yaradın və idarə edin.
          </p>
        </div>
        <IssueFormDialog />
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-900">Cild</TableHead>
              <TableHead className="font-semibold text-slate-900">Nömrə</TableHead>
              <TableHead className="font-semibold text-slate-900">İl</TableHead>
              <TableHead className="font-semibold text-slate-900">Status</TableHead>
              <TableHead className="text-right font-semibold text-slate-900">Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-slate-500">
                  Nömrə tapılmadı.
                </TableCell>
              </TableRow>
            ) : (
              issues.map((issue: any) => (
                <TableRow key={issue._id}>
                  <TableCell className="font-medium">{issue.volume}</TableCell>
                  <TableCell>{issue.number}</TableCell>
                  <TableCell>{issue.year}</TableCell>
                  <TableCell>
                    {issue.isCurrent ? (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        Cari
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                        Arxivləşdirilmiş
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <IssueFormDialog
                      issue={issue}
                      trigger={
                        <Button variant="outline" size="sm" className="h-8">
                          Redaktə et
                        </Button>
                      }
                    />
                    <form action={async () => {
                      "use server";
                      await import("@/actions/issue.actions").then(m => m.deleteIssue(issue._id));
                    }}>
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
