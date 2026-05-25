"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose as CloseIcon } from "react-icons/io5";

interface CareerFormData {
  position: string;
  company: string;
  logo: string;
  location: string;
  location_type: string;
  type: string;
  industry: string;
  start_date: string;
  end_date: string;
  link: string;
  responsibilities_en: string;
  responsibilities_id: string;
  lessons_learned_en: string;
  lessons_learned_id: string;
  impact_en: string;
  impact_id: string;
  is_show: boolean;
  display_order: number;
}

interface CareerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CareerFormData) => Promise<void>;
  initialData?: Partial<CareerFormData>;
  isLoading?: boolean;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="mb-1 block text-xs text-neutral-500">{label}</label>
    {children}
  </div>
);

const CareerFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }: CareerFormModalProps) => {
  const { register, handleSubmit, reset } = useForm<CareerFormData>();

  useEffect(() => {
    if (isOpen) reset(initialData || { is_show: true, display_order: 0, location_type: "Onsite", type: "Full-time" });
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
                {initialData?.position ? "Edit Career" : "Tambah Career"}
              </h2>
              <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                <CloseIcon size={20} />
              </button>
            </div>

            <form className="flex-1 overflow-y-auto p-5">
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Posisi *">
                    <input {...register("position", { required: true })} className="input-field" />
                  </Field>
                  <Field label="Perusahaan *">
                    <input {...register("company", { required: true })} className="input-field" />
                  </Field>
                </div>
                <Field label="URL Logo">
                  <input {...register("logo")} className="input-field" placeholder="/images/careers/logo.png" />
                </Field>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Lokasi">
                    <input {...register("location")} className="input-field" placeholder="Indonesia" />
                  </Field>
                  <Field label="Industri">
                    <input {...register("industry")} className="input-field" placeholder="Technology" />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Tipe Pekerjaan">
                    <select {...register("type")} className="input-field">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </Field>
                  <Field label="Lokasi Kerja">
                    <select {...register("location_type")} className="input-field">
                      <option value="Onsite">Onsite</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Mulai (YYYY-MM)">
                    <input {...register("start_date")} className="input-field" placeholder="2024-09" />
                  </Field>
                  <Field label="Selesai (YYYY-MM, kosongkan jika masih)">
                    <input {...register("end_date")} className="input-field" placeholder="2025-01" />
                  </Field>
                </div>
                <Field label="Link Perusahaan">
                  <input {...register("link")} className="input-field" placeholder="https://..." />
                </Field>

                <p className="pt-1 text-xs font-medium text-neutral-400">Tanggung Jawab (satu per baris)</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Responsibilities (EN)">
                    <textarea {...register("responsibilities_en")} rows={4} className="input-field resize-none" />
                  </Field>
                  <Field label="Responsibilities (ID)">
                    <textarea {...register("responsibilities_id")} rows={4} className="input-field resize-none" />
                  </Field>
                </div>

                <p className="pt-1 text-xs font-medium text-neutral-400">Yang Dipelajari (satu per baris)</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Lessons Learned (EN)">
                    <textarea {...register("lessons_learned_en")} rows={3} className="input-field resize-none" />
                  </Field>
                  <Field label="Lessons Learned (ID)">
                    <textarea {...register("lessons_learned_id")} rows={3} className="input-field resize-none" />
                  </Field>
                </div>

                <p className="pt-1 text-xs font-medium text-neutral-400">Dampak (satu per baris)</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Impact (EN)">
                    <textarea {...register("impact_en")} rows={3} className="input-field resize-none" />
                  </Field>
                  <Field label="Impact (ID)">
                    <textarea {...register("impact_id")} rows={3} className="input-field resize-none" />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Urutan">
                    <input type="number" {...register("display_order", { valueAsNumber: true })} className="input-field" />
                  </Field>
                  <div className="flex items-end pb-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="career_show" {...register("is_show")} className="h-4 w-4" />
                      <label htmlFor="career_show" className="text-sm text-neutral-600 dark:text-neutral-400">Tampilkan</label>
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

export default CareerFormModal;
