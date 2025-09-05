import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(2, "სახელი მინიმუმ 2 სიმბოლო უნდა იყოს"),
    email: z.string().email("ელ.ფოსტა არასწორია"),
    message: z.string().min(5, "შეტყობინება მინიმუმ 5 სიმბოლო უნდა იყოს"),
  });

  type ContactForm = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
  });

  const onSubmit = () => {
    setSubmitted(true);
    reset();
  };

  return (
    <div className="bg-light flex min-h-screen flex-col items-center justify-center px-4 py-10 transition-colors duration-500 dark:bg-dark">
      <h1 className="mb-6 text-4xl font-extrabold text-orange drop-shadow-lg">
        კონტაქტი
      </h1>
      <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-16">
        <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-300">
          <FaEnvelope className="text-orange" />
          <a
            href="mailto:info@kan-guroo.com"
            className="hover:text-orangeLight"
          >
            info@kan-guroo.com
          </a>
        </div>
        <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-300">
          <FaPhone className="text-orange" />
          <a href="tel:+995577302525" className="hover:text-orangeLight">
            +995 577 30 25 25
          </a>
        </div>
        <div className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-300">
          <FaMapMarkerAlt className="text-orange" />
          <span>თბილისი, საქართველო</span>
        </div>
      </div>

      <form
        className="dark:bg-charcoal w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-6 text-2xl font-bold text-dark dark:text-white">
          მოგვწერეთ შეტყობინება
        </h2>
        <div className="mb-4">
          <input
            type="text"
            {...register("name")}
            placeholder="სახელი"
            className="w-full rounded border border-gray-300 px-4 py-2 text-lg focus:border-orange focus:outline-none dark:bg-gray-800 dark:text-white"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            {...register("email")}
            placeholder="ელ.ფოსტა"
            className="w-full rounded border border-gray-300 px-4 py-2 text-lg focus:border-orange focus:outline-none dark:bg-gray-800 dark:text-white"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <textarea
            {...register("message")}
            placeholder="შეტყობინება"
            rows={4}
            className="w-full rounded border border-gray-300 px-4 py-2 text-lg focus:border-orange focus:outline-none dark:bg-gray-800 dark:text-white"
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="hover:bg-orangeLight w-full rounded bg-orange py-3 text-xl font-bold text-white transition"
        >
          გაგზავნა
        </button>
        {submitted && (
          <p className="mt-4 text-center text-green-600">
            შეტყობინება წარმატებით გაიგზავნა!
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
