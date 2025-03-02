"use client";

import { RefObject } from "react";
import { twMerge } from "tailwind-merge";
import * as motion from "motion/react-client";

interface InputElementProps {
  htmlFor: string;
  children: React.ReactNode;
  reference?: RefObject<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassname?: string;
  name?: string;
  required?: boolean;
}

export default function InputElement({
  htmlFor,
  children,
  reference,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  labelClassname = "",
  name,
  required,
}: InputElementProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium text-gray-400 mb-1 ${labelClassname}`}>
        {children}
      </label>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}>
        <input
          id={htmlFor}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={reference}
          required={required}
          className={twMerge(
            "appearance-none relative block w-full px-4 py-4 bg-white/5 border border-white/10 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
            className
          )}
        />
      </motion.div>
    </div>
  );
}
