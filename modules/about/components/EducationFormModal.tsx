"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose as CloseIcon } from "react-icons/io5";

interface EducationFormData {
  school: string;
  major_en: string;
  major_id: string;
  logo: string;
  location: string;
  degree_en: string;
  degree_id: string;
  start_year: number;
  end_year: string;
  link: string;
  gpa: string;
  is_show: boolean;
  display_order: number;
}

interface EducationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EducationFormData) => Promise<void>;
  initialData?: Partial<EducationFormData>;
  isLoading?: boolean;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="mb-1 block text-xs text-neutral-500">{label}</label>
    {children}
  </div>
);

const EducationFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }: EducationFormModalProps) => {
  const { register, handleSubmit, reset } = useForm<EducationFormData>();

  useEffect(() => {
    if (isOpen) reset(initialData || { is_show: true, display_order: 0 });
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
            className="flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl bg-white shadow-2xl dark:bg-neutral-900"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 p-5 dark:border-neutral-800">
              <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {initialData?.school ? "Edit Pendidikan" : "Tambah Pendidikan"}
              </h2>
              <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                <CloseIcon size={20} />
              </button>
            </div>

            <form className="flex-1 overflow-y-auto p-5">
              <div className="space-y-3">
                <Field label="Nama Sekolah / Universitas *">
                  <input {...register("school", { required: true })} className="input-field" />
                </Field>
                <Field label="URL Logo">
                  <input {...register("logo")} className="input-field" placeholder="/images/education/logo.png" />
                </Field>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Jurusan (EN)">
                    <input {...register("major_en")} className="input-field" placeholder="Information Systems" />
                  </Field>
                  <Field label="Jurusan (ID)">
                    <input {...register("major_id")} className="input-field" placeholder="Sistem Informasi" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Gelar (EN)">
                    <input {...register("degree_en")} className="input-field" placeholder="Bachelor's degree" />
                  </Field>
                  <Field label="Gelar (ID)">
                    <input {...register("degree_id")} className="input-field" placeholder="Sarjana (S.Kom)" />
                  </Field>
                </div>
                <Field label="Lokasi">
                  <input {...register("location")} className="input-field" placeholder="Jakarta, Indonesia 🇮🇩" />
                </Field>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Tahun Mulai">
                    <input type="number" {...register("start_year", { valueAsNumber: true })} className="input-field" placeholder="2024" />
                  </Field>
                  <Field label="Tahun Selesai">
                    <input {...register("end_year")} className="input-field" placeholder="2028 atau Current" />
                  </Field>
                </div>
                <Field label="Link Institusi">
                  <input {...register("link")} className="input-field" placeholder="https://..." />
                </Field>
                <Field label="IPK / GPA (opsional)">
                  <input {...register("gpa")} className="input-field" placeholder="3.8" />
                </Field>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Urutan">
                    <input type="number" {...register("display_order", { valueAsNumber: true })} className="input-field" />
                  </Field>
                  <div className="flex items-end pb-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="edu_show" {...register("is_show")} className="h-4 w-4" />
                      <label htmlFor="edu_show" className="text-sm text-neutral-600 dark:text-neutral-400">Tampilkan</label>
                    </div>
                  </div>
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

export default EducationFormModal;
