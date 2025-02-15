const InputElement = ({
  htmlFor,
  children,
  reference,
  placeholder,
  type,
}: {
  htmlFor: string;
  children: React.ReactNode;
  reference: React.RefObject<HTMLInputElement>;
  placeholder: string;
  type: string;
}) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="sr-only">
        {children}
      </label>

      <input
        ref={reference}
        id="username"
        name="username"
        type={type}
        required
        className="appearance-none relative block w-full px-4 py-4 bg-white/5 border border-white/10 placeholder-gray-400 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputElement;
