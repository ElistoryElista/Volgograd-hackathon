interface IProps {
  tags: { id: number; title: string }[];
  className?: string;
}
export const Tags: React.FC<IProps> = ({ tags, className }) => {
  if (!tags || tags.length === 0) return <></>;

  return (
    <div className={`inline-block  rounded-xl ${className}`}>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <span key={tag.id} className="px-3 py-1 rounded-lg bg-primary">
            {tag.title}
          </span>
        ))}
      </div>
    </div>
  );
};
