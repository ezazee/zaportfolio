"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose as CloseIcon } from "react-icons/io5";

interface AchievementFormData {
  name_en: string;
  name_id: string;
  issuing_organization_en: string;
  issuing_organization_id: string;
  credential_id: string;
  type_en: string;
  type_id: string;
  category_en: string;
  category_id: string;
  url_credential: string;
  issue_date: string;
  image: string;
  is_show: boolean;
}

interface AchievementFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AchievementFormData) => Promise<void>;
  initialData?: Partial<AchievementFormData>;
  isLoading?: boolean;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="mb-1 block text-xs text-neutral-500">{label}</label>
    {children}
  </div>
);

const AchievementFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }: AchievementFormModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AchievementFormData>();

  useEffect(() => {
    if (isOpen) reset(initialData || { is_show: true });
  }, [isOpen, initialData, reset]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl dark:bg-neutral-900"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 p-5 dark:border-neutral-800">
              <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {initialData?.name_en ? "Edit Achievement" : "Tambah Achievement"}
              </h2>
              <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                <CloseIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-5">
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Nama (EN) *">
                    <input {...register("name_en", { required: true })} className="input-field" />
                    {errors.name_en && <p className="mt-1 text-xs text-red-500">Wajib diisi</p>}
                  </Field>
                  <Field label="Nama (ID) *">
                    <input {...register("name_id", { required: true })} className="input-field" />
                    {errors.name_id && <p className="mt-1 text-xs text-red-500">Wajib diisi</p>}
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Penerbit (EN) *">
                    <input {...register("issuing_organization_en", { required: true })} className="input-field" />
                  </Field>
                  <Field label="Penerbit (ID) *">
                    <input {...register("issuing_organization_id", { required: true })} className="input-field" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Tipe (EN)">
                    <input {...register("type_en")} className="input-field" placeholder="Course / Professional / Event" />
                  </Field>
                  <Field label="Tipe (ID)">
                    <input {...register("type_id")} className="input-field" placeholder="Kursus / Profesional / Acara" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Kategori (EN)">
                    <input {...register("category_en")} className="input-field" placeholder="Programming" />
                  </Field>
                  <Field label="Kategori (ID)">
                    <input {...register("category_id")} className="input-field" placeholder="Pemrograman" />
                  </Field>
                </div>
                <Field label="Credential ID">
                  <input {...register("credential_id")} className="input-field" />
                </Field>
                <Field label="URL Credential">
                  <input {...register("url_credential")} className="input-field" placeholder="https://..." />
                </Field>
                <Field label="URL Gambar *">
                  <input {...register("image", { required: true })} className="input-field" placeholder="/images/achievement/nama.jpg" />
                  {errors.image && <p className="mt-1 text-xs text-red-500">Wajib diisi</p>}
                </Field>
                <Field label="Tanggal Terbit *">
                  <input type="date" {...register("issue_date", { required: true })} className="input-field" />
                  {errors.issue_date && <p className="mt-1 text-xs text-red-500">Wajib diisi</p>}
                </Field>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="ach_is_show" {...register("is_show")} className="h-4 w-4" />
                  <label htmlFor="ach_is_show" className="text-sm text-neutral-600 dark:text-neutral-400">Tampilkan</label>
                </div>
              </div>
            </form>

            <div className="border-t border-neutral-100 p-5 dark:border-neutral-800">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
                className="w-full rounded-lg bg-accent py-2 text-sm font-semibold text-dark transition hover:bg-amber-400 disabled:opacity-60"
              >
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementFormModal;
