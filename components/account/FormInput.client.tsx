import React from "react";

type FormInputProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
  error?: string;
};

/**
 * FormInput Component
 *
 * A reusable input component for forms. Handles labels, input fields, and error messages.
 *
 * @param {string} id - The unique identifier for the input field.
 * @param {string} label - The label text for the input field.
 * @param {string} type - The type of input (e.g., "text", "email", "password").
 * @param {string} value - The current value of the input field.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - The function to handle input changes.
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {boolean} [disabled] - Whether the input field is disabled.
 * @param {string} [error] - The error message to display below the input field.
 * @returns {JSX.Element} - A styled input field with a label and optional error message.
 */

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled,
  error,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        disabled={disabled}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
