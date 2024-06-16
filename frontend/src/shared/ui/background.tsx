interface IProps {
  imageSrc: string;
}
export const Background: React.FC<IProps> = ({ imageSrc }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <img src={imageSrc} alt="фон" className="h-full w-full object-cover" />
    </div>
  );
};
