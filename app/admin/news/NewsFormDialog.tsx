"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsFormSchema, NewsFormValues } from "@/lib/schemas";
import { createNews, updateNews } from "@/app/actions/news";
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
import { ImageIcon } from "lucide-react";

interface Props {
  newsItem?: any;
  trigger?: React.ReactNode;
}

export function NewsFormDialog({ newsItem, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(newsItem?.imageUrl || null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const isEditing = !!newsItem;

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: { az: newsItem?.title?.az || "", en: newsItem?.title?.en || "" },
      content: { az: newsItem?.content?.az || "", en: newsItem?.content?.en || "" },
      imageUrl: newsItem?.imageUrl || "",
    },
  });

  const onSubmit = (data: NewsFormValues) => {
    startTransition(async () => {
      try {
        let finalImageUrl = data.imageUrl || "";

        if (imageFile) {
          const formData = new FormData();
          formData.append("file", imageFile);
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const json = await res.json();
          if (!res.ok || !json.success) throw new Error(json.error || "Şəkil yüklənmədi");
          finalImageUrl = json.url;
        }

        const payload = { ...data, imageUrl: finalImageUrl };
        const res = isEditing
          ? await updateNews(newsItem._id, payload)
          : await createNews(payload);

        if (res.success) {
          toast({
            title: "Uğurlu",
            description: `Xəbər ${isEditing ? "yeniləndi" : "yaradıldı"}.`,
          });
          setOpen(false);
          router.refresh();
          if (!isEditing) {
            form.reset();
            setImageFile(null);
            setPreview(null);
          }
        } else {
          toast({ title: "Xəta", description: res.error, variant: "destructive" });
        }
      } catch (error: any) {
        toast({ title: "Xəta", description: error.message, variant: "destructive" });
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Yeni Xəbər Əlavə Et</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {isEditing ? "Xəbəri Redaktə Et" : "Yeni Xəbər Yarat"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Şəkil {isEditing ? "(dəyişdirmək üçün yükləyin)" : ""}
              </label>
              <div
                onClick={() => imageInputRef.current?.click()}
                className="cursor-pointer rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors overflow-hidden"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-40 object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 gap-2">
                    <ImageIcon className="h-8 w-8 text-slate-400" />
                    <p className="text-sm text-slate-500">Şəkil yükləmək üçün klikləyin</p>
                    <p className="text-xs text-slate-400">PNG, JPG — maks. 2MB</p>
                  </div>
                )}
              </div>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Titles */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title.az"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlıq (AZ) *</FormLabel>
                    <FormControl>
                      <Input placeholder="Azərbaycanca başlıq" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title.en"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlıq (EN)</FormLabel>
                    <FormControl>
                      <Input placeholder="English title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Content */}
            <FormField
              control={form.control}
              name="content.az"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Məzmun (AZ) *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Azərbaycanca xəbər mətni..."
                      className="h-32 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content.en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Məzmun (EN)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="English news content..."
                      className="h-32 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saxlanılır..." : isEditing ? "Dəyişiklikləri Saxla" : "Xəbəri Yarat"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
