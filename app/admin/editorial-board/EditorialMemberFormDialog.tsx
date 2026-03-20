"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorialMemberFormValues, editorialMemberSchema } from "@/lib/schemas";
import { createEditorialMember, updateEditorialMember } from "@/app/actions/editorialMember";
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
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";

interface Props {
  member?: any;
  trigger?: React.ReactNode;
}

export function EditorialMemberFormDialog({ member, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const isEditing = !!member;

  const form = useForm<EditorialMemberFormValues>({
    resolver: zodResolver(editorialMemberSchema),
    defaultValues: {
      name: member?.name || "",
      role: member?.role || "Board",
      affiliation: member?.affiliation || "",
      orderIndex: member?.orderIndex ?? 0,
    },
  });

  const onSubmit = (data: EditorialMemberFormValues) => {
    startTransition(async () => {
      let res;
      if (isEditing) {
        res = await updateEditorialMember(member._id, data);
      } else {
        res = await createEditorialMember(data);
      }

      if (res.success) {
        toast({
          title: "Uğurlu",
          description: `Üzv müvəffəqiyyətlə ${isEditing ? "yeniləndi" : "əlavə edildi"}!`,
        });
        setOpen(false);
        if (!isEditing) form.reset();
      } else {
        toast({
          title: "Xəta",
          description: res.error || "Əməliyyat zamanı xəta baş verdi.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Yeni Üzv Əlavə Et</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {isEditing ? "Üzvü Redaktə Et" : "Yeni Üzv Əlavə Et"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Soyad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ad Soyad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vəzifə</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="Chief">Baş Redaktor</option>
                      <option value="Editor">Redaktor</option>
                      <option value="Board">Heyət Üzvü</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qurum (ixtiyari)</FormLabel>
                  <FormControl>
                    <Input placeholder="Universitet / Təşkilat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="orderIndex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sıra İndeksi</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? "Saxlanılır..."
                  : isEditing
                  ? "Dəyişiklikləri Saxla"
                  : "Üzv Əlavə Et"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
