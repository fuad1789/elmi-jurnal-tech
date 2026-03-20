"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { siteSettingsSchema, SiteSettingsFormValues } from "@/lib/schemas";
import { upsertSiteSettings } from "@/app/actions/siteSettings";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface Props {
  settings: SiteSettingsFormValues | null;
}

export function SettingsForm({ settings }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      contactEmail: settings?.contactEmail || "",
      contactPhone: settings?.contactPhone || "",
      address: settings?.address || "",
      issnPrint: settings?.issnPrint || "",
      issnOnline: settings?.issnOnline || "",
    },
  });

  const onSubmit = (data: SiteSettingsFormValues) => {
    startTransition(async () => {
      const res = await upsertSiteSettings(data);
      if (res.success) {
        toast({ title: "Uğurlu", description: "Parametrlər saxlanıldı." });
        router.refresh();
      } else {
        toast({ title: "Xəta", description: res.error, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
        <div className="rounded-lg border bg-white shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Əlaqə Məlumatları</h2>

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Elektron Poçt</FormLabel>
                <FormControl>
                  <Input placeholder="journal@sdu.edu.az" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input placeholder="+994 18 123 45 67" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ünvan</FormLabel>
                <FormControl>
                  <Input placeholder="Sumqayıt Dövlət Universiteti, Sumqayıt, Azərbaycan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-lg border bg-white shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">ISSN</h2>

          <FormField
            control={form.control}
            name="issnPrint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISSN (Çap)</FormLabel>
                <FormControl>
                  <Input placeholder="2989-3453" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issnOnline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISSN (Onlayn)</FormLabel>
                <FormControl>
                  <Input placeholder="E-3012-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending} className="gap-2">
          <Save className="h-4 w-4" />
          {isPending ? "Saxlanılır..." : "Parametrləri Saxla"}
        </Button>
      </form>
    </Form>
  );
}
