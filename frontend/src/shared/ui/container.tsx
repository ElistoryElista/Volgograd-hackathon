interface IProps {
  children: React.ReactNode;
  direction?: "row" | "col";
  className?: string;
}

export const Container: React.FC<IProps> = ({
  children,
  direction,
  className = "",
}) => {
  return (
    <div
      className={`${
        direction ? "flex flex-" + direction : ""
      } container container-xl mx-auto px-4 ${className}`}
    >
      {children}
    </div>
  );
};
