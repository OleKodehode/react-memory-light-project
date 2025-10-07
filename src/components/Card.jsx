export default function Card({
  cardID,
  symbol,
  isFlipped,
  isMatched,
  handleClick,
}) {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      }`}
      onClick={handleClick}
    >
      <p className="card-back">❓</p>
      <p className="card-front">{isFlipped || isMatched ? symbol : null}</p>
    </div>
  );
}
