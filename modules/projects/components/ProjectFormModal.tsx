"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose as CloseIcon } from "react-icons/io5";

interface ProjectFormData {
  title: string;
  slug: string;
  description_en: string;
  description_id: string;
  image: string;
  link_demo: string;
  link_github: string;
  stacks: string;
  category: string;
  type: string;
  is_show: boolean;
  is_featured: boolean;
  display_order: number;
}

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  initialData?: Partial<ProjectFormData>;
  isLoading?: boolean;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="mb-1 block text-xs text-neutral-500">{label}</label>
    {children}
  </div>
);

const ProjectFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }: ProjectFormModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>();

  useEffect(() => {
    if (isOpen) reset(initialData || { is_show: true, is_featured: false, display_order: 0, type: "Web" });
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
                {initialData?.title ? "Edit Project" : "Tambah Project"}
              </h2>
              <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                <CloseIcon size={20} />
              </button>
            </div>

            <form className="flex-1 overflow-y-auto p-5">
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Judul *">
                    <input {...register("title", { required: true })} className="input-field" />
                    {errors.title && <p className="mt-1 text-xs text-red-500">Wajib diisi</p>}
                  </Field>
                  <Field label="Slug *">
                    <input {...register("slug", { required: true })} className="input-field" placeholder="nama-project" />
                    {errors.slug && <p className="mt-1 text-xs text-red-500">Wajib diisi</p>}
                  </Field>
                </div>
                <Field label="Deskripsi (EN) *">
                  <textarea {...register("description_en", { required: true })} className="input-field min-h-[70px] resize-none" />
                </Field>
                <Field label="Deskripsi (ID) *">
                  <textarea {...register("description_id", { required: true })} className="input-field min-h-[70px] resize-none" />
                </Field>
                <Field label="URL Gambar">
                  <input {...register("image")} className="input-field" placeholder="/images/project/nama.png" />
                </Field>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Link Demo">
                    <input {...register("link_demo")} className="input-field" placeholder="https://..." />
                  </Field>
                  <Field label="Link GitHub">
                    <input {...register("link_github")} className="input-field" placeholder="https://github.com/..." />
                  </Field>
                </div>
                <Field label="Tech Stack (pisahkan dengan koma)">
                  <input {...register("stacks")} className="input-field" placeholder="React, Next.js, Tailwind CSS" />
                </Field>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Kategori">
                    <input {...register("category")} className="input-field" placeholder="Proyek Pribadi" />
                  </Field>
                  <Field label="Tipe">
                    <select {...register("type")} className="input-field">
                      <option value="Web">Web</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Design">Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                </div>
                <Field label="Urutan">
                  <input type="number" {...register("display_order", { valueAsNumber: true })} className="input-field" />
                </Field>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="proj_show" {...register("is_show")} className="h-4 w-4" />
                    <label htmlFor="proj_show" className="text-sm text-neutral-600 dark:text-neutral-400">Tampilkan</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="proj_featured" {...register("is_featured")} className="h-4 w-4" />
                    <label htmlFor="proj_featured" className="text-sm text-neutral-600 dark:text-neutral-400">Featured</label>
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

export default ProjectFormModal;
