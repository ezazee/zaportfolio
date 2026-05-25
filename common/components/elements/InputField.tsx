import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface RadioInputProps<TFormValue extends FieldValues> {
  register: UseFormRegister<TFormValue>;
  name: Path<TFormValue>;
  error: FieldErrors;
  rule?: RegisterOptions;
  isTextArea?: boolean;
  placeholder?: string;
  rows?: number;
}

const InputField = <TFormValue extends FieldValues>({
  name,
  rule,
  error,
  isTextArea = false,
  placeholder = "",
  rows = 2,
  register,
}: RadioInputProps<TFormValue>) => {
  const renderPlaceholder =
    placeholder || name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="w-full space-y-2">
      {isTextArea ? (
        <textarea
          rows={rows}
          placeholder={renderPlaceholder}
          {...register(name, rule)}
          className="w-full rounded-lg bg-neutral-50 p-2 text-neutral-900 outline outline-neutral-300 placeholder:text-neutral-400 focus:outline-neutral-400 dark:bg-neutral-900 dark:text-neutral-50 dark:outline-neutral-700 dark:placeholder:text-neutral-500"
        ></textarea>
      ) : (
        <input
          type="text"
          placeholder={renderPlaceholder}
          {...register(name, rule)}
          className="w-full rounded-lg bg-neutral-50 p-2 text-neutral-900 outline outline-neutral-300 placeholder:text-neutral-400 focus:outline-neutral-400 dark:bg-neutral-900 dark:text-neutral-50 dark:outline-neutral-700 dark:placeholder:text-neutral-500"
        />
      )}{" "}
      {error[name]?.type === "required" && (
        <p role="alert" className="text-[10px] text-red-400">
          *{name} is required
        </p>
      )}
      {error[name]?.type === "pattern" && (
        <p role="alert" className="text-[10px] text-red-400">
          *{String(error[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default InputField;
