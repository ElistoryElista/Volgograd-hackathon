import { useState } from "react";

interface IProps {
  content: JSX.Element;
  children?: React.ReactNode;
  textButton?: JSX.Element;
  collapsedTextButton?: JSX.Element;
  className?: string;
}
export const Dropdown: React.FC<IProps> = ({
  content,
  children,
  className = "",
  textButton,
  collapsedTextButton,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleCollapse() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <div>
      {!isCollapsed && <>{content}</>}
      <div onClick={toggleCollapse} className={className}>
        {children || isCollapsed ? collapsedTextButton : textButton}
      </div>
    </div>
  );
};
