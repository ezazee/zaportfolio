import { motion } from "framer-motion";

const Status = () => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/50">
      <motion.div
        className="h-2 w-2 rounded-full bg-[#fbe400]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
        Hire me
      </span>
    </div>
  );
};

export default Status;
