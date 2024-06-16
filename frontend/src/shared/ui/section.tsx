interface IProps {
  children: React.ReactNode;
  className?: string;
  title: string;
}
export const Section: React.FC<IProps> = ({
  title,
  className = "",
  children,
}) => {
  return (
    <section className={className + " box"}>
      <h3 className="font-bold">{title}</h3>
      {children}
    </section>
  );
};
