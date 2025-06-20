"use client";

interface FormInputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
}

export default function FormInput({
  id,
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  autoComplete,
}: FormInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-base font-medium text-gray-800 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-base"
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}
