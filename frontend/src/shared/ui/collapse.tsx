import { useState } from "react";
import { ArrowDownIcon } from "../assets";

interface IProps {
  children: React.ReactNode;
  className?: string;
}
export const Collapse: React.FC<IProps> = ({ children, className = "" }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  function toggleCollapse() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <div className={className}>
      <div
        className={`overflow-hidden ${
          isCollapsed ? "md:max-h-15 max-h-28" : ""
        } min-h-20`}
      >
        {children}
      </div>
      <button onClick={toggleCollapse} className="link mt-2 flex">
        {isCollapsed ? "Развернуть" : "Свернуть"}
        {isCollapsed ? (
          <ArrowDownIcon className="w-5" />
        ) : (
          <ArrowDownIcon className="w-5 rotate-180" />
        )}
      </button>
    </div>
  );
};
