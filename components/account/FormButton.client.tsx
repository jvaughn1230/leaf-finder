import React from "react";

interface FormButtonProps {
  loading: boolean;
  text: string;
  loadingText: string;
}

/**
 * FormButton Component
 *
 * A reusable button component for forms. Handles loading states and consistent styling.
 *
 * @param {boolean} loading - Whether the button is in a loading state.
 * @param {string} text - The text to display on the button when not loading.
 * @param {string} loadingText - The text to display on the button when loading.
 * @returns {JSX.Element} - A styled button with loading state handling.
 */

const FormButton: React.FC<FormButtonProps> = ({
  loading,
  text,
  loadingText,
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {loading ? loadingText : text}
    </button>
  );
};

export default FormButton;
