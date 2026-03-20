import { getNews, deleteNews } from "@/app/actions/news";
import { NewsFormDialog } from "./NewsFormDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";
import { ImageIcon } from "lucide-react";

export const metadata = {
  title: "Xəbərlər | Admin İdarə Paneli",
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Xəbərlər</h1>
          <p className="text-sm text-slate-500">Saytın xəbər bölməsini idarə edin.</p>
        </div>
        <NewsFormDialog />
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-900 w-16">Şəkil</TableHead>
              <TableHead className="font-semibold text-slate-900">Başlıq (AZ)</TableHead>
              <TableHead className="font-semibold text-slate-900">Başlıq (EN)</TableHead>
              <TableHead className="font-semibold text-slate-900">Tarix</TableHead>
              <TableHead className="text-right font-semibold text-slate-900">Əməliyyatlar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-slate-500">
                  Xəbər tapılmadı.
                </TableCell>
              </TableRow>
            ) : (
              news.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-12 h-10 object-cover rounded border border-slate-200"
                      />
                    ) : (
                      <div className="w-12 h-10 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 text-slate-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {item.title?.az || "—"}
                  </TableCell>
                  <TableCell className="text-slate-500 max-w-[200px] truncate">
                    {item.title?.en || "—"}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString("az-AZ", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <NewsFormDialog
                        newsItem={item}
                        trigger={
                          <Button variant="outline" size="sm" className="h-8">
                            Redaktə et
                          </Button>
                        }
                      />
                      <form
                        action={async () => {
                          "use server";
                          await deleteNews(item._id);
                        }}
                      >
                        <Button variant="destructive" size="sm" className="h-8">
                          Sil
                        </Button>
                      </form>
                    </div>
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
