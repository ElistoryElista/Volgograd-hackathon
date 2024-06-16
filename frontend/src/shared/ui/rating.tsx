interface IProps {
  rating: number;
  setRating: (rating: number) => void;
}

export const Rating: React.FC<IProps> = ({ rating, setRating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating">
      {stars.map((star, index) => (
        <input
          key={index}
          type="radio"
          name="rating"
          className="mask mask-star"
          value={star}
          checked={rating === star}
          onChange={() => setRating(star)}
        />
      ))}
    </div>
  );
};
