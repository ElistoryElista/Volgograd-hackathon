import React, { useEffect, useRef } from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
}
export const Details: React.FC<IProps> = ({ children, className }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    document.addEventListener("click", closeDetails);

    return () => {
      document.removeEventListener("click", closeDetails);
    };
  }, []);

  const closeDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  return (
    <details
      ref={detailsRef}
      onClick={closeDetails}
      className={`dropdown ${className}`}
    >
      {children}
    </details>
  );
};
