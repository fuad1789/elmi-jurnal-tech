"use client";

import { useState, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IssueFormValues, issueFormSchema } from "@/lib/schemas";
import { createIssue, updateIssue } from "@/actions/issue.actions";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, FileText, ImageIcon, X, ChevronRight, ChevronLeft } from "lucide-react";

interface Issue {
  _id: string;
  volume: number;
  number: number;
  year: number;
  title: string;
  description?: string;
  keywords?: string[];
  editor?: string;
  isCurrent: boolean;
  coverUrl: string;
  pdfUrl: string;
}

interface Props {
  issue?: Issue;
  trigger?: React.ReactNode;
}

export function IssueFormDialog({ issue, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // Local state to store strictly UI simulated file selections
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!issue;

  const form = useForm<IssueFormValues>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      volume: issue?.volume || 1,
      number: issue?.number || 1,
      year: issue?.year || new Date().getFullYear(),
      title: issue?.title || "",
      description: issue?.description || "",
      keywords: issue?.keywords?.join(", ") || "",
      editor: issue?.editor || "",
      isCurrent: issue?.isCurrent || false,
      coverUrl: issue?.coverUrl || "dummy-url.png", // Temp override until real upload works
      pdfUrl: issue?.pdfUrl || "dummy-url.pdf", // Temp override
    },
  });

  const handleNext = async () => {
    // Validate fields for current step before moving forward
    let fieldsToValidate: (keyof IssueFormValues)[] = [];
    if (step === 1) fieldsToValidate = ['volume', 'number', 'year', 'title'];
    if (step === 2) fieldsToValidate = ['description', 'keywords', 'editor', 'isCurrent'];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setStep(s => s + 1);
  };

  const onSubmit = (data: IssueFormValues) => {
    // Prevent accidental submission when pressing "Enter" on earlier steps
    if (step < 3) {
      handleNext();
      return;
    }

    // Require physical files if not editing (creating new journal)
    if (!isEditing && (!coverFile || !pdfFile)) {
      toast({
        title: "Diqqət",
        description: "Zəhmət olmasa jurnalın qapaq şəkli və PDF faylını yükləyin (Please upload both Cover Image and PDF)",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        let finalCoverUrl = data.coverUrl;
        let finalPdfUrl = data.pdfUrl;

        // Upload Cover File 
        if (coverFile) {
          const coverFormData = new FormData();
          coverFormData.append('file', coverFile);
          const coverRes = await fetch('/api/upload', {
            method: 'POST',
            body: coverFormData,
          });
          const coverJson = await coverRes.json();
          if (!coverRes.ok || !coverJson.success) throw new Error(coverJson.error || "Failed to upload Cover Image");
          finalCoverUrl = coverJson.url;
        }

        // Upload PDF File
        if (pdfFile) {
          const pdfFormData = new FormData();
          pdfFormData.append('file', pdfFile);
          const pdfRes = await fetch('/api/upload', {
            method: 'POST',
            body: pdfFormData,
          });
          const pdfJson = await pdfRes.json();
          if (!pdfRes.ok || !pdfJson.success) throw new Error(pdfJson.error || "Failed to upload PDF");
          finalPdfUrl = pdfJson.url;
        }

        const submissionData = { ...data, coverUrl: finalCoverUrl, pdfUrl: finalPdfUrl };

        let res;
        if (isEditing) {
          res = await updateIssue(issue._id, submissionData);
        } else {
          res = await createIssue(submissionData);
        }

        if (res.success) {
          toast({
            title: "Uğurlu",
            description: `Jurnal müvəffəqiyyətlə ${isEditing ? "yeniləndi" : "yaradıldı"}!`,
          });
          resetState();
        } else {
          toast({
            title: "Xəta",
            description: res.error || "Məlumat bazasına yazılan zaman xəta baş verdi.",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Yükləmə Xətası",
          description: error.message || "Fayl yüklənərkən problem yaşandı.",
          variant: "destructive",
        });
      }
    });
  };

  const resetState = () => {
    setOpen(false);
    setStep(1);
    setCoverFile(null);
    setPdfFile(null);
    if (!isEditing) {
      form.reset({
        volume: 1,
        number: 1,
        year: new Date().getFullYear(),
        title: "",
        description: "",
        keywords: "",
        editor: "",
        isCurrent: false,
        coverUrl: "dummy-url.png",
        pdfUrl: "dummy-url.pdf",
      });
    } else {
      form.reset({
        volume: issue.volume,
        number: issue.number,
        year: issue.year,
        title: issue.title,
        description: issue.description || "",
        keywords: issue.keywords?.join(", ") || "",
        editor: issue.editor || "",
        isCurrent: issue.isCurrent,
        coverUrl: issue.coverUrl,
        pdfUrl: issue.pdfUrl,
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetState();
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button>Add New Issue</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {isEditing ? "Edit Issue" : "Create New Issue"}
          </DialogTitle>
          <div className="flex items-center pt-2 pb-4">
             {/* Progress Bubbles */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className={`h-6 w-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-academic-blue text-white' : 'bg-slate-100 text-slate-400'}`}>1</span>
              <span className={`h-px w-8 ${step >= 2 ? 'bg-academic-blue' : 'bg-slate-200'}`} />
              <span className={`h-6 w-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-academic-blue text-white' : 'bg-slate-100 text-slate-400'}`}>2</span>
              <span className={`h-px w-8 ${step >= 3 ? 'bg-academic-blue' : 'bg-slate-200'}`} />
              <span className={`h-6 w-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-academic-blue text-white' : 'bg-slate-100 text-slate-400'}`}>3</span>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-2 fade-in duration-300">
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10) || "")} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Special Spring Edition" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* STEP 2: Metadata */}
            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-2 fade-in duration-300">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief overview of this issue..." className="h-24 resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords (Comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="mathematics, ai, physics" {...field} />
                      </FormControl>
                      <FormDescription>Used for making the issue easily searchable.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="editor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest / Lead Editor</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isCurrent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Set as Current Issue</FormLabel>
                        <FormDescription>
                          This will override any existing current issue tag globally transparently. 
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* STEP 3: Media Uploads */}
            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-2 fade-in duration-300">
                {/* Cover Image Upload UI */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Cover Image</label>
                    <div 
                      onClick={() => coverInputRef.current?.click()}
                      className="cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 hover:bg-slate-100 transition-colors"
                    >
                      {!coverFile && !isEditing ? (
                        <>
                          <ImageIcon className="mb-2 h-8 w-8 text-slate-400" />
                          <p className="text-sm font-medium text-slate-600">Click to upload cover image</p>
                          <p className="text-xs text-slate-500">PNG, JPG up to 2MB</p>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <ImageIcon className="h-6 w-6 text-academic-blue" />
                          <span className="text-sm font-medium">{coverFile ? coverFile.name : 'Existing Cover Saved'}</span>
                        </div>
                      )}
                    </div>
                    {/* Native hidden input outside the div to avoid bubble looping */}
                    <input 
                      ref={coverInputRef} 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setCoverFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>

                  {/* PDF Upload UI */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Full Journal PDF</label>
                    <div 
                      onClick={() => pdfInputRef.current?.click()}
                      className="cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 hover:bg-slate-100 transition-colors"
                    >
                      {!pdfFile && !isEditing ? (
                        <>
                          <UploadCloud className="mb-2 h-8 w-8 text-slate-400" />
                          <p className="text-sm font-medium text-slate-600">Click to upload core PDF</p>
                          <p className="text-xs text-slate-500">PDF up to 50MB</p>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6 text-red-500" />
                          <span className="text-sm font-medium">{pdfFile ? pdfFile.name : 'Existing PDF Saved'}</span>
                        </div>
                      )}
                    </div>
                    {/* Native hidden input outside the div to avoid bubble looping */}
                    <input 
                      ref={pdfInputRef} 
                      type="file" 
                      accept="application/pdf" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setPdfFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div className="flex justify-between w-full pt-4 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(s => s - 1)}
                disabled={step === 1 || isPending}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {step < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : isEditing ? "Save Final Changes" : "Create Issue"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
