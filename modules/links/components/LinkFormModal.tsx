"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose as CloseIcon } from "react-icons/io5";

const ICON_OPTIONS = [
  { label: "Globe (Portfolio)", value: "BiGlobe" },
  { label: "GitHub", value: "BsGithub" },
  { label: "LinkedIn", value: "BsLinkedin" },
  { label: "Instagram", value: "BsInstagram" },
  { label: "WhatsApp", value: "BsWhatsapp" },
  { label: "Monkeytype", value: "SiMonkeytype" },
  { label: "Document / CV", value: "HiOutlineDocumentText" },
  { label: "Terminal", value: "BiTerminal" },
  { label: "Link", value: "BiLink" },
  { label: "Youtube", value: "BsYoutube" },
  { label: "Twitter / X", value: "BsTwitterX" },
];

interface LinkFormData {
  title: string;
  description: string;
  href: string;
  icon_name: string;
  display_order: number;
  is_show: boolean;
}

interface LinkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LinkFormData) => Promise<void>;
  initialData?: Partial<LinkFormData>;
  isLoading?: boolean;
}

const LinkFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }: LinkFormModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LinkFormData>();

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
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                {initialData?.title ? "Edit Link" : "Tambah Link"}
              </h2>
              <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">
                <CloseIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-neutral-500">Judul *</label>
                <input {...register("title", { required: true })} className="input-field" placeholder="GitHub" />
                {errors.title && <p className="mt-1 text-xs text-red-500">Wajib diisi</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs text-neutral-500">Deskripsi</label>
                <input {...register("description")} className="input-field" placeholder="Profil & repositori open-source" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-neutral-500">URL *</label>
                <input {...register("href", { required: true })} className="input-field" placeholder="https://github.com/username" />
                {errors.href && <p className="mt-1 text-xs text-red-500">Wajib diisi</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs text-neutral-500">Icon *</label>
                <select {...register("icon_name", { required: true })} className="input-field">
                  <option value="">Pilih icon...</option>
                  {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                {errors.icon_name && <p className="mt-1 text-xs text-red-500">Wajib dipilih</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs text-neutral-500">Urutan</label>
                <input type="number" {...register("display_order", { valueAsNumber: true })} className="input-field" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="is_show" {...register("is_show")} className="h-4 w-4" />
                <label htmlFor="is_show" className="text-sm text-neutral-600 dark:text-neutral-400">Tampilkan</label>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-accent py-2 text-sm font-semibold text-dark transition hover:bg-amber-400 disabled:opacity-60"
              >
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LinkFormModal;
