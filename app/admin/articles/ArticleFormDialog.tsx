"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleFormValues, articleFormSchema } from "@/lib/schemas";
import { createArticle, updateArticle } from "@/app/actions/articles";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, FileText } from "lucide-react";

interface Issue {
  _id: string;
  volume: number;
  number: number;
  year: number;
}

interface Props {
  article?: any;
  issues: Issue[];
  trigger?: React.ReactNode;
}

export function ArticleFormDialog({ article, issues, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const isEditing = !!article;

  function toStr(v: any): string {
    if (!v) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") return v.en || v.az || "";
    return String(v);
  }

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: toStr(article?.title),
      abstract: toStr(article?.abstract),
      authors: Array.isArray(article?.authors)
        ? article.authors.map((a: any) => (a.affiliation ? `${a.name} - ${a.affiliation}` : a.name)).join(", ")
        : toStr(article?.authors),
      doi: article?.doi || "",
      pdfUrl: article?.pdfUrl || "dummy-url.pdf",
      tags: Array.isArray(article?.tags) ? article.tags.join(", ") : article?.tags || "",
      issueRef: article?.issueRef ? String(article.issueRef) : "",
      status: article?.status || "draft",
    },
  });

  const onSubmit = (data: ArticleFormValues) => {
    startTransition(async () => {
      try {
        let finalPdfUrl = data.pdfUrl;

        if (pdfFile) {
          const pdfFormData = new FormData();
          pdfFormData.append("file", pdfFile);
          const pdfRes = await fetch("/api/upload", {
            method: "POST",
            body: pdfFormData,
          });
          const pdfJson = await pdfRes.json();
          if (!pdfRes.ok || !pdfJson.success)
            throw new Error(pdfJson.error || "Failed to upload PDF");
          finalPdfUrl = pdfJson.url;
        }

        const submissionData = { ...data, pdfUrl: finalPdfUrl };

        let res;
        if (isEditing) {
          res = await updateArticle(article._id, submissionData);
        } else {
          res = await createArticle(submissionData);
        }

        if (res.success) {
          toast({
            title: "Uğurlu",
            description: `Məqalə müvəffəqiyyətlə ${isEditing ? "yeniləndi" : "yaradıldı"}!`,
          });
          setOpen(false);
          if (!isEditing) form.reset();
          router.refresh();
        } else {
          toast({
            title: "Xəta",
            description: res.error || "Məlumat bazasına yazılan zaman xəta baş verdi.",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Xəta",
          description: error.message || "Əməliyyat zamanı problem yaşandı.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Yeni Məqalə Əlavə Et</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {isEditing ? "Məqaləni Redaktə Et" : "Yeni Məqalə Yarat"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Başlıq</FormLabel>
                  <FormControl>
                    <Input placeholder="Məqalənin başlığı" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Müəlliflər</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ad Soyad - Qurum, Ad Soyad - Qurum"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xülasə</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Məqalənin xülasəsi..."
                      className="h-28 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="issueRef"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nömrə</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="">Nömrə seçin</option>
                        {issues.map((issue) => (
                          <option key={issue._id} value={issue._id}>
                            C.{issue.volume} №{issue.number} ({issue.year})
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="draft">Qaralama</option>
                        <option value="published">Dərc edilmiş</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="doi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOI (ixtiyari)</FormLabel>
                  <FormControl>
                    <Input placeholder="10.xxxxx/xxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiketlər (ixtiyari, vergüllə ayrılmış)</FormLabel>
                  <FormControl>
                    <Input placeholder="riyaziyyat, alqoritm, optimallaşdırma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PDF Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Məqalə PDF{isEditing ? " (dəyişdirmək üçün yükləyin)" : ""}
              </label>
              <div
                onClick={() => pdfInputRef.current?.click()}
                className="cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5 hover:bg-slate-100 transition-colors"
              >
                {!pdfFile && !isEditing ? (
                  <>
                    <UploadCloud className="mb-2 h-7 w-7 text-slate-400" />
                    <p className="text-sm font-medium text-slate-600">
                      PDF faylını yükləmək üçün klikləyin
                    </p>
                    <p className="text-xs text-slate-500">PDF — maks. 50MB</p>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-red-500" />
                    <span className="text-sm font-medium">
                      {pdfFile ? pdfFile.name : "Mövcud PDF Saxlanılıb"}
                    </span>
                  </div>
                )}
              </div>
              <input
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setPdfFile(e.target.files[0]);
                    form.setValue("pdfUrl", e.target.files[0].name);
                  }
                }}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? "Saxlanılır..."
                  : isEditing
                  ? "Dəyişiklikləri Saxla"
                  : "Məqaləni Yarat"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
