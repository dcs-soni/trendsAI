import { twMerge } from "tailwind-merge";

const InputElement = ({
  htmlFor,
  children,
  reference,
  placeholder,
  type,
  value,
  onChange,
  className,
  labelClassname,
}: {
  htmlFor: string;
  children: React.ReactNode;
  reference?: React.RefObject<HTMLInputElement>;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassname?: string;
}) => {
  return (
    <div>
      <label htmlFor={htmlFor} className={twMerge("", labelClassname)}>
        {children}
      </label>

      <input
        ref={reference}
        id="username"
        name="username"
        type={type}
        required
        className={twMerge(
          "appearance-none relative block w-full px-4 py-4 bg-white/5 border border-white/10 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputElement;
