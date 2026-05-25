"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { MdArrowOutward as ArrowIcon } from "react-icons/md";
import { IoLocationOutline as LocationIcon } from "react-icons/io5";
import { BsGithub, BsLinkedin, BsInstagram, BsWhatsapp, BsYoutube, BsTwitterX } from "react-icons/bs";
import { BiGlobe, BiTerminal, BiLink } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { SiMonkeytype } from "react-icons/si";
import { LuPlus as PlusIcon } from "react-icons/lu";

import LinksHeader from "./LinksHeader";
import LinkFormModal from "./LinkFormModal";
import AuthorActions from "@/common/components/elements/AuthorActions";
import ConfirmDialog from "@/common/components/elements/ConfirmDialog";
import { useIsAuthor } from "@/hooks/useIsAuthor";
import { fetcher } from "@/services/fetcher";

const SOCIAL_ICONS = [
  { icon: BsGithub, href: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`, label: "GitHub" },
  { icon: BsLinkedin, href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "", label: "LinkedIn" },
  { icon: BsInstagram, href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "", label: "Instagram" },
  { icon: BsWhatsapp, href: process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP || "", label: "WhatsApp" },
];

const ICON_MAP: Record<string, React.ElementType> = {
  BiGlobe: BiGlobe, BsGithub: BsGithub, BsLinkedin: BsLinkedin,
  BsInstagram: BsInstagram, BsWhatsapp: BsWhatsapp, SiMonkeytype: SiMonkeytype,
  HiOutlineDocumentText: HiOutlineDocumentText, BiTerminal: BiTerminal,
  BiLink: BiLink, BsYoutube: BsYoutube, BsTwitterX: BsTwitterX,
};

interface LinkItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon_name: string;
  display_order: number;
  is_show: boolean;
}

interface LinksProps {
  domain: string;
  locale: string;
}

const Links = ({ domain, locale }: LinksProps) => {
  const isAuthor = useIsAuthor();
  const pageUrl = `${domain}/${locale}/links`;

  const { data: links = [], mutate } = useSWR<LinkItem[]>("/api/links", fetcher);

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<LinkItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LinkItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (editData) {
        await axios.put(`/api/links/${editData.id}`, data);
      } else {
        await axios.post("/api/links", data);
      }
      await mutate();
      setFormOpen(false);
      setEditData(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/links/${deleteTarget.id}`);
      await mutate();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEdit = (link: LinkItem) => {
    setEditData(link);
    setFormOpen(true);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center gap-6 px-4 py-10">
      <LinksHeader pageUrl={pageUrl} />

      {/* Profile */}
      <div className="flex flex-col items-center gap-3 text-center">
        <Image
          src={process.env.NEXT_PUBLIC_AVATAR_URL || "/images/reza.JPG"}
          width={80}
          height={80}
          alt="Mohamad Reza"
          className="rounded-full border-2 border-neutral-300 dark:border-neutral-700"
        />
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {process.env.NEXT_PUBLIC_AUTHOR_NAME}
          </h1>
          <p className="text-sm font-medium text-accent">Freelance Front-End Developer</p>
          <div className="mt-1 flex items-center justify-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            <LocationIcon size={13} />
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-3">
        {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition duration-200 hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-accent dark:hover:text-accent"
          >
            <Icon size={18} />
          </Link>
        ))}
      </div>

      {/* Link list */}
      <div className="flex w-full flex-col gap-3">
        {isAuthor && (
          <button
            onClick={() => { setEditData(null); setFormOpen(true); }}
            className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-accent py-3 text-sm font-medium text-accent transition hover:bg-accent/5"
          >
            <PlusIcon size={16} />
            Tambah Link
          </button>
        )}

        {links.map((link) => {
          const Icon = ICON_MAP[link.icon_name] || BiLink;
          return (
            <AuthorActions
              key={link.id}
              onEdit={() => openEdit(link)}
              onDelete={() => setDeleteTarget(link)}
            >
              <Link
                href={link.href}
                target="_blank"
                className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition duration-200 hover:border-accent hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-accent"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{link.title}</p>
                  <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">{link.description}</p>
                </div>
                <ArrowIcon size={16} className="shrink-0 text-neutral-400 dark:text-neutral-500" />
              </Link>
            </AuthorActions>
          );
        })}
      </div>

      {/* Contact card */}
      <div className="w-full rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <BsWhatsapp size={20} />
        </div>
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Hubungi Saya</h3>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Jangan ragu untuk menghubungi saya untuk kolaborasi atau sekadar ngobrol.
        </p>
        <Link
          href={`${process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP || ""}?text=${encodeURIComponent("Halo Reza! Saya melihat portofolio kamu dan ingin mendiskusikan sesuatu. ")}`}
          target="_blank"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
        >
          <BsWhatsapp size={15} />
          Chat di WhatsApp
        </Link>
        <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
          +62 813-1371-1180
        </p>
      </div>

      <LinkFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        onSubmit={handleSubmit}
        initialData={editData ? {
          title: editData.title,
          description: editData.description,
          href: editData.href,
          icon_name: editData.icon_name,
          display_order: editData.display_order,
          is_show: editData.is_show,
        } : undefined}
        isLoading={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        message={`Hapus link "${deleteTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Links;
