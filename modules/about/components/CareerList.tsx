"use client";

import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useTranslations } from "next-intl";
import { HiOutlineBriefcase as CareerIcon } from "react-icons/hi";
import { LuPlus as PlusIcon } from "react-icons/lu";
import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import AuthorActions from "@/common/components/elements/AuthorActions";
import ConfirmDialog from "@/common/components/elements/ConfirmDialog";
import { CareerProps } from "@/common/types/careers";
import { useIsAuthor } from "@/hooks/useIsAuthor";
import { fetcher } from "@/services/fetcher";

import CareerCard from "./CareerCard";
import CareerFormModal from "./CareerFormModal";

type CareerItem = CareerProps & { id?: number };

const splitLines = (str: string) =>
  str ? str.split("\n").map(s => s.trim()).filter(Boolean) : [];

const transformRow = (row: any): CareerItem => ({
  id: row.id,
  position: row.position,
  company: row.company,
  logo: row.logo,
  location: row.location,
  location_type: row.location_type,
  type: row.type,
  industry: row.industry,
  start_date: row.start_date,
  end_date: row.end_date || null,
  link: row.link || null,
  responsibilities: { en: row.responsibilities_en || [], id: row.responsibilities_id || [] },
  lessons_learned: { en: row.lessons_learned_en || [], id: row.lessons_learned_id || [] },
  impact: { en: row.impact_en || [], id: row.impact_id || [] },
  isShow: row.is_show,
});

const CareerList = () => {
  const t = useTranslations("AboutPage.career");
  const isAuthor = useIsAuthor();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<CareerItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CareerItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, mutate } = useSWR("/api/careers", fetcher);
  const careers: CareerItem[] = data?.map(transformRow) ?? [];

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        position: formData.position,
        company: formData.company,
        logo: formData.logo || null,
        location: formData.location,
        location_type: formData.location_type,
        type: formData.type,
        industry: formData.industry,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        link: formData.link || null,
        responsibilities_en: splitLines(formData.responsibilities_en),
        responsibilities_id: splitLines(formData.responsibilities_id),
        lessons_learned_en: splitLines(formData.lessons_learned_en),
        lessons_learned_id: splitLines(formData.lessons_learned_id),
        impact_en: splitLines(formData.impact_en),
        impact_id: splitLines(formData.impact_id),
        is_show: formData.is_show,
        display_order: formData.display_order || 0,
      };
      if (editData?.id) {
        await axios.put(`/api/careers/${editData.id}`, payload);
      } else {
        await axios.post("/api/careers", payload);
      }
      await mutate();
      setFormOpen(false);
      setEditData(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    setIsDeleting(true);
    try {
      await axios.delete(`/api/careers/${deleteTarget.id}`);
      await mutate();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEdit = (career: CareerItem) => {
    setEditData(career);
    setFormOpen(true);
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title={t("title")} icon={<CareerIcon />} />
        <SectionSubHeading>
          <p>{t("sub_title")}</p>
        </SectionSubHeading>
      </div>

      {isAuthor && (
        <button
          onClick={() => { setEditData(null); setFormOpen(true); }}
          className="flex items-center gap-2 rounded-xl border border-dashed border-accent px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/5"
        >
          <PlusIcon size={16} />
          Tambah Career
        </button>
      )}

      <div className="grid grid-cols-1 gap-4">
        {careers.map((career, index) => (
          <AuthorActions
            key={career.id ?? index}
            onEdit={() => openEdit(career)}
            onDelete={career.id ? () => setDeleteTarget(career) : undefined}
          >
            <CareerCard indexCareer={index} {...career} />
          </AuthorActions>
        ))}
      </div>

      <CareerFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        onSubmit={handleSubmit}
        initialData={editData ? {
          position: editData.position,
          company: editData.company,
          logo: editData.logo || "",
          location: editData.location,
          location_type: editData.location_type,
          type: editData.type,
          industry: editData.industry,
          start_date: editData.start_date,
          end_date: editData.end_date || "",
          link: editData.link || "",
          responsibilities_en: editData.responsibilities?.en.join("\n") || "",
          responsibilities_id: editData.responsibilities?.id.join("\n") || "",
          lessons_learned_en: editData.lessons_learned?.en.join("\n") || "",
          lessons_learned_id: editData.lessons_learned?.id.join("\n") || "",
          impact_en: editData.impact?.en.join("\n") || "",
          impact_id: editData.impact?.id.join("\n") || "",
          is_show: editData.isShow ?? true,
          display_order: 0,
        } : undefined}
        isLoading={isSubmitting}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        message={`Hapus career "${deleteTarget?.position}" di ${deleteTarget?.company}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default CareerList;
