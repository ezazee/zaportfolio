"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import InputField from "@/common/components/elements/InputField";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = useTranslations("ContactPage");

  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const buttonText = isLoading
    ? t("form.button_sending")
    : isSuccess
      ? t("form.button_success")
      : t("form.button");

  useEffect(() => {
    if (!isSuccess) return;
    const timeout = setTimeout(() => setIsSuccess(false), 5000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const handleFormSubmit = (payload: FormData) => {
    setIsLoading(true);
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    const text = `Halo Reza!\n\nNama: *${payload.name}*\nEmail: ${payload.email}\n\n${payload.message}`;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    reset();
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="space-y-4">
      <h2>{t("form.title")}</h2>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 transition-all duration-300"
      >
        <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <InputField
            name="name"
            rule={{ required: true }}
            register={register}
            error={errors}
          />
          <InputField
            name="email"
            rule={{
              required: true,
              pattern: {
                value: regexEmail,
                message: "please enter a valid email",
              },
            }}
            register={register}
            error={errors}
          />
        </div>
        <InputField
          name="message"
          rule={{ required: true }}
          register={register}
          error={errors}
          isTextArea
        />
        <button
          disabled={isLoading}
          type="submit"
          className="w-full rounded-lg bg-neutral-600 px-4 py-2 text-neutral-50 shadow-md transition-all duration-300 hover:bg-neutral-700 hover:shadow-lg dark:bg-neutral-800 hover:dark:bg-neutral-700"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
