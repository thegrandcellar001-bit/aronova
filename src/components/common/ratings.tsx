export default function Ratings(ratings: number) {
  const fullStars = Math.floor(ratings);
  const halfStars = ratings % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const fullStarIcon = <i className="fas fa-star text-yellow-500"></i>;
  const halfStarIcon = <i className="fas fa-star-half-alt text-yellow-500"></i>;
  const emptyStarIcon = <i className="fas fa-star text-gray-300"></i>;

  return (
    <>
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={i}>{fullStarIcon}</span>
      ))}
      {halfStars ? <span>{halfStarIcon}</span> : ""}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={i}>{emptyStarIcon}</span>
      ))}
    </>
  );
}
