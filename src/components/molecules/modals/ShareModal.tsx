"use client";

import React, { useState } from "react";
import { Modal } from "@/components/atoms/feedback/Modal";
import { Button } from "@/components/atoms/form/Button";
import { Copy, Check, Share2, MessageCircle, Send, Globe } from "lucide-react";
import { useModal } from "@/lib/modalContext";

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  excerpt?: string;
}

export function ShareModal({
  isOpen,
  onClose,
  title,
  url,
  excerpt,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useModal();

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      toast({
        type: "success",
        title: "Tautan Berhasil Disalin",
        message: "Tautan artikel telah tersimpan di papan klip Anda.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      toast({
        type: "error",
        title: "Gagal Menyalin Tautan",
        message: "Silakan salin tautan secara manual dari bilah alamat peramban.",
      });
    }
  };

  const shareText = encodeURIComponent(`${title} - Jejak Perupa\n${excerpt ? excerpt + "\n" : ""}`);
  const shareUrl = encodeURIComponent(url);

  const shareChannels = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366]/10 text-[#128C7E] border-[#25D366]/30 hover:bg-[#25D366]/20",
      href: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
    },
    {
      name: "Twitter / X",
      icon: Globe,
      color: "bg-black/5 text-black border-black/20 hover:bg-black/10",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    },
    {
      name: "Telegram",
      icon: Send,
      color: "bg-[#0088cc]/10 text-[#0088cc] border-[#0088cc]/30 hover:bg-[#0088cc]/20",
      href: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
    },
    {
      name: "Facebook",
      icon: Share2,
      color: "bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/30 hover:bg-[#1877F2]/20",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
    >
      <div className="p-6 space-y-6">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between pb-3 border-b border-jp-gray-200">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-50 text-jp-blue-900 border border-jp-blue-100">
              <Share2 className="h-4 w-4 text-jp-blue-700" />
            </div>
            <h3 className="font-heading font-bold text-jp-ink text-base">
              Bagikan Artikel Seni
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-jp-gray-500 hover:text-jp-ink p-1 rounded-md transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* ARTICLE SUMMARY CARD */}
        <div className="rounded-xl border border-jp-blue-100 bg-jp-blue-50/60 p-4 space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-jp-blue-700">
            Artikel Pilihan
          </span>
          <h4 className="font-heading font-bold text-jp-ink text-sm leading-snug line-clamp-2">
            {title}
          </h4>
          <p className="text-xs text-jp-gray-500 font-mono truncate pt-0.5">{url}</p>
        </div>

        {/* SOCIAL SHARE CHANNELS */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-jp-ink block">
            Bagikan ke Media Sosial & Komunitas
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {shareChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs font-bold transition cursor-pointer ${channel.color}`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{channel.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* DIRECT LINK COPY BOX */}
        <div className="space-y-2 pt-2 border-t border-jp-gray-200">
          <label className="text-xs font-bold text-jp-ink block">
            Salin Tautan Langsung
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 rounded-lg border border-jp-gray-300 bg-jp-paper px-3 py-2 text-xs font-mono text-jp-gray-700 outline-none select-all"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <Button
              type="button"
              variant={copied ? "primary" : "outline"}
              size="sm"
              onClick={handleCopyLink}
              className="rounded-lg text-xs shrink-0 cursor-pointer h-9 px-3.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1 text-white" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  <span>Salin</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* CLOSE FOOTER */}
        <div className="pt-2 flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-lg text-xs"
          >
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
}
