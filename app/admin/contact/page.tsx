export const dynamic = 'force-dynamic';
import { getContactMessages, markMessageRead, deleteMessage } from "@/app/actions/contactMessages";
import { Button } from "@/components/ui/Button";
import { Mail, MailOpen, Trash2 } from "lucide-react";

export const metadata = {
  title: "Əlaqə Mesajları | Admin İdarə Paneli",
};

export default async function ContactPage() {
  const messages = await getContactMessages();

  const unreadCount = messages.filter((m: any) => !m.isRead).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Əlaqə Mesajları</h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              {unreadCount} yeni
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500">
          Saytdan gələn əlaqə mesajlarını idarə edin.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-slate-200 text-slate-400 gap-3">
          <Mail className="h-10 w-10" />
          <p className="text-sm">Hələ ki mesaj yoxdur.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((msg: any) => (
            <div
              key={msg._id}
              className={`rounded-lg border bg-white shadow-sm p-5 flex flex-col gap-3 transition-colors ${
                !msg.isRead ? "border-blue-200 bg-blue-50/30" : "border-slate-200"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full flex-shrink-0 mt-1 ${!msg.isRead ? "bg-blue-600" : "bg-slate-300"}`} />
                  <div>
                    <p className="font-semibold text-slate-900">{msg.name}</p>
                    <p className="text-xs text-slate-500">{msg.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-slate-400">
                    {new Date(msg.createdAt).toLocaleDateString("az-AZ", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <form action={async () => { "use server"; await markMessageRead(msg._id, !msg.isRead); }}>
                    <Button variant="outline" size="sm" className="h-7 px-2 gap-1 text-xs">
                      {msg.isRead ? (
                        <><Mail className="h-3.5 w-3.5" /> Oxunmamış işarələ</>
                      ) : (
                        <><MailOpen className="h-3.5 w-3.5" /> Oxunmuş işarələ</>
                      )}
                    </Button>
                  </form>
                  <form action={async () => { "use server"; await deleteMessage(msg._id); }}>
                    <Button variant="destructive" size="sm" className="h-7 px-2">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </form>
                </div>
              </div>

              {/* Subject */}
              <p className="text-sm font-medium text-slate-800 border-l-2 border-blue-400 pl-3">
                {msg.subject}
              </p>

              {/* Message */}
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
