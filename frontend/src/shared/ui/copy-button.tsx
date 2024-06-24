import { useState } from "react";

export function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000); // Сбросить состояние через 2 секунды
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <button className="btn-sm btn" onClick={handleCopy}>
      {isCopied ? (
        <svg
          className="w-6 text-success"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
          <path d="M13 3h-2a2 2 0 1 0 0 4h2a2 2 0 1 0 0-4Z"></path>
          <path d="m9 14 2 2 4-4"></path>
        </svg>
      ) : (
        <svg
          className="w-6 "
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
          <path d="M13 3h-2a2 2 0 1 0 0 4h2a2 2 0 1 0 0-4Z"></path>
        </svg>
      )}
    </button>
  );
}
