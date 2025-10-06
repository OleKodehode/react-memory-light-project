export default function Card({
  cardID,
  symbol,
  isFlipped,
  isMatched,
  handleClick,
}) {
  return (
    <div className={`card`} onClick={handleClick}>
      <div
        className={`card-inner-container ${isFlipped ? "flipped" : ""} ${
          isMatched ? "matched" : ""
        }`}
      >
        <p className="card-back">❓</p>
        <p className="card-front">{isFlipped || isMatched ? symbol : null}</p>
      </div>
    </div>
  );
}
