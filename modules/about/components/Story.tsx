"use client";

import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useTranslations, useLocale } from "next-intl";
import { LuPencil as PencilIcon, LuCheck as CheckIcon, LuX as XIcon } from "react-icons/lu";

import Image from "@/common/components/elements/Image";
import { useIsAuthor } from "@/hooks/useIsAuthor";
import { fetcher } from "@/services/fetcher";

interface BioParagraph {
  id: number;
  paragraph_index: number;
  content_en: string;
  content_id: string;
}

const Story = () => {
  const t = useTranslations("AboutPage");
  const locale = useLocale() as "en" | "id";
  const isAuthor = useIsAuthor();

  const { data: bioData, mutate } = useSWR<BioParagraph[]>("/api/bio", fetcher);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ content_en: "", content_id: "" });
  const [isSaving, setIsSaving] = useState(false);

  const paragraphs = [1, 2, 3, 4].map((idx) => {
    const fromDB = bioData?.find(b => b.paragraph_index === idx);
    return {
      index: idx,
      content: fromDB
        ? (locale === "en" ? fromDB.content_en : fromDB.content_id)
        : t(`resume.paragraph_${idx}`),
      content_en: fromDB?.content_en || t(`resume.paragraph_${idx}`),
      content_id: fromDB?.content_id || t(`resume.paragraph_${idx}`),
    };
  });

  const startEdit = (idx: number, en: string, id: string) => {
    setEditingIndex(idx);
    setEditValues({ content_en: en, content_id: id });
  };

  const cancelEdit = () => setEditingIndex(null);

  const saveEdit = async (idx: number) => {
    setIsSaving(true);
    try {
      await axios.put(`/api/bio/${idx}`, editValues);
      await mutate();
      setEditingIndex(null);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="space-y-4 leading-7 text-neutral-800 dark:text-neutral-300">
      {paragraphs.map((p) => (
        <div key={p.index} className="group relative">
          {editingIndex === p.index ? (
            <div className="space-y-2 rounded-lg border border-accent/30 bg-accent/5 p-3">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-neutral-500">EN</label>
                  <textarea
                    value={editValues.content_en}
                    onChange={e => setEditValues(v => ({ ...v, content_en: e.target.value }))}
                    rows={4}
                    className="input-field resize-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-neutral-500">ID</label>
                  <textarea
                    value={editValues.content_id}
                    onChange={e => setEditValues(v => ({ ...v, content_id: e.target.value }))}
                    rows={4}
                    className="input-field resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(p.index)}
                  disabled={isSaving}
                  className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-dark transition hover:bg-amber-400 disabled:opacity-60"
                >
                  <CheckIcon size={13} />
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs text-neutral-500 transition hover:text-neutral-700 dark:border-neutral-700 dark:hover:text-neutral-300"
                >
                  <XIcon size={13} />
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <>
              <span>{p.content}</span>
              {isAuthor && (
                <button
                  onClick={() => startEdit(p.index, p.content_en, p.content_id)}
                  className="ml-2 inline-flex items-center rounded p-0.5 text-neutral-300 opacity-0 transition hover:text-accent group-hover:opacity-100 dark:text-neutral-600"
                  title="Edit paragraf"
                >
                  <PencilIcon size={13} />
                </button>
              )}
            </>
          )}
        </div>
      ))}
      <div className="w-28 pt-4 md:w-40">
        <Image
          src="/images/signature.png"
          alt="signature"
          width={100}
          height={100}
        />
      </div>
    </section>
  );
};

export default Story;
