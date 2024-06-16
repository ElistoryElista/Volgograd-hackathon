interface IProps {
  size?: "xs" | "sm" | "md" | "lg";
}

export const Loading: React.FC<IProps> = ({ size = "md" }) => {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
};
