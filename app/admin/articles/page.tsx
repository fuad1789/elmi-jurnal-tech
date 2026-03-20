import { getArticles } from "@/app/actions/articles";
import { getIssues } from "@/actions/issue.actions";
import { deleteArticle } from "@/app/actions/articles";

function str(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") return value.en || value.az || "";
  return String(value);
}
import { ArticleFormDialog } from "./ArticleFormDialog";
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
  title: "Məqalələr | Admin İdarə Paneli",
  description: "Jurnal məqalələrini idarə edin.",
};

export default async function ArticlesPage() {
  const [articles, issuesData] = await Promise.all([
    getArticles(),
    getIssues(),
  ]);
  const issues = issuesData.success ? issuesData.issues : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Məqalələr
          </h1>
          <p className="text-sm text-slate-500">
            Jurnal məqalələrini yaradın və idarə edin.
          </p>
        </div>
        <ArticleFormDialog issues={issues} />
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-900">Başlıq</TableHead>
              <TableHead className="font-semibold text-slate-900">Müəlliflər</TableHead>
              <TableHead className="font-semibold text-slate-900">Nömrə</TableHead>
              <TableHead className="font-semibold text-slate-900">Status</TableHead>
              <TableHead className="text-right font-semibold text-slate-900">Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-slate-500">
                  Məqalə tapılmadı.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article: any) => (
                <TableRow key={article._id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{str(article.title)}</TableCell>
                  <TableCell className="text-slate-600 max-w-[180px] truncate">
                    {Array.isArray(article.authors)
                      ? article.authors.map((a: any) => a.name || a).join(", ")
                      : str(article.authors)}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {article.issueRef
                      ? (() => {
                          const issue = issues.find((i: any) => i._id === String(article.issueRef));
                          return issue ? `C.${issue.volume} №${issue.number} (${issue.year})` : "—";
                        })()
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {article.status === "published" ? (
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        Dərc edilmiş
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                        Qaralama
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <ArticleFormDialog
                      article={article}
                      issues={issues}
                      trigger={
                        <Button variant="outline" size="sm" className="h-8">
                          Redaktə et
                        </Button>
                      }
                    />
                    <form
                      action={async () => {
                        "use server";
                        await deleteArticle(article._id);
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
