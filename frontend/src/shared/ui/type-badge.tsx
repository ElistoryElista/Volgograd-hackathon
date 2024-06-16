interface IProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}
export const TypeBadge: React.FC<IProps> = ({
  children,
  color,
  className = "",
}) => {
  if (!children) return <></>;
  return <span className={`${className} badge bg-[${color}]`}>{children}</span>;
};
